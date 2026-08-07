import os
import re
import glob

base_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant"

html_files = glob.glob(os.path.join(base_dir, "*.html"))

new_menu_content = """<div class="category-circles-wrapper">
                    <a href="#deals" class="category-circle-btn active" style="text-decoration:none;">
                        <div class="circle-img"><img src="./Images/Deal.png" alt="Ofertas"></div>
                        <span class="circle-label">Ofertas</span>
                    </a>
                    <a href="#skewers" class="category-circle-btn" style="text-decoration:none;">
                        <div class="circle-img"><img src="./Images/Grilled_skewers (1).png" alt="Espetinhos"></div>
                        <span class="circle-label">Espetinhos</span>
                    </a>
                    <a href="#soups" class="category-circle-btn" style="text-decoration:none;">
                        <div class="circle-img"><img src="./Images/Soup.png" alt="Sopas"></div>
                        <span class="circle-label">Sopas</span>
                    </a>
                    <a href="#drinks" class="category-circle-btn" style="text-decoration:none;">
                        <div class="circle-img"><img src="./Images/Drink (1).png" alt="Bebidas"></div>
                        <span class="circle-label">Bebidas</span>
                    </a>
                    <a href="#desserts" class="category-circle-btn" style="text-decoration:none;">
                        <div class="circle-img"><img src="./Images/Dessert.png" alt="Sobremesas"></div>
                        <span class="circle-label">Sobremesas</span>
                    </a>
                </div>
                
                <!-- Category: Ofertas -->
                <div id="deals" style="display: flex; justify-content: space-between; align-items: center; margin: 0.5rem 0 1rem; scroll-margin-top: 100px;">
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--clr-text-primary); margin: 0;">Ofertas</h3>
                </div>
                <div class="menu-grid">
                    <div class="product-card">
                        <div class="card-badge badge-primary">MAIS VENDIDO</div>
                        <div class="card-image"><img src="./Images/Deal (1).png" alt="Combo 1"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Combo da Rosana</h3></div>
                            <p class="card-desc">O combo perfeito para matar sua fome com muito sabor.</p>
                            <div class="card-footer">
                                <span class="price">R$ 45,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="card-badge badge-danger">OFERTA</div>
                        <div class="card-image"><img src="./Images/Deal (2).png" alt="Combo 2"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Super Combo</h3></div>
                            <p class="card-desc">Ideal para compartilhar. Tudo em dobro.</p>
                            <div class="card-footer">
                                <span class="price">R$ 89,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="card-image"><img src="./Images/Deal (3).png" alt="Combo 3"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Combo Família</h3></div>
                            <p class="card-desc">Uma explosão de sabor para a família toda aproveitar unida.</p>
                            <div class="card-footer">
                                <span class="price">R$ 119,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="card-badge badge-primary">NOVO</div>
                        <div class="card-image"><img src="./Images/Deal (4).png" alt="Combo 4"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Mega Combo</h3></div>
                            <p class="card-desc">O maior combo da casa com acompanhamentos especiais.</p>
                            <div class="card-footer">
                                <span class="price">R$ 65,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="card-image"><img src="./Images/Deal (5).png" alt="Combo 5"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Trio Parada Dura</h3></div>
                            <p class="card-desc">Três delícias diferentes em uma única embalagem especial.</p>
                            <div class="card-footer">
                                <span class="price">R$ 78,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="card-image"><img src="./Images/Deal (6).png" alt="Combo 6"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Combo Casal</h3></div>
                            <p class="card-desc">Perfeito para dividir com quem você ama.</p>
                            <div class="card-footer">
                                <span class="price">R$ 55,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category: Espetinhos -->
                <div id="skewers" style="display: flex; justify-content: space-between; align-items: center; margin: 1.5rem 0 1rem; scroll-margin-top: 100px;">
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--clr-text-primary); margin: 0;">Espetinhos</h3>
                </div>
                <div class="menu-grid">
                    <div class="product-card">
                        <div class="card-image"><img src="./Images/Grilled_skewers (1).png" alt="Espetinho 1"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Espetinho Misto</h3></div>
                            <p class="card-desc">Delicioso espetinho misto com carnes selecionadas.</p>
                            <div class="card-footer">
                                <span class="price">R$ 15,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="card-image"><img src="./Images/Grilled_skewers (2).png" alt="Espetinho 2"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Espetinho de Frango</h3></div>
                            <p class="card-desc">Espetinho de frango suculento com tempero da casa.</p>
                            <div class="card-footer">
                                <span class="price">R$ 12,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category: Sopas -->
                <div id="soups" style="display: flex; justify-content: space-between; align-items: center; margin: 1.5rem 0 1rem; scroll-margin-top: 100px;">
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--clr-text-primary); margin: 0;">Sopas</h3>
                </div>
                <div class="menu-grid">
                    <div class="product-card">
                        <div class="card-image"><img src="./Images/Soup.png" alt="Sopa"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Sopa Cremosa</h3></div>
                            <p class="card-desc">Sopa cremosa especial da casa, perfeita para dias frios.</p>
                            <div class="card-footer">
                                <span class="price">R$ 25,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category: Bebidas -->
                <div id="drinks" style="display: flex; justify-content: space-between; align-items: center; margin: 1.5rem 0 1rem; scroll-margin-top: 100px;">
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--clr-text-primary); margin: 0;">Bebidas</h3>
                </div>
                <div class="menu-grid">
                    <div class="product-card">
                        <div class="card-image"><img src="./Images/Drink (1).png" alt="Bebida 1"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Suco Natural</h3></div>
                            <p class="card-desc">Suco natural refrescante e geladinho.</p>
                            <div class="card-footer">
                                <span class="price">R$ 12,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="card-image"><img src="./Images/Drink (2).png" alt="Bebida 2"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Refrigerante Lata</h3></div>
                            <p class="card-desc">Sua bebida favorita na medida certa.</p>
                            <div class="card-footer">
                                <span class="price">R$ 6,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category: Sobremesas -->
                <div id="desserts" style="display: flex; justify-content: space-between; align-items: center; margin: 1.5rem 0 1rem; scroll-margin-top: 100px;">
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--clr-text-primary); margin: 0;">Sobremesas</h3>
                </div>
                <div class="menu-grid">
                    <div class="product-card">
                        <div class="card-image"><img src="./Images/Dessert (1).png" alt="Sobremesa 1"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Pudim Tradicional</h3></div>
                            <p class="card-desc">O clássico pudim com calda de caramelo.</p>
                            <div class="card-footer">
                                <span class="price">R$ 14,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="card-image"><img src="./Images/Dessert (2).png" alt="Sobremesa 2"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Torta de Chocolate</h3></div>
                            <p class="card-desc">Torta cremosa de chocolate para os amantes de cacau.</p>
                            <div class="card-footer">
                                <span class="price">R$ 18,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="card-image"><img src="./Images/Dessert (3).png" alt="Sobremesa 3"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Mousse de Maracujá</h3></div>
                            <p class="card-desc">Mousse refrescante com o toque cítrico perfeito.</p>
                            <div class="card-footer">
                                <span class="price">R$ 12,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="card-image"><img src="./Images/Dessert (4).png" alt="Sobremesa 4"></div>
                        <div class="card-content">
                            <div class="card-header"><h3>Sorvete da Casa</h3></div>
                            <p class="card-desc">Sorvete artesanal com coberturas à sua escolha.</p>
                            <div class="card-footer">
                                <span class="price">R$ 16,90</span>
                                <button class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>"""

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Global replacements for Logo
    content = content.replace('Logo.avif', 'Logo.png')
    
    # 2. Specific replacements for index.html
    if os.path.basename(html_file) == 'index.html':
        content = content.replace('Hero_image.avif', 'Hero_image.png')
        content = content.replace('Offer1.avif', 'Offer (1).png')
        content = content.replace('Offer2.avif', 'Offer (2).png')

    # 3. Specific replacements for offers.html
    if os.path.basename(html_file) == 'offers.html':
        content = content.replace('Offer1.avif', 'Offer (1).png')
        content = content.replace('Offer2.avif', 'Offer (2).png')
        content = content.replace('Offer3.avif', 'Offer (3).png')
        content = content.replace('Offer4.avif', 'Offer (4).png')
        content = content.replace('Deal1.avif', 'Deal (1).png')
        content = content.replace('Deal2.avif', 'Deal (2).png')

    # 4. Replace Menu content in menu.html and index.html
    if os.path.basename(html_file) in ['menu.html', 'index.html']:
        # We need to find the block to replace.
        # It starts at <div class="category-circles-wrapper">
        # And ends at the last </div> before closing </section> or <div style="text-align: center...
        
        start_pattern = r'<div class="category-circles-wrapper">'
        
        if os.path.basename(html_file) == 'menu.html':
            end_pattern = r'(?<=</div>\s{4}</div>\s{12}</div>\s{16}</div>\n            </div>\n        </section>)'
            # Actually a safer way is to use regex with DOTALL
            pattern = r'<div class="category-circles-wrapper">.*?<!-- Category: Dessert -->.*?</div>\s*</div>\s*</div>\s*</div>'
            # Let's match up to the end of the menu grid.
            match = re.search(r'<div class="category-circles-wrapper">.*?(?:<div id="dessert".*?<div class="menu-grid">.*?</div>\s*</div>\s*</div>|<!-- Category: Dessert -->.*?<div class="menu-grid">.*?</div>\s*</div>\s*</div>)', content, re.DOTALL)
            if match:
                content = content[:match.start()] + new_menu_content + content[match.end():]
        elif os.path.basename(html_file) == 'index.html':
            match = re.search(r'<div class="category-circles-wrapper">.*?(?:<div id="dessert".*?<div class="menu-grid">.*?</div>\s*</div>\s*</div>|<!-- Category: Dessert -->.*?<div class="menu-grid">.*?</div>\s*</div>\s*</div>)', content, re.DOTALL)
            if match:
                content = content[:match.start()] + new_menu_content + content[match.end():]

    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Update completed.")
