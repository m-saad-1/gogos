import os
import re

base_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant"
files = [os.path.join(base_dir, "index.html"), os.path.join(base_dir, "gallery.html")]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def video_replacer(match):
        tag = match.group(0)
        tag = tag.replace('autoplay ', '')
        tag = tag.replace(' src="', ' data-src="')
        return tag

    new_content = re.sub(r'<video[^>]*>.*?</video>', video_replacer, content, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Videos updated for lazy loading.")
