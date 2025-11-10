import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const srcPng = path.join('public', 'lovable-uploads', 'freepik__create-an-image-with-a-bold-text-that-says-fashion__80562.png');
const outJpg = path.join('public', 'lovable-uploads', 'freepik__create-an-image-with-a-bold-text-that-says-fashion__80562.jpg');

async function main() {
  try {
    await fs.access(srcPng);

    const targetBytes = 500 * 1024;
    let quality = 80;
    let result;

    // Try progressively lower qualities until under target or min quality reached
    for (const q of [80, 75, 70, 65, 60, 55, 50]) {
      quality = q;
      await sharp(srcPng)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality, mozjpeg: true, progressive: true })
        .toFile(outJpg);
      const stat = await fs.stat(outJpg);
      if (stat.size <= targetBytes) { result = stat.size; break; }
      result = stat.size;
    }

    const srcStat = await fs.stat(srcPng);
    const outStat = await fs.stat(outJpg);
    console.log(`Source PNG: ${srcStat.size} bytes`);
    console.log(`Output JPG: ${outStat.size} bytes at quality=${quality}`);
    if (outStat.size > targetBytes) {
      console.warn('Warning: Output still exceeds 500KB. Consider cropping or further downscaling.');
    } else {
      console.log('Output is under 500KB.');
    }
  } catch (err) {
    console.error('Compression failed:', err);
    process.exit(1);
  }
}

main();