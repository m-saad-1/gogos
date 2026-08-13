import glob
import re

files = glob.glob('**/*.html', recursive=True) + glob.glob('**/*.js', recursive=True)

for filepath in files:
    if filepath == 'convert_avif.js' or filepath == 'build_menu.py':
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace .png, .jpg, .jpeg with .avif globally in assets/images paths
    # We'll use a regex that looks for assets/images/... and replaces the extension
    new_content = re.sub(r'(assets/images/[a-zA-Z0-9_\-\s\(\)]+)\.(png|jpg|jpeg)', r'\1.avif', content, flags=re.IGNORECASE)
    
    # Also replace any <source> or <img> just in case
    # Actually the regex above is safe enough as it requires assets/images/
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated AVIF references in {filepath}')
