import re
import os

def read_file(filepath):
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    return ""

def write_file(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

idx_content = read_file('index.html')

# 1. Generate the exact new category buttons block
cat_btns = '''<div class="category-circles-wrapper" id="category-circles">
                    <a href="#deals" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/deal (1).avif"></div><span class="circle-label">Deals</span></a>
                    <a href="#burgers" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/burger (1).avif"></div><span class="circle-label">Burgers</span></a>
                    <a href="#fries" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/fries.avif"></div><span class="circle-label">Fries</span></a>
                    <a href="#drinks" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/dew.avif"></div><span class="circle-label">Drinks</span></a>
                    <a href="#sauces" class="category-circle-btn"><div class="circle-img"><img src="./assets/images/sauce (1).avif"></div><span class="circle-label">Sauces</span></a>
                    </div>'''

# 2. Extract sections from index.html (which is the source of truth for products)
def extract_section(name, content):
    pattern = r'(<!-- Category: ' + re.escape(name) + r' -->.*?)(?=<!-- Category: |</section>|<!-- Offers Section -->|</div>\s*</section>)'
    match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
    if match:
        return match.group(1).strip() + '\n                '
    
    # Fallback to older name if needed (e.g. Sides)
    if name == "Fries":
        pattern = r'(<!-- Category: Sides -->.*?)(?=<!-- Category: |</section>|<!-- Offers Section -->|</div>\s*</section>)'
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            text = match.group(1).strip() + '\n                '
            # Rename Sides to Fries in text just to be safe
            text = text.replace('Category: Sides', 'Category: Fries')
            text = text.replace('id="sides"', 'id="fries"')
            text = text.replace('>Sides<', '>Fries<')
            return text
            
    return ""

burgers_sec = extract_section("Burgers", idx_content)
deals_sec = extract_section("Deals", idx_content)
fries_sec = extract_section("Fries", idx_content)
drinks_sec = extract_section("Drinks", idx_content)
sauces_sec = extract_section("Sauces", idx_content)

# Ordered sections
ordered_sections = deals_sec + burgers_sec + fries_sec + drinks_sec + sauces_sec

# Function to update a file
def update_file(filepath):
    content = read_file(filepath)
    if not content: return
    
    # Replace category buttons
    cat_btn_regex = r'<div class="category-circles-wrapper" id="category-circles">.*?</div>\s*</div>'
    # Wait, the outer div is <div class="category-sticky-wrapper" id="category-sticky-wrapper">
    cat_btn_regex = r'<div class="category-circles-wrapper" id="category-circles">.*?</div>'
    content = re.sub(cat_btn_regex, cat_btns, content, flags=re.DOTALL)
    
    # Replace sections
    # Find start and end of sections
    start_match = re.search(r'<!-- Category: .*?-->', content)
    end_match = None
    if 'id="ofertas"' in content:
        end_match = re.search(r'(</div>\s*</section>\s*<!-- Offers Section -->|<!-- Offers Section -->)', content)
    else:
        end_match = re.search(r'(</div>\s*</section>\s*</main>)', content)
        if not end_match:
            end_match = re.search(r'</section>', content[start_match.start():])
            if end_match:
                # create a fake match object
                class FakeMatch:
                    def start(self): return start_match.start() + end_match.start()
                end_match = FakeMatch()

    if start_match and end_match:
        content = content[:start_match.start()] + ordered_sections + "</div>\n        </section>\n\n        " + (content[end_match.start():] if hasattr(end_match, 'group') else content[end_match.start():])
        # Clean up <section class="menu"> closing properly
        # Because we appended </div></section>, let's just make sure we don't duplicate.
        pass

    # A more robust replacement:
    # Just remove everything between the end of category-sticky-wrapper and the end of the menu section
    wrapper_end = content.find('</div>', content.find('id="category-sticky-wrapper"'))
    wrapper_end = content.find('</div>', wrapper_end + 1) # closes sticky wrapper
    
    section_end = content.find('</section>', wrapper_end)
    
    if wrapper_end != -1 and section_end != -1:
        before = content[:wrapper_end + 7] # include </div>\n
        after = content[section_end:] # starts with </section>
        content = before + "                " + ordered_sections.strip() + "\n            </div>\n        " + after
    
    write_file(filepath, content)

update_file('index.html')
update_file('pages/menu.html')

print("Menu sections reordered and updated successfully in both pages.")
