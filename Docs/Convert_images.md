### Refined Prompt

Convert **all website images to AVIF format**, but process them **strictly one by one** to avoid excessive CPU/RAM usage. The system becomes unstable when too many images are processed simultaneously, so **do not batch-convert or process multiple images at once**.

* Convert each image individually to `.avif`.
* After converting each image, verify that the resulting file is valid and readable.
* Replace the corresponding image references in the project with the new AVIF files.
* Make sure all images still load correctly across the entire website, including:

  * Hero
  * Menu
  * Offers
  * Gallery
  * About
  * Other sections/pages
* Remove or retain old images only when appropriate; do not break any existing references.
* Check all image paths carefully after the conversion.
* Test the website after the changes to ensure there are **no broken images, missing assets, incorrect paths, or layout issues**.

**Important:** Process everything carefully and sequentially. Do not increase system load by converting images in parallel.

Finally, push **this exact project** to the exact GitHub repository:

`m-saad-1/gogos`

Do **not** push to another repository, create a different repository, or modify the project identity. Verify the Git remote and repository before pushing, then confirm that the final changes were pushed successfully.
