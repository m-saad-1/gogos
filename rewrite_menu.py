import re

def process_file(filepath, template_html=None):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update Category Buttons
    cat_btn_block = '''<div class="category-circles-wrapper" id="category-circles">
                    <a href="#deals" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/deal (1).avif"></div><span class="circle-label">Deals</span></a>
                    <a href="#burgers" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/burger (1).avif"></div><span class="circle-label">Burgers</span></a>
                    <a href="#fries" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/fries.avif"></div><span class="circle-label">Fries</span></a>
                    <a href="#drinks" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/dew.avif"></div><span class="circle-label">Drinks</span></a>
                    <a href="#sauces" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/sauce (1).avif"></div><span class="circle-label">Sauces</span></a>
                    </div>'''
    
    content = re.sub(r'<div class="category-circles-wrapper" id="category-circles">.*?</div>', cat_btn_block, content, flags=re.DOTALL)
    
    # 2. Extract sections from index.html (if template_html is None, we extract from current content)
    source_content = template_html if template_html else content
    
    def get_sec(name, search_content):
        # We find <!-- Category: Name --> up to the next <!-- Category: or </section>
        pat = r'(<!-- Category: ' + name + r' -->.*?(?=<!-- Category: |</section>|<!-- Offers Section -->))'
        m = re.search(pat, search_content, re.DOTALL | re.IGNORECASE)
        if m: return m.group(1).strip()
        
        # Fallback for Fries -> Sides
        if name == 'Fries':
            pat = r'(<!-- Category: Sides -->.*?(?=<!-- Category: |</section>|<!-- Offers Section -->))'
            m = re.search(pat, search_content, re.DOTALL | re.IGNORECASE)
            if m:
                s = m.group(1).strip()
                s = s.replace('Category: Sides', 'Category: Fries')
                s = s.replace('id="sides"', 'id="fries"')
                s = s.replace('>Sides<', '>Fries<')
                return s
        return ""

    deals = get_sec('Deals', source_content)
    burgers = get_sec('Burgers', source_content)
    fries = get_sec('Fries', source_content)
    drinks = get_sec('Drinks', source_content)
    sauces = get_sec('Sauces', source_content)
    
    ordered = "\n                ".join([deals, burgers, fries, drinks, sauces]) + "\n            "
    
    # Replace the existing sections
    # Find start: <!-- Category:
    start_match = re.search(r'<!-- Category: .*?-->', content)
    if start_match:
        # Find end: nearest </section> after start_match
        end_idx = content.find('</section>', start_match.start())
        # Actually wait, the last div before </section> is closing "container"
        # It's better to find the end by looking for "</div>\n        </section>"
        container_end = content.rfind('</div>', start_match.start(), end_idx)
        if container_end != -1:
            content = content[:start_match.start()] + ordered + content[container_end:]
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    return content

idx = process_file('index.html')
process_file('pages/menu.html', template_html=idx)
print("Done")
