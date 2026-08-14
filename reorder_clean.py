import re

def reorder_menu(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Category buttons replacement
    cat_btn_regex = r'<div class="category-circles-wrapper" id="category-circles">.*?</div>'
    cat_btn_block = '''<div class="category-circles-wrapper" id="category-circles">
                    <a href="#deals" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/deal (1).avif"></div><span class="circle-label">Deals</span></a>
                    <a href="#burgers" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/burger (1).avif"></div><span class="circle-label">Burgers</span></a>
                    <a href="#fries" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/fries.avif"></div><span class="circle-label">Fries</span></a>
                    <a href="#drinks" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/dew.avif"></div><span class="circle-label">Drinks</span></a>
                    <a href="#sauces" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/sauce (1).avif"></div><span class="circle-label">Sauces</span></a>
                    </div>'''
    content = re.sub(cat_btn_regex, cat_btn_block, content, flags=re.DOTALL)

    # Extracting sections
    def extract(name):
        # We need to find the boundary very precisely.
        # It starts with <!-- Category: NAME --> and ends right before the NEXT <!-- Category:
        # OR right before </div>\s*</section>
        pat = r'(<!-- Category: ' + name + r' -->.*?(?=<!-- Category: |</div>\s*</section>))'
        m = re.search(pat, content, re.DOTALL | re.IGNORECASE)
        if m:
            return m.group(1).strip()
        
        if name == 'Fries':
            pat = r'(<!-- Category: Sides -->.*?(?=<!-- Category: |</div>\s*</section>))'
            m = re.search(pat, content, re.DOTALL | re.IGNORECASE)
            if m:
                s = m.group(1).strip()
                s = s.replace('Category: Sides', 'Category: Fries')
                s = s.replace('id="sides"', 'id="fries"')
                s = s.replace('>Sides<', '>Fries<')
                return s
        return ""

    deals = extract('Deals')
    burgers = extract('Burgers')
    fries = extract('Fries')
    drinks = extract('Drinks')
    sauces = extract('Sauces')

    ordered = "\n                ".join([deals, burgers, fries, drinks, sauces]) + "\n            "
    
    # Replacement
    # Match from first Category to the end of the last category (before </div>\n</section>)
    start_pat = r'<!-- Category: '
    start_idx = content.find('<!-- Category: ')
    if start_idx != -1:
        end_idx = content.find('</div>\n        </section>', start_idx)
        if end_idx == -1:
            end_idx = content.find('</div>\n    </section>', start_idx) # try another indentation
        if end_idx == -1:
            end_idx = content.find('</div>\n</section>', start_idx)
            
        if end_idx != -1:
            content = content[:start_idx] + ordered + content[end_idx:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

reorder_menu('index.html')
reorder_menu('pages/menu.html')
print("Done")
