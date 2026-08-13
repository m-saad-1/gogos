import os
import re

def update_references():
    directories_to_search = ['.']
    extensions_to_check = {'.html', '.js', '.css'}
    
    # Regex to find any .png, .jpg, .jpeg that follows assets/images or assets/gallery
    # Allow spaces in filenames by matching anything except quotes or newlines
    pattern = re.compile(r'(assets/(?:images|gallery)/[^\'\"\n]+?)\.(?:png|jpg|jpeg)\b', re.IGNORECASE)
    
    for directory in directories_to_search:
        for root, dirs, files in os.walk(directory):
            if 'node_modules' in dirs:
                dirs.remove('node_modules')
            if '.git' in dirs:
                dirs.remove('.git')
                
            for file in files:
                if os.path.splitext(file)[1].lower() in extensions_to_check:
                    filepath = os.path.join(root, file)
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = pattern.sub(r'\1.avif', content)
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {filepath}")

if __name__ == '__main__':
    update_references()
