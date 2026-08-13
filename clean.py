import re

PAGES = [
    'pages/offers.html',
    'pages/about.html',
    'pages/menu.html',
    'pages/gallery.html'
]

TITLES = {
    'pages/offers.html': 'Offers - gogo\'s',
    'pages/about.html': 'About Us - gogo\'s',
    'pages/menu.html': 'Menu - gogo\'s',
    'pages/gallery.html': 'Gallery - gogo\'s'
}

HEAD_BLOCK = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="icon" type="image/avif" href="../assets/images/logo.avif">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/style.css">
    <script src="../assets/js/config.js"></script>
    <script src="../assets/js/loader.js"></script>
</head>
<body>'''

for filepath in PAGES:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    main_match = re.search(r'(<main\b.*?</main>)', content, re.DOTALL | re.IGNORECASE)
    main_html = main_match.group(1) if main_match else ''

    new_body = HEAD_BLOCK.format(title=TITLES[filepath])
    new_body += '\n\n' + main_html
    new_body += '\n\n    <script src="../assets/js/script.js" defer></script>\n</body>\n</html>\n'

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_body)

    print(f'Cleaned: {filepath}')
