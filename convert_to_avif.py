import os
import glob
import time
from PIL import Image

gallery_dir = r"d:\WEB_DEVELOPMENT\Rosana_Restaurant\Gallery"
jpg_files = glob.glob(os.path.join(gallery_dir, "*.jpg"))
png_files = glob.glob(os.path.join(gallery_dir, "*.png"))
image_files = jpg_files + png_files

print(f"Found {len(image_files)} images to convert.")

for img_path in image_files:
    try:
        print(f"Converting {os.path.basename(img_path)}...")
        base_name = os.path.splitext(img_path)[0]
        avif_path = f"{base_name}.avif"
        
        with Image.open(img_path) as img:
            # Convert to RGB in case it's RGBA and we are saving to AVIF
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            img.save(avif_path, format="AVIF", quality=75)
            
        print(f"Saved {os.path.basename(avif_path)}")
        os.remove(img_path) # Delete original to save space
        
        # Sleep for 2 seconds to prevent system overheating/crashing
        time.sleep(2)
    except Exception as e:
        print(f"Failed to convert {img_path}: {e}")

print("All conversions completed.")
