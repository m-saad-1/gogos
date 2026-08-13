import os
import json
import re

config_path = 'assets/js/config.js'
with open(config_path, 'r', encoding='utf-8') as f:
    config = f.read()

menu_match = re.search(r'menu:\s*\[(.*?)\]\s*}', config, re.DOTALL)
if not menu_match:
    print('Menu not found in config.js')
    exit(1)

menu_str = menu_match.group(1)
images_in_config = re.findall(r'image:\s*[\'"`]\.\./assets/menu/([^\'"`]+)[\'"`]', menu_str)

actual_images = os.listdir('assets/menu')
print("--- MISSING IMAGES ---")
for img in images_in_config:
    if img not in actual_images:
        print(f"MISSING: {img}")

print("\n--- ACTUAL FILES IN FOLDER ---")
for img in sorted(actual_images):
    print(img)
