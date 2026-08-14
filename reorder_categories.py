import re

def extract_section(name, content):
    # This regex looks for:
    # <!-- Category: Burgers -->
    # <div id="burgers"...>...</div>
    # <div class="menu-grid">...</div>
    # But wait, there's no wrapper around the heading and the grid!
    # They are just sibling elements inside the section.
    
    # We want to match from <!-- Category: name --> up to the next <!-- Category: --> or <!-- Offers Section --> or </main>
    # We use a non-greedy match.
    pattern = r'(<!-- Category: ' + re.escape(name) + r' -->.*?(?=<!-- Category: |<!-- Offers Section -->|</main>|<section class="offers-banners"))'
    match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
    if match:
        return match.group(1).strip() + "\n                "
    return ""

def process(filepath, update_cat_circles=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    burgers = extract_section('Burgers', content)
    deals = extract_section('Deals', content)
    fries = extract_section('Fries', content)
    if not fries:
        # try sides
        sides = extract_section('Sides', content)
        if sides:
            fries = sides.replace('Category: Sides', 'Category: Fries').replace('id="sides"', 'id="fries"').replace('>Sides<', '>Fries<')

    drinks = extract_section('Drinks', content)
    sauces = extract_section('Sauces', content)

    ordered = deals + burgers + fries + drinks + sauces
    
    # Let's replace the whole block of sections with the ordered one
    # Find start
    start_match = re.search(r'<!-- Category: .*?-->', content)
    
    if start_match and ordered:
        # Find end: The last section is Sauces, so find where Sauces ends.
        # Actually, let's find the start of Offers Section or </main>
        end_idx = content.find('<!-- Offers Section -->')
        if end_idx == -1:
            end_idx = content.find('</main>')
            
        # We need to backtrack to the closing of the container, which is usually `</div>\n        </section>`
        # So we look backwards from end_idx for `</div>\n        </section>`
        container_end = content.rfind('</div>\n        </section>', 0, end_idx)
        if container_end == -1:
            # Maybe just `</section>`
            container_end = content.rfind('</section>', 0, end_idx)
            # go back one </div> if there is one
            div_before = content.rfind('</div>', 0, container_end)
            container_end = div_before
            
        if container_end != -1:
            content = content[:start_match.start()] + ordered.rstrip() + "\n            " + content[container_end:]

    if update_cat_circles:
        cat_btn_block = '''<div class="category-circles-wrapper" id="category-circles">
                    <a href="#deals" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/deal (1).avif"></div><span class="circle-label">Deals</span></a>
                    <a href="#burgers" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/burger (1).avif"></div><span class="circle-label">Burgers</span></a>
                    <a href="#fries" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/fries.avif"></div><span class="circle-label">Fries</span></a>
                    <a href="#drinks" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/dew.avif"></div><span class="circle-label">Drinks</span></a>
                    <a href="#sauces" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/sauce (1).avif"></div><span class="circle-label">Sauces</span></a>
                    </div>'''
        content = re.sub(r'<div class="category-circles-wrapper" id="category-circles">.*?</div>', cat_btn_block, content, flags=re.DOTALL)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process('index.html')
process('pages/menu.html')

