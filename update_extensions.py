import os
import glob
import re

base_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant"
html_files = glob.glob(os.path.join(base_dir, "*.html"))
css_files = glob.glob(os.path.join(base_dir, "css", "*.css"))
js_files = glob.glob(os.path.join(base_dir, "js", "*.js"))

all_files = html_files + css_files + js_files

for filepath in all_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace .png and .jpg with .avif for paths containing Images/
    new_content = re.sub(r'(Images/[^"\'\)]+)\.png', r'\1.avif', content)
    new_content = re.sub(r'(Images/[^"\'\)]+)\.jpg', r'\1.avif', new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(filepath)}")

print("Extensions updated to .avif in HTML/CSS/JS.")
