import os
import re
import glob

# Genuine titles mapping
genuine_titles = {
    'burger (1).avif': 'Classic Beef Burger',
    'burger (3).avif': 'Double Cheese Burger',
    'menu (17).avif': "gogo's Special Burger",
    'burger (1).avif': 'Crispy Chicken Burger',
    'burger (2).avif': 'BBQ Bacon Burger',
    'burger (3).avif': 'Spicy Zinger Burger',
    'burger.avif': 'Mushroom Swiss Burger',
    'burger_chicken_1786227544480.avif': 'Premium Chicken Fillet',
    'burger_smash_1786227565327.avif': "gogo's Smash Burger",
    'burger_zinger_1786227554642.avif': 'Ultimate Zinger Burger',
    'deal (1).avif': "gogo's Special Deal",
    'deal (2).avif': 'Couple Combo',
    'deal (4).avif': 'Family Feast Combo',
    'dew.avif': 'Mountain Dew',
    'fanta.avif': 'Fanta Orange',
    'grocerapp-pepsi-drink--5f1815cc6dd00.avif': 'Pepsi Cola',
    'sauce.avif': "Signature gogo's Sauce",
    'sauce1.avif': 'Spicy Garlic Mayo',
    'sauce (1).avif': 'Tangy BBQ Sauce',
    'sauce (2).avif': 'Sweet Chili Sauce',
    'sauce (3).avif': 'Honey Mustard',
    'sauce (4).avif': 'Spicy Sriracha'
}

genuine_desc = {
    'burger (1).avif': 'A timeless classic with a juicy beef patty and fresh veggies.',
    'burger (3).avif': 'Two savory beef patties with double the melted cheddar cheese.',
    'menu (17).avif': 'Our signature house burger with secret sauce and crispy onions.',
    'burger (1).avif': 'Golden crispy chicken breast with fresh lettuce and mayo.',
    'burger (2).avif': 'Smoky BBQ sauce, crispy beef bacon, and a flame-grilled patty.',
    'burger (3).avif': 'A spicy, crunchy zinger fillet that packs a flavorful punch.',
    'burger.avif': 'Savory sauteed mushrooms and melted Swiss cheese.',
    'burger_chicken_1786227544480.avif': 'Premium tender chicken fillet on a toasted artisanal bun.',
    'burger_smash_1786227565327.avif': 'Perfectly smashed beef patty with a caramelized crust.',
    'burger_zinger_1786227554642.avif': 'The ultimate spicy and crunchy zinger experience.',
    'deal (1).avif': 'A juicy burger served with hot crispy fries and a cold drink.',
    'deal (2).avif': 'Two classic burgers, double fries, and two drinks to share.',
    'deal (4).avif': 'Four premium burgers, large loaded fries, and a 1.5L drink.',
    'dew.avif': 'Chilled Mountain Dew soda can for a sweet citrus kick.',
    'fanta.avif': 'Bright and bubbly refreshing Fanta Orange soda can.',
    'grocerapp-pepsi-drink--5f1815cc6dd00.avif': 'Chilled canned Pepsi for the ultimate food accompaniment.',
    'sauce.avif': 'Our secret house blend, perfectly sweet and tangy.',
    'sauce1.avif': 'A creamy mayonnaise base with roasted garlic and a spicy kick.',
    'sauce (1).avif': 'Classic tangy and smoky BBQ dip.',
    'sauce (2).avif': 'Sweet and moderately spicy chili sauce.',
    'sauce (3).avif': 'Smooth honey mustard for dipping.',
    'sauce (4).avif': 'Fiery hot sriracha sauce.'
}

genuine_prices = {
    'burger (1).avif': 450,
    'burger (3).avif': 550,
    'menu (17).avif': 650,
    'burger (1).avif': 400,
    'burger (2).avif': 500,
    'burger (3).avif': 450,
    'burger.avif': 480,
    'burger_chicken_1786227544480.avif': 420,
    'burger_smash_1786227565327.avif': 499,
    'burger_zinger_1786227554642.avif': 520,
    'deal (1).avif': 650,
    'deal (2).avif': 1100,
    'deal (4).avif': 2100,
    'dew.avif': 120,
    'fanta.avif': 120,
    'grocerapp-pepsi-drink--5f1815cc6dd00.avif': 120,
    'sauce.avif': 50,
    'sauce1.avif': 50,
    'sauce (1).avif': 50,
    'sauce (2).avif': 50,
    'sauce (3).avif': 50,
    'sauce (4).avif': 50
}

