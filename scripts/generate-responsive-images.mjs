import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const UPLOADS_DIR = path.join(ROOT, 'public', 'lovable-uploads');
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'imageManifest.json');
const TARGET_WIDTHS = [480, 768, 1024, 1200, 1600];

async function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Uploads directory not found: ${dir}`);
  }
}

async function getImageMeta(filePath) {
  const meta = await sharp(filePath).metadata();
  return meta;
}

async function generateVariantsFor(fileName) {
  const srcPath = path.join(UPLOADS_DIR, fileName);
  const base = path.basename(fileName, path.extname(fileName));
  const meta = await getImageMeta(srcPath);
  const maxWidth = meta.width || 0;
  const createdWidths = [];

  for (const w of TARGET_WIDTHS) {
    const targetW = Math.min(w, maxWidth);
    if (targetW <= 0) continue;

    const webpOut = path.join(UPLOADS_DIR, `${base}-${w}w.webp`);
    const avifOut = path.join(UPLOADS_DIR, `${base}-${w}w.avif`);

    const needsWebp = !fs.existsSync(webpOut);
    const needsAvif = !fs.existsSync(avifOut);

    try {
      if (needsWebp) {
        await sharp(srcPath)
          .resize({ width: targetW, withoutEnlargement: true })
          .webp({ quality: 72 })
          .toFile(webpOut);
      }
      if (needsAvif) {
        await sharp(srcPath)
          .resize({ width: targetW, withoutEnlargement: true })
          .avif({ quality: 55 })
          .toFile(avifOut);
      }
      createdWidths.push(w);
    } catch (e) {
      console.warn(`Variant generation skipped for ${fileName} at ${w}w:`, e?.message || e);
    }
  }

  return { base, widths: createdWidths };
}

async function run() {
  await ensureDirExists(UPLOADS_DIR);
  console.log('Generating responsive variants in:', UPLOADS_DIR);

  const entries = fs.readdirSync(UPLOADS_DIR);
  const images = entries.filter((n) => /\.(png|jpg|jpeg)$/i.test(n));
  const manifest = {};
  let totalFiles = 0;

  for (const name of images) {
    const src = path.join(UPLOADS_DIR, name);
    const stat = fs.statSync(src);
    if (!stat.isFile()) continue;
    try {
      const { base, widths } = await generateVariantsFor(name);
      if (widths.length > 0) {
        manifest[base] = widths;
        totalFiles += widths.length;
        console.log(`Processed ${name}, new/confirmed widths: ${widths.join(', ')}`);
      } else {
        console.log(`No variants created for ${name} (possibly very small image).`);
      }
    } catch (e) {
      console.warn('Failed processing', name, e?.message || e);
    }
  }

  // Ensure data directory exists
  const dataDir = path.dirname(MANIFEST_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log('Wrote manifest:', MANIFEST_PATH);
  console.log('Done. Total new/confirmed variant files:', totalFiles);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});