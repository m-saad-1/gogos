import os
import glob
from bs4 import BeautifulSoup

base_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant"
html_files = glob.glob(os.path.join(base_dir, "*.html"))

# Get footer from index.html
with open(os.path.join(base_dir, "index.html"), "r", encoding="utf-8") as f:
    index_soup = BeautifulSoup(f, "html.parser")
    index_footer = index_soup.find("footer")

profile_icon_html = """
<a href="profile.html" class="nav-icon" aria-label="Perfil" style="margin-right: 0.5rem; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: rgba(236, 72, 153, 0.1); color: var(--clr-primary); transition: all 0.3s ease;">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
</a>
"""

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")
        
    changed = False
    
    # 1. Update Header (remove place order btn, add profile icon)
    order_btn = soup.find("a", class_="header-order-btn")
    if order_btn:
        order_btn.decompose()
        changed = True
        
    nav_icons = soup.find("div", class_="nav-icons")
    if nav_icons:
        # Check if profile icon already exists
        if not nav_icons.find("a", href="profile.html"):
            # Insert profile icon before the cart icon (or notification icon)
            # Find the cart icon
            cart_icon = nav_icons.find("a", class_="cart-icon")
            if cart_icon:
                profile_soup = BeautifulSoup(profile_icon_html, "html.parser")
                cart_icon.insert_before(profile_soup)
                changed = True
                
    # 2. Update Footer (copy from index.html)
    if os.path.basename(filepath) != "index.html":
        footer = soup.find("footer")
        if footer and index_footer:
            footer.replace_with(BeautifulSoup(str(index_footer), "html.parser"))
            changed = True

    # 3. index.html specific modifications
    if os.path.basename(filepath) == "index.html":
        # Remove category tabs
        tabs = soup.find("div", class_="category-tabs")
        if tabs:
            tabs.decompose()
            changed = True
            
        # Combine menu items
        menu_section = soup.find("section", id="cardapio")
        if menu_section:
            container = menu_section.find("div", class_="container")
            if container:
                # Find all product cards
                cards = container.find_all("div", class_="product-card")
                
                # Remove category headers
                for h in container.find_all("div", id=True):
                    # Category headers have id like deals, skewers, soups, drinks, desserts
                    if h.get("id") in ["deals", "skewers", "soups", "drinks", "desserts"]:
                        h.decompose()
                        
                # Remove all menu-grids
                for mg in container.find_all("div", class_="menu-grid"):
                    mg.decompose()
                    
                # Create single menu-grid
                new_grid = soup.new_tag("div", attrs={"class": "menu-grid unified-menu-grid"})
                for card in cards:
                    new_grid.append(card)
                    
                menu_label = BeautifulSoup('<span style="font-size:0.85rem; font-weight:700; color:var(--clr-primary); text-transform:uppercase; letter-spacing:1px; display:block; text-align:center; margin-bottom:1.5rem;">MENU</span>', "html.parser")
                
                # Insert label and new grid after section-header
                header = container.find("div", class_="section-header")
                if header:
                    header.insert_after(new_grid)
                    header.insert_after(menu_label)
                changed = True
                
        # Contact section 2 columns
        contact_section = soup.find("section", id="contato")
        if contact_section:
            container = contact_section.find("div", class_="container")
            if container and not container.find("div", class_="contact-grid"):
                info_cards = container.find("div", class_="contact-info-cards")
                address_card = container.find("div", class_="contact-address-card")
                contact_map = container.find("div", class_="contact-map")
                contact_form = container.find("div", class_="contact-form-container")
                
                if info_cards and address_card and contact_map and contact_form:
                    grid = soup.new_tag("div", attrs={"class": "contact-grid"})
                    left = soup.new_tag("div", attrs={"class": "contact-left"})
                    right = soup.new_tag("div", attrs={"class": "contact-right"})
                    
                    left.append(info_cards.extract())
                    left.append(address_card.extract())
                    
                    right.append(contact_form.extract())
                    right.append(contact_map.extract())
                    
                    grid.append(left)
                    grid.append(right)
                    
                    header = container.find("div", class_="section-header")
                    if header:
                        header.insert_after(grid)
                    changed = True
                    
    # 4. about.html specific modifications
    if os.path.basename(filepath) == "about.html":
        # Check if we need to fix the layout
        about_section = soup.find("section", class_="about-section")
        if about_section:
            grid = about_section.find("div", class_="about-grid")
            if grid:
                # Make sure the content is on left, image/cards on right.
                # Just add inline CSS or class to reverse order if needed.
                # Actually, in standard CSS grid, the order in DOM dictates layout.
                content = grid.find("div", class_="about-content")
                media = grid.find("div", class_="about-media")
                if content and media:
                    # ensure content is first child of grid
                    grid.insert(0, content.extract())
                    changed = True

    if changed:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(str(soup))
        print(f"Updated {os.path.basename(filepath)}")

print("HTML modifications completed.")
