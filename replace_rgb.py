import glob

files = glob.glob('**/*.html', recursive=True) + glob.glob('**/*.css', recursive=True)
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace('231, 157, 31', '0, 0, 0')
    new_content = new_content.replace('e79d1f', '000000')
    new_content = new_content.replace('E79D1F', '000000')
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated rgb in {file}')
