import os
import glob

base_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant"
html_files = glob.glob(os.path.join(base_dir, "*.html"))
css_files = glob.glob(os.path.join(base_dir, "css", "*.css"))
js_files = glob.glob(os.path.join(base_dir, "js", "*.js"))

all_files = html_files + css_files + js_files

for filepath in all_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content.replace('.png"', '.avif"').replace(".png'", ".avif'").replace('.png)', '.avif)')
    new_content = new_content.replace('.jpg"', '.avif"').replace(".jpg'", ".avif'").replace('.jpg)', '.avif)')

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(filepath)}")

print("Global image extension replacement done.")
