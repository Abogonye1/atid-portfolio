import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const UPLOADS_DIR = path.join(ROOT, 'public', 'lovable-uploads');

const MIN_BYTES_TO_OPTIMIZE = 300 * 1024; // 300KB

async function optimizePng(filePath) {
  const before = fs.statSync(filePath).size;
  if (before < MIN_BYTES_TO_OPTIMIZE) return { optimized: false };
  const buf = await sharp(filePath)
    .resize({ width: 1600, withoutEnlargement: true })
    .png({ quality: 80, compressionLevel: 9, palette: true })
    .toBuffer();
  if (buf.length < before) {
    fs.writeFileSync(filePath, buf);
    return { optimized: true, before, after: buf.length };
  }
  return { optimized: false };
}

async function optimizeJpeg(filePath) {
  const before = fs.statSync(filePath).size;
  if (before < MIN_BYTES_TO_OPTIMIZE) return { optimized: false };
  const buf = await sharp(filePath)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  if (buf.length < before) {
    fs.writeFileSync(filePath, buf);
    return { optimized: true, before, after: buf.length };
  }
  return { optimized: false };
}

async function run() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    console.error('Uploads directory not found:', UPLOADS_DIR);
    process.exit(1);
  }
  const entries = fs.readdirSync(UPLOADS_DIR);
  let totalSaved = 0;
  for (const name of entries) {
    const filePath = path.join(UPLOADS_DIR, name);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;
    const ext = path.extname(name).toLowerCase();
    try {
      if (ext === '.png') {
        const res = await optimizePng(filePath);
        if (res.optimized) {
          totalSaved += res.before - res.after;
          console.log(`Optimized PNG: ${name} ${(res.before/1024).toFixed(0)}KB -> ${(res.after/1024).toFixed(0)}KB`);
        }
      } else if (ext === '.jpg' || ext === '.jpeg') {
        const res = await optimizeJpeg(filePath);
        if (res.optimized) {
          totalSaved += res.before - res.after;
          console.log(`Optimized JPEG: ${name} ${(res.before/1024).toFixed(0)}KB -> ${(res.after/1024).toFixed(0)}KB`);
        }
      }
    } catch (e) {
      console.warn('Skip file due to error:', name, e?.message || e);
    }
  }
  console.log('Total saved:', (totalSaved/1024).toFixed(0), 'KB');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});