import re

def swap_sections(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Swap Deals and Burgers blocks
    burgers_pat = r'(<!-- Category: Burgers -->.*?)(?=<!-- Category: Deals -->)'
    deals_pat = r'(<!-- Category: Deals -->.*?)(?=<!-- Category: Fries -->)'

    b_match = re.search(burgers_pat, text, re.DOTALL)
    d_match = re.search(deals_pat, text, re.DOTALL)

    if b_match and d_match:
        burgers = b_match.group(1)
        deals = d_match.group(1)
        
        # We replace the concatenated old block with Deals then Burgers
        old_block = burgers + deals
        new_block = deals + burgers
        text = text.replace(old_block, new_block)

    # 2. Reorder category buttons
    # Since we know the exact lines, we can just replace them.
    # The block is from `<div class="category-circles-wrapper" id="category-circles">` to `</div>\n                </div>`
    pat = r'<div class="category-circles-wrapper" id="category-circles">.*?</div>\s*</div>'
    
    cat_btn_block = '''<div class="category-circles-wrapper" id="category-circles">
                    <a href="#deals" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/deal (1).avif"></div><span class="circle-label">Deals</span></a>
                    <a href="#burgers" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/burger (1).avif"></div><span class="circle-label">Burgers</span></a>
                    <a href="#fries" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/fries.avif"></div><span class="circle-label">Fries</span></a>
                    <a href="#drinks" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/dew.avif"></div><span class="circle-label">Drinks</span></a>
                    <a href="#sauces" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/sauce (1).avif"></div><span class="circle-label">Sauces</span></a>
                    </div>
                </div>'''
    text = re.sub(pat, cat_btn_block, text, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text)
    return text

idx_text = swap_sections('index.html')

# Now copy the menu to menu.html
menu_start = idx_text.find('<!-- Category: Deals -->')
# Find the end of Sauces block
# Since Sauces is last, it ends right before `</div>\n        </section>`
menu_end = idx_text.find('</div>\n        </section>', menu_start)
menu_block = idx_text[menu_start:menu_end]

with open('pages/menu.html', 'r', encoding='utf-8') as f:
    menu_text = f.read()

# Update category buttons in menu.html
pat = r'<div class="category-circles-wrapper" id="category-circles">.*?</div>\s*</div>'
cat_btn_block = '''<div class="category-circles-wrapper" id="category-circles">
                    <a href="#deals" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/deal (1).avif"></div><span class="circle-label">Deals</span></a>
                    <a href="#burgers" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/burger (1).avif"></div><span class="circle-label">Burgers</span></a>
                    <a href="#fries" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/fries.avif"></div><span class="circle-label">Fries</span></a>
                    <a href="#drinks" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/dew.avif"></div><span class="circle-label">Drinks</span></a>
                    <a href="#sauces" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/sauce (1).avif"></div><span class="circle-label">Sauces</span></a>
                    </div>
                </div>'''
menu_text = re.sub(pat, cat_btn_block, menu_text, flags=re.DOTALL)

# Replace menu sections in menu.html
m_start = menu_text.find('<!-- Category: Burgers -->')
m_end = menu_text.find('</div>\n        </section>', m_start)

if m_start != -1 and m_end != -1:
    menu_text = menu_text[:m_start] + menu_block + menu_text[m_end:]
else:
    # try another indentation
    m_end = menu_text.find('</div>\n    </section>', m_start)
    if m_start != -1 and m_end != -1:
        menu_text = menu_text[:m_start] + menu_block + menu_text[m_end:]
    else:
        print('Error finding sections in menu.html')

with open('pages/menu.html', 'w', encoding='utf-8') as f:
    f.write(menu_text)

print('Done properly!')
