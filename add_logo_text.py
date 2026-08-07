import os
import re
import glob

base_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant"
html_files = glob.glob(os.path.join(base_dir, "*.html"))

pattern = r'(<a\s+href="[^"]*"\s+class="logo"[^>]*>)\s*<img\s+src="\./Images/Logo\.png"\s+alt="Restaurante da Rosana Logo"\s+class="header-logo">\s*</a>'

replacement = r'\1\n                    <img src="./Images/Logo.png" alt="Restaurante da Rosana Logo" class="header-logo">\n                    <span style="font-size: 1.5rem; font-weight: 700;">Rosana<span style="color: var(--clr-primary);">.</span></span>\n                </a>'

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We also want to make sure the <a> tag uses flex to align the text properly.
    # Instead of injecting styles into the tag, let's just do it in CSS.
    # But wait, let's first update the HTML content.
    new_content = re.sub(pattern, replacement, content)
    
    if new_content != content:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)

print("Logo text added to all HTML files.")
