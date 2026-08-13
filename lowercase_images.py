import glob, re

for file in glob.glob('**/*.html', recursive=True):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def replacer(match):
        return match.group(1) + match.group(2).lower() + match.group(3)
    
    new_content = re.sub(r'(src=[\'"`].*?assets/(?:images|gallery)/)([^\'"`]+)([\'"`])', replacer, content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Fixed case in {file}')
