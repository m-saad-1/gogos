import os, re

with open('assets/js/config.js', 'r', encoding='utf-8') as f:
    config = f.read()

images = re.findall(r'[\'"`](assets/images/[^\'"`]+)[\'"`]', config)
images += [p.replace('../', '') for p in re.findall(r'[\'"`]\.\./assets/images/([^\'"`]+)[\'"`]', config)]

actual = os.listdir('assets/images')
print('Missing images:')
for img in set(images):
    filename = os.path.basename(img)
    if filename not in actual:
        print(f'- {filename}')
