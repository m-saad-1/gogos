import os
import re

base_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant"
files = [os.path.join(base_dir, "index.html"), os.path.join(base_dir, "gallery.html")]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove autoplay from video tags and change src to data-src in <source>
    # We want to match the whole video tag and its sources
    def video_replacer(match):
        tag = match.group(0)
        tag = tag.replace('autoplay ', '')
        tag = tag.replace(' src="', ' data-src="')
        return tag

    # regex to match <video ...>...</video>
    new_content = re.sub(r'<video[^>]*>.*?</video>', video_replacer, content, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Videos updated for lazy loading.")