image_files = sorted(glob.glob('assets/images/*'))
burgers = []
deals = []
drinks = []
extras = []

for f in image_files:
    basename = os.path.basename(f).lower()
    
    if 'hero' in basename or 'logo' in basename or 'offer' in basename or 'about' in basename:
        continue
        
    orig_basename = os.path.basename(f)
    
    if 'deal' in basename:
        deals.append(orig_basename)
    elif 'dew' in basename or 'fanta' in basename or 'pepsi' in basename or 'drink' in basename:
        drinks.append(orig_basename)
    elif 'sauce' in basename:
        extras.append(orig_basename)
    else:
        burgers.append(orig_basename)

def make_card(img, category, index):
    lower_img = img.lower()
    title = genuine_titles.get(lower_img, f"{category[:-1].capitalize()} {index}")
    desc = genuine_desc.get(lower_img, f"Delicious {title.lower()} freshly prepared for you.")
    price = genuine_prices.get(lower_img, 400 + (index * 50))
    
    return f'''                    <div class="product-card">
                        <div class="card-image"><img loading="lazy" decoding="async" src="./assets/images/{lower_img}" alt="{title}"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>{title}</h3></div>
                            <p class="card-desc">{desc}</p>
                            <div class="card-footer">
                                <span class="price">Rs {price}</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Add</button>
                            </div>
                        </div>
                    </div>'''

def build_category_html(title, id_name, items):
    if not items: return ""
    html = f'''                <!-- Category: {title} -->
                <div id="{id_name}" style="display: flex; justify-content: flex-start; align-items: center; margin: 2.5rem 0 1rem; scroll-margin-top: 100px;">
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--clr-text-primary); margin: 0; text-align: left;">{title}</h3>
                </div>
                <div class="menu-grid">
'''
    cards = []
    for i, item in enumerate(items):
        cards.append(make_card(item, title, i+1))
        
    html += '\n'.join(cards)
    html += '\n                </div>\n'
    return html

menu_html = build_category_html('Burgers', 'burgers', burgers)
menu_html += build_category_html('Deals', 'deals', deals)
menu_html += build_category_html('Drinks', 'drinks', drinks)
menu_html += build_category_html('Sauces', 'sauces', extras)

def update_file(filepath, is_menu=False):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    cat_circles = ""
    if burgers: cat_circles += f'<a href="#burgers" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/{burgers[0].lower()}"></div><span class="circle-label">Burgers</span></a>\n'
    if deals: cat_circles += f'<a href="#deals" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/{deals[0].lower()}"></div><span class="circle-label">Deals</span></a>\n'
    if drinks: cat_circles += f'<a href="#drinks" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/{drinks[0].lower()}"></div><span class="circle-label">Drinks</span></a>\n'
    if extras: cat_circles += f'<a href="#sauces" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/{extras[0].lower()}"></div><span class="circle-label">Sauces</span></a>\n'

    prefix = "../" if is_menu else "./"
    cat_circles = cat_circles.replace("./", prefix)
    menu_html_adjusted = menu_html.replace("./", prefix)

    replacement = f'''<section class="menu" id="cardapio" style="padding-top: 0.5rem;">
            <div class="container">
                <div class="category-sticky-wrapper" id="category-sticky-wrapper">
                    <div class="category-circles-wrapper" id="category-circles">
                    {cat_circles}
                    </div>
                </div>
                {menu_html_adjusted}
            </div>
        </section>'''

    content = re.sub(r'<section class="menu" id="cardapio".*?</section>', replacement, content, flags=re.DOTALL)
    
    # Also replace any .png/.jpg/.jpeg with .avif globally in the file for other references (hero, logo, offer, etc)
    content = re.sub(r'(assets/images/[a-zA-Z0-9_\-\s\(\)]+)\.(png|jpg|jpeg)', r'\1.avif', content, flags=re.IGNORECASE)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_file('index.html', False)
update_file('pages/menu.html', True)
print("Menu generated with AVIF and genuine titles!")
