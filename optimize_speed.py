import os
import glob
import re

base_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant"
html_files = glob.glob(os.path.join(base_dir, "*.html"))

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Defer scripts
    content = re.sub(r'<script src="([^"]+)"></script>', r'<script src="\1" defer></script>', content)
    # Don't double defer
    content = content.replace(' defer defer>', ' defer>')

    # 2. Add loading="lazy" and decoding="async" to images (except Logo and Hero)
    # We will do this by finding all img tags, removing existing loading/decoding attrs to avoid duplicates,
    # and then adding the appropriate ones based on the src.
    
    def img_replacer(match):
        img_tag = match.group(0)
        # Remove existing loading, decoding, fetchpriority
        img_tag = re.sub(r'\s+loading="[^"]*"', '', img_tag)
        img_tag = re.sub(r'\s+decoding="[^"]*"', '', img_tag)
        img_tag = re.sub(r'\s+fetchpriority="[^"]*"', '', img_tag)
        
        # Determine priority
        if 'Logo' in img_tag or 'Hero_image' in img_tag:
            # Critical images
            return img_tag.replace('<img ', '<img fetchpriority="high" decoding="sync" ')
        else:
            # Non-critical images
            return img_tag.replace('<img ', '<img loading="lazy" decoding="async" ')

    content = re.sub(r'<img [^>]+>', img_replacer, content)

    # 3. Optimize Videos (prevent all from loading at once if they are offscreen)
    # Add preload="metadata" if not present
    def vid_replacer(match):
        vid_tag = match.group(0)
        if 'preload=' not in vid_tag:
            vid_tag = vid_tag.replace('<video ', '<video preload="metadata" ')
        return vid_tag

    content = re.sub(r'<video [^>]+>', vid_replacer, content)

    # 4. Preload Hero Image in index.html specifically
    if os.path.basename(html_file) == "index.html":
        preload_tag = '<link rel="preload" as="image" href="./Images/Hero_image.png">'
        if preload_tag not in content:
            # Insert before </head>
            content = content.replace('</head>', f'    {preload_tag}\n</head>')

    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Speed optimizations applied to all HTML files.")
