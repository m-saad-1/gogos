import os
import glob
import re

gallery_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant\Gallery"
gallery_html_path = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant\gallery.html"
index_html_path = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant\index.html"

# Get all unique media
mp4_files = sorted(glob.glob(os.path.join(gallery_dir, "*.mp4")), reverse=True)
avif_files = sorted(glob.glob(os.path.join(gallery_dir, "*.avif")), reverse=True)

# Filter out yt-dlp duplicates if needed, actually let's just use ones with UTC to be safe
clean_mp4 = [f for f in mp4_files if "UTC" in f]
clean_avif = [f for f in avif_files]

def generate_grid_html(videos, images):
    html = []
    for vid in videos:
        filename = os.path.basename(vid)
        html.append(f'                    <div class="gallery-item"><video class="lightbox-trigger" autoplay muted loop playsinline style="width: 100%; border-radius: var(--border-radius);"><source src="./Gallery/{filename}" type="video/mp4"></video></div>')
    for img in images:
        filename = os.path.basename(img)
        html.append(f'                    <div class="gallery-item"><img src="./Gallery/{filename}" alt="Galeria Instagram" class="lightbox-trigger"></div>')
    return '<div class="gallery-grid">\n' + '\n'.join(html) + '\n                </div>'

def update_file(filepath, new_html):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    pattern = r'<div class="gallery-grid">.*?</div>'
    new_content = re.sub(pattern, new_html, content, flags=re.DOTALL)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

# Update gallery.html with everything
full_html = generate_grid_html(clean_mp4, clean_avif)
update_file(gallery_html_path, full_html)

# Update index.html with a subset (e.g. 2 videos, 6 images)
subset_videos = clean_mp4[:2]
subset_images = clean_avif[:6]
subset_html = generate_grid_html(subset_videos, subset_images)
update_file(index_html_path, subset_html)

print("Gallery and Index updated successfully!")
