/**
 * generate-favicon.mjs — Zeraus DS
 * Genera favicon.ico, favicon-32x32.png y apple-touch-icon.png
 * a partir del logo "Z" real de la marca (gradiente violeta→coral),
 * reemplazando el ícono por defecto de Lovable.
 *
 * EJECUTAR: node scripts/generate-favicon.mjs
 */
import sharp from "sharp";
import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

const svg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#734DCB"/>
      <stop offset="100%" stop-color="#FF6B7A"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#g)"/>
  <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle"
        fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-weight="700"
        font-size="320" letter-spacing="-8">Z</text>
</svg>`;

function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + 16 * count;
  let offset = headerSize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const entries = [];
  pngBuffers.forEach((buf, i) => {
    const entryOffset = 6 + i * 16;
    const dim = buf.size >= 256 ? 0 : buf.size;
    header.writeUInt8(dim, entryOffset);
    header.writeUInt8(dim, entryOffset + 1);
    header.writeUInt8(0, entryOffset + 2);
    header.writeUInt8(0, entryOffset + 3);
    header.writeUInt16LE(1, entryOffset + 4);
    header.writeUInt16LE(32, entryOffset + 6);
    header.writeUInt32LE(buf.data.length, entryOffset + 8);
    header.writeUInt32LE(offset, entryOffset + 12);
    offset += buf.data.length;
    entries.push(buf.data);
  });

  return Buffer.concat([header, ...entries]);
}

(async () => {
  const sizes = [16, 32, 48];
  const pngBuffers = [];
  for (const size of sizes) {
    const data = await sharp(Buffer.from(svg(size)), { density: 384 })
      .resize(size, size)
      .png()
      .toBuffer();
    pngBuffers.push({ size, data });
  }

  writeFileSync(path.join(publicDir, "favicon.ico"), buildIco(pngBuffers));
  console.log("✓ favicon.ico");

  await sharp(Buffer.from(svg(32)), { density: 384 })
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, "favicon-32x32.png"));
  console.log("✓ favicon-32x32.png");

  await sharp(Buffer.from(svg(180)), { density: 384 })
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("✓ apple-touch-icon.png");

  console.log("\n✅ Favicon generado en /public");
})();
