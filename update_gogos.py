import re
import os

def update_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated {filepath}')

def remove_html_sections(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Remove Deals, Pizzas, Chicken, Desserts categories from category-circles
    content = re.sub(r'<a href="#deals".*?</a>', '', content, flags=re.DOTALL)
    content = re.sub(r'<a href="#pizzas".*?</a>', '', content, flags=re.DOTALL)
    content = re.sub(r'<a href="#chicken".*?</a>', '', content, flags=re.DOTALL)
    content = re.sub(r'<a href="#desserts".*?</a>', '', content, flags=re.DOTALL)
    
    # Remove the sections themselves
    content = re.sub(r'<!-- Category: Offers -->.*?<!-- Category: Burgers -->', '<!-- Category: Burgers -->', content, flags=re.DOTALL)
    content = re.sub(r'<!-- Category: Pizzas -->.*?<!-- Offers Section -->', '<!-- Offers Section -->', content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Removed sections from {filepath}')

replacements = {
    'logo.avif': 'logo.jpg',
    'hero.avif': 'hero.png',
    'offer.avif': 'offer.png',
    'burger (1).avif': 'burger_smash_1786227565327.avif',
    'burger (2).avif': 'burger_chicken_1786227544480.avif',
    'burger (3).avif': 'burger_zinger_1786227554642.avif',
    # Double cheese burger
    'burger (4).avif': 'burger (3).png',
    
    # drinks
    'grocerapp-pepsi-drink--5f1815cc6dd00.avif': 'grocerapp-pepsi-drink--5f1815cc6dd00.avif',
    'fanta.avif': 'fanta.avif',
    'dew.avif': 'dew.avif',
    'drink_lemonade_1786227586036.avif': 'drink (1).avif' # if it exists
}

update_file('index.html', replacements)
update_file('assets/js/config.js', replacements)
update_file('pages/menu.html', replacements)
update_file('pages/about.html', replacements)

remove_html_sections('index.html')
remove_html_sections('pages/menu.html')

# Ensure btn-primary is completely black
with open('assets/css/style.css', 'a') as f:
    f.write('\n.btn-primary { background: #000000 !important; color: #FFFFFF !important; }\n')
