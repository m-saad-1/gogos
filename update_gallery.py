import os, glob, re

gallery_dir = "assets/gallery"
mp4_files = glob.glob(f"{gallery_dir}/*.mp4")

gallery_items = []
for f in mp4_files:
    basename = os.path.basename(f)
    item = f'<div class="gallery-item"><video preload="metadata" class="lightbox-trigger" muted loop playsinline style="width: 100%; border-radius: var(--border-radius);"><source data-src="../assets/gallery/{basename}" type="video/mp4"></video></div>'
    gallery_items.append(item)

gallery_html = "\n                    ".join(gallery_items)

def replace_gallery(filepath, prefix='../'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # generate HTML for the current file level
    items = []
    for f_path in mp4_files:
        basename = os.path.basename(f_path)
        item = f'<div class="gallery-item"><video preload="metadata" class="lightbox-trigger" muted loop playsinline style="width: 100%; border-radius: var(--border-radius);"><source data-src="{prefix}assets/gallery/{basename}" type="video/mp4"></video></div>'
        items.append(item)
    
    new_items_html = "\n                    ".join(items)
    
    # replace the contents of <div class="gallery-grid"> ... </div>
    new_content = re.sub(
        r'(<div class="gallery-grid">).*?(</div>)',
        f'\\1\n                    {new_items_html}\n                \\2',
        content,
        flags=re.DOTALL
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {filepath}")

replace_gallery('pages/gallery.html', '../')
replace_gallery('index.html', './')
