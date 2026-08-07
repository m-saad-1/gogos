import os
import glob
import time
from PIL import Image

images_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant\Images"
png_files = glob.glob(os.path.join(images_dir, "*.png"))
jpg_files = glob.glob(os.path.join(images_dir, "*.jpg"))
image_files = png_files + jpg_files

print(f"Found {len(image_files)} images to convert.")

for img_path in image_files:
    try:
        print(f"Converting {os.path.basename(img_path)}...")
        base_name = os.path.splitext(img_path)[0]
        avif_path = f"{base_name}.avif"
        
        with Image.open(img_path) as img:
            # Preserve alpha channel for PNGs
            if img.mode == "P":
                img = img.convert("RGBA")
            img.save(avif_path, format="AVIF", quality=60)
            
        print(f"Saved {os.path.basename(avif_path)}")
        os.remove(img_path)
        
        time.sleep(1)
    except Exception as e:
        print(f"Failed to convert {img_path}: {e}")

print("All conversions completed.")
