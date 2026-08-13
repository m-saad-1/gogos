import re

filepath = 'pages/menu.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()
    
# Remove Pizzas, Chicken, Desserts
content = re.sub(r'<!-- Category: Pizzas -->.*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</section>', '</div>\s*</div>\s*</section>', content, flags=re.DOTALL)
# Wait, let's just do it cleanly
content = re.sub(r'<!-- Category: Pizzas -->.*?(?=</div>\s*</div>\s*</section>)', '', content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print(f'Removed extra categories from {filepath}')
