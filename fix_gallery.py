import os
import glob
import re

gallery_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant\Gallery"
gallery_html_path = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant\gallery.html"
index_html_path = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant\index.html"

mp4_files = sorted(glob.glob(os.path.join(gallery_dir, "*.mp4")), reverse=True)
avif_files = sorted(glob.glob(os.path.join(gallery_dir, "*.avif")), reverse=True)

clean_mp4 = [f for f in mp4_files if "UTC" in f]
clean_avif = [f for f in avif_files]

def generate_grid_html(videos, images):
    html = []
    for vid in videos:
        filename = os.path.basename(vid)
        html.append(f'                    <div class="gallery-item"><video preload="metadata" class="lightbox-trigger" autoplay muted loop playsinline style="width: 100%; border-radius: var(--border-radius);"><source src="./Gallery/{filename}" type="video/mp4"></video></div>')
    for img in images:
        filename = os.path.basename(img)
        html.append(f'                    <div class="gallery-item"><img loading="lazy" decoding="async" src="./Gallery/{filename}" alt="Galeria Instagram" class="lightbox-trigger"></div>')
    return '<div class="gallery-grid">\n' + '\n'.join(html) + '\n                </div>\n                '

# Update gallery.html
with open(gallery_html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace from <div class="gallery-grid"> until the start of <div style="text-align: center; margin-top: 4rem;
pattern = r'<div class="gallery-grid">.*?<div style="text-align: center; margin-top: 4rem;'
new_grid = generate_grid_html(clean_mp4, clean_avif) + '<div style="text-align: center; margin-top: 4rem;'
content = re.sub(pattern, new_grid, content, flags=re.DOTALL)

with open(gallery_html_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Update index.html
with open(index_html_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'<div class="gallery-grid">.*?<div style="text-align: center; margin-top: 2.5rem;">'
subset_videos = clean_mp4[:2]
subset_images = clean_avif[:6]
new_grid = generate_grid_html(subset_videos, subset_images) + '<div style="text-align: center; margin-top: 2.5rem;">'
content = re.sub(pattern, new_grid, content, flags=re.DOTALL)

with open(index_html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed HTML blocks.")
