const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateFavicons() {
  const svgPath = path.join(__dirname, '..', 'public', 'farmculture.svg');
  const publicDir = path.join(__dirname, '..', 'public');
  const svgBuffer = fs.readFileSync(svgPath);

  // 1. Generate PNGs at all required standard dimensions
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    const outPath = path.join(publicDir, name);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`Generated: ${name} (${size}x${size})`);
  }

  // 2. Generate standard favicon.ico (32x32 PNG header in ICO format or 32x32 png as favicon.ico fallback)
  const ico32Buffer = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  // Standard ICO container format holding a single 32x32 PNG
  // ICO header: 0,0, 1,0 (type 1 for icon), 1,0 (1 image)
  // Entry: width(32), height(32), colorCount(0), reserved(0), planes(1,0), bpp(32,0), bytesSize(4 bytes le), offset(4 bytes le)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO Type
  header.writeUInt16LE(1, 4); // 1 Image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0); // Width 32
  entry.writeUInt8(32, 1); // Height 32
  entry.writeUInt8(0, 2);  // Colors
  entry.writeUInt8(0, 3);  // Reserved
  entry.writeUInt16LE(1, 4); // Color planes
  entry.writeUInt16LE(32, 6); // Bits per pixel
  entry.writeUInt32LE(ico32Buffer.length, 8); // Size of image data
  entry.writeUInt32LE(22, 12); // Offset to image data (6 header + 16 entry = 22)

  const icoBuffer = Buffer.concat([header, entry, ico32Buffer]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Generated: favicon.ico (multi-browser compatible 32x32 embedded container)');

  // 3. Generate site.webmanifest
  const manifest = {
    name: "Farmculture AI",
    short_name: "Farmculture",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#0F2E24",
    background_color: "#0F2E24",
    display: "standalone"
  };
  fs.writeFileSync(
    path.join(publicDir, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
  console.log('Generated: site.webmanifest');
}

generateFavicons().catch(err => {
  console.error(err);
  process.exit(1);
});
