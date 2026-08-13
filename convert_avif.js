const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'assets', 'images');

async function main() {
    const files = fs.readdirSync(imagesDir);
    const toConvert = files.filter(f => f.match(/\.(png|jpe?g)$/i));
    
    console.log(`Found ${toConvert.length} images to convert.`);
    
    for (const file of toConvert) {
        const filePath = path.join(imagesDir, file);
        const nameWithoutExt = path.parse(file).name;
        // Keep original suffix, just change extension to .avif
        const outPath = path.join(imagesDir, `${nameWithoutExt}.avif`);
        
        // If avif already exists (and has same name), skip
        if (fs.existsSync(outPath) && outPath !== filePath) {
            console.log(`AVIF already exists for ${file}, skipping conversion.`);
            continue;
        }
        
        console.log(`Converting ${file} -> ${nameWithoutExt}.avif...`);
        try {
            await sharp(filePath)
                .avif({ quality: 80 })
                .toFile(outPath);
            console.log(`Success: ${nameWithoutExt}.avif created.`);
            
            // Delete old file
            fs.unlinkSync(filePath);
            console.log(`Deleted original: ${file}`);
        } catch (e) {
            console.error(`Failed to convert ${file}:`, e);
        }
    }
    console.log('Conversion complete.');
}

main().catch(console.error);
