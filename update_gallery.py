import os
import glob
import re

media_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant\Instagram_Media"
html_path = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant\gallery.html"

# Get all unique media
mp4_files = sorted(glob.glob(os.path.join(media_dir, "*.mp4")))
jpg_files = sorted(glob.glob(os.path.join(media_dir, "*.jpg")))

# Filter yt-dlp duplicates if we have the corresponding instaloader ones
# (actually we can just use all mp4s except the yt-dlp ones with long custom names if we want, but let's just grab the dates)
clean_mp4 = [f for f in mp4_files if "UTC" in f]
clean_jpg = [f for f in jpg_files]

gallery_html = []

# Add videos first
for vid in clean_mp4:
    filename = os.path.basename(vid)
    gallery_html.append(f'                    <div class="gallery-item"><video class="lightbox-trigger" autoplay muted loop playsinline style="width: 100%; border-radius: var(--border-radius);"><source src="./Instagram_Media/{filename}" type="video/mp4"></video></div>')

# Add images
for img in clean_jpg:
    filename = os.path.basename(img)
    gallery_html.append(f'                    <div class="gallery-item"><img src="./Instagram_Media/{filename}" alt="Galeria Instagram" class="lightbox-trigger"></div>')

new_gallery_content = '<div class="gallery-grid">\n' + '\n'.join(gallery_html) + '\n                </div>'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'<div class="gallery-grid">.*?</div>'
new_content = re.sub(pattern, new_gallery_content, content, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Gallery updated successfully!")
