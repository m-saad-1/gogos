import os
import re

html = open('index.html', 'r', encoding='utf-8').read()
# Find all src="assets/images/..." and src="./assets/images/..."
refs = re.findall(r'src=["\'](\.?/?assets/images/[^"\']+)["\']', html)

missing = []
for ref in refs:
    clean_path = ref.replace('./', '')
    if not os.path.exists(clean_path):
        missing.append((ref, clean_path))

print("Missing images from index.html:")
for ref, path in missing:
    print(f"Ref: {ref} -> Missing Path: {path}")

# Check menu.html
html = open('pages/menu.html', 'r', encoding='utf-8').read()
refs = re.findall(r'src=["\'](\.?/?(?:\.\./)?assets/images/[^"\']+)["\']', html)

missing2 = []
for ref in refs:
    clean_path = ref.replace('../', '').replace('./', '')
    if not os.path.exists(clean_path):
        missing2.append((ref, clean_path))

print("\nMissing images from menu.html:")
for ref, path in missing2:
    print(f"Ref: {ref} -> Missing Path: {path}")
