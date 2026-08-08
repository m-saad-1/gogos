import os
import shutil

# Copy Hero_image.avif to About.avif
images_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant\Images"
src = os.path.join(images_dir, "Hero_image.avif")
dst = os.path.join(images_dir, "About.avif")

if os.path.exists(src):
    shutil.copy(src, dst)

# Append CSS
css_path = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant\css\style.css"
css_rules = """

/* Custom Overrides */
html, body {
    overflow-x: hidden;
}

@media (min-width: 992px) {
    .unified-menu-grid {
        grid-template-columns: repeat(4, 1fr) !important;
    }
}
.unified-menu-grid .card-image img {
    aspect-ratio: 1 / 1;
    object-fit: cover;
}

/* Contact Grid */
.contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}
@media (min-width: 992px) {
    .contact-grid {
        grid-template-columns: 1fr 1fr;
        align-items: start;
    }
}
.contact-left { display: flex; flex-direction: column; gap: 1.5rem; }
.contact-right { display: flex; flex-direction: column; gap: 1.5rem; }
.contact-right form { margin-bottom: 1rem; }

/* Notification panel fix */
.notification-panel {
    right: 0 !important;
    left: auto !important;
    transform: translateY(10px) !important;
}
.notification-panel.show {
    transform: translateY(0) !important;
}
@media (max-width: 768px) {
    .notification-panel {
        right: 1rem !important;
        left: 1rem !important;
    }
}
"""

with open(css_path, "a", encoding="utf-8") as f:
    f.write(css_rules)

print("CSS and Image fix applied.")
