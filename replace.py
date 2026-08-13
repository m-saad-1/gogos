import glob, re

for file in glob.glob('**/*.html', recursive=True):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace('Banging Burgers', "gogo's")
    new_content = new_content.replace('bangingburgerscafe', "gogoskarachi")
    new_content = new_content.replace('Banging Box Deal', "gogo's Box Deal")
    new_content = new_content.replace('Banging Special Deal', "gogo's Special Deal")
    new_content = new_content.replace('Banging', "gogo's")
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Replaced text in {file}')
