from __future__ import annotations

import html as html_lib
import json
import re
from pathlib import Path
from urllib.parse import urlparse

from curl_cffi import requests as creq


LINKS_FILE = Path("Docs/Links.md")
OUTPUT_ROOT = Path("assets/instagram_scraped")

URL_RE = re.compile(
    r"https://www\.instagram\.com/.*?(?=(?:https://www\.instagram\.com/)|\s|$)"
)


def read_links_file() -> str:
    return LINKS_FILE.read_text(encoding="utf-8")


def extract_instagram_urls(text: str) -> list[str]:
    urls = []
    for raw in URL_RE.findall(text):
        url = raw.strip().rstrip(").,;]")
        if url not in urls:
            urls.append(url)
    return urls


def canonicalize_url(url: str) -> str:
    parsed = urlparse(url)
    return f"{parsed.scheme}://{parsed.netloc}{parsed.path}".rstrip("/")


def extract_handle_and_shortcode(url: str) -> tuple[str | None, str | None]:
    parsed = urlparse(canonicalize_url(url))
    parts = [part for part in parsed.path.split("/") if part]
    if not parts:
        return None, None

    handle = parts[0].lower()
    shortcode = None
    if len(parts) >= 3 and parts[1] in {"p", "reel", "tv"}:
        shortcode = parts[2]

    return handle, shortcode


def fetch_reader_html(url: str) -> str:
    reader_url = f"https://r.jina.ai/http://{canonicalize_url(url)}"
    resp = creq.get(
        reader_url,
        headers={"x-respond-with": "html"},
        timeout=120,
    )
    resp.raise_for_status()
    return resp.text


def extract_balanced_object(text: str, start: int) -> str | None:
    if start < 0 or start >= len(text) or text[start] != "{":
        return None

    depth = 0
    in_string = False
    escape = False
    for idx in range(start, len(text)):
        ch = text[idx]
        if in_string:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == '"':
                in_string = False
            continue

        if ch == '"':
            in_string = True
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return text[start : idx + 1]

    return None


def find_post_node_block(html_text: str, shortcode: str) -> str | None:
    needle = f'"code":"{shortcode}"'
    idx = html_text.find(needle)
    if idx == -1:
        needle = f'code":"{shortcode}"'
        idx = html_text.find(needle)
    if idx == -1:
        return None

    start_candidates = [
        html_text.rfind('{"node":{', 0, idx),
        html_text.rfind(',"node":{', 0, idx),
        html_text.rfind('{"xig_polaris_media":{', 0, idx),
    ]
    start = max(start_candidates)
    if start == -1:
        return None

    return extract_balanced_object(html_text, start)


def decode_json_string(raw: str) -> str:
    try:
        return html_lib.unescape(json.loads(f'"{raw}"'))
    except Exception:
        return html_lib.unescape(raw).replace("\\/", "/")


def extract_media_urls(post_block: str) -> tuple[list[str], list[str]]:
    image_urls: list[str] = []
    video_urls: list[str] = []

    for raw in re.findall(r'"display_uri":"([^"]+)"', post_block):
        url = decode_json_string(raw)
        if url not in image_urls:
            image_urls.append(url)

    for array_match in re.findall(r'"video_versions":\[(.*?)\]', post_block):
        versions = []
        for type_raw, url_raw in re.findall(r'\{"type":(\d+),"url":"([^"]+)"', array_match):
            try:
                type_num = int(type_raw)
            except ValueError:
                type_num = -1
            versions.append((type_num, decode_json_string(url_raw)))
        if versions:
            versions.sort(key=lambda item: item[0])
            chosen = versions[-1][1]
            if chosen not in video_urls:
                video_urls.append(chosen)

    if not video_urls:
        fallback = []
        for raw in re.findall(r'https:\\/\\/[^"\\]+?\.mp4[^"\\]*', post_block):
            fallback.append(decode_json_string(raw))
        for url in fallback:
            if url not in video_urls:
                video_urls.append(url)

    return image_urls, video_urls


def infer_extension(url: str, default: str) -> str:
    path = urlparse(url).path.lower()
    for ext in (".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".mp4"):
        if path.endswith(ext):
            return ext
    return default


def download_url(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        return

    resp = creq.get(url, timeout=120, impersonate="chrome124")
    resp.raise_for_status()
    dest.write_bytes(resp.content)


def save_pageshot(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        return

    reader_url = f"https://r.jina.ai/http://{canonicalize_url(url)}"
    resp = creq.get(
        reader_url,
        headers={"x-respond-with": "Pageshot"},
        timeout=180,
    )
    resp.raise_for_status()
    dest.write_bytes(resp.content)


def process_post(url: str) -> dict[str, object] | None:
    handle, shortcode = extract_handle_and_shortcode(url)
    if not handle or not shortcode:
        return None

    html_text = fetch_reader_html(url)
    block = find_post_node_block(html_text, shortcode)
    if not block:
        return {
            "source_url": canonicalize_url(url),
            "handle": handle,
            "shortcode": shortcode,
            "status": "not_found",
            "images": [],
            "videos": [],
        }

    image_urls, video_urls = extract_media_urls(block)
    post_dir = OUTPUT_ROOT / handle / shortcode
    post_dir.mkdir(parents=True, exist_ok=True)

    downloaded = []
    preview_file = post_dir / "preview.png"
    try:
        save_pageshot(url, preview_file)
    except Exception as exc:
        preview_file = None
        preview_error = str(exc)
    else:
        preview_error = None

    order = 1
    for media_url in image_urls:
        ext = infer_extension(media_url, ".jpg")
        filename = f"{order:02d}_image{ext}"
        dest = post_dir / filename
        try:
            download_url(media_url, dest)
            downloaded.append({"type": "image", "url": media_url, "file": str(dest), "downloaded": True})
        except Exception as exc:
            downloaded.append({"type": "image", "url": media_url, "file": None, "downloaded": False, "error": str(exc)})
        order += 1

    for media_url in video_urls:
        ext = infer_extension(media_url, ".mp4")
        filename = f"{order:02d}_video{ext}"
        dest = post_dir / filename
        try:
            download_url(media_url, dest)
            downloaded.append({"type": "video", "url": media_url, "file": str(dest), "downloaded": True})
        except Exception as exc:
            downloaded.append({"type": "video", "url": media_url, "file": None, "downloaded": False, "error": str(exc)})
        order += 1

    status = "downloaded" if any(item.get("downloaded") for item in downloaded) else "preview_only"
    manifest = {
        "source_url": canonicalize_url(url),
        "handle": handle,
        "shortcode": shortcode,
        "status": status,
        "preview_file": str(preview_file) if preview_file else None,
        "preview_error": preview_error,
        "images": image_urls,
        "videos": video_urls,
        "files": downloaded,
    }
    (post_dir / "manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    return manifest


def main() -> None:
    text = read_links_file()
    urls = extract_instagram_urls(text)
    post_urls = []
    profile_urls = []

    for url in urls:
        handle, shortcode = extract_handle_and_shortcode(url)
        if shortcode:
            post_urls.append(url)
        elif handle:
            profile_urls.append(url)

    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    summary = []
    for url in post_urls:
        print(f"Processing {url}")
        result = process_post(url)
        if result:
            summary.append(result)
            print(f"  -> {result['status']} ({len(result['images'])} images, {len(result['videos'])} videos)")

    (OUTPUT_ROOT / "_summary.json").write_text(
        json.dumps(
            {
                "posts_processed": len(summary),
                "post_urls": post_urls,
                "profile_urls": profile_urls,
                "results": summary,
            },
            indent=2,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
