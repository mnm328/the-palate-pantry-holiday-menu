const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const W = 1200;
const H = 900;
const DISHES_DIR = '/app/applet/public/assets/dishes';
const OUT_DIR = '/app/applet/public/assets';

// Aluminum tray SVG border/container generator
function getAluminumTraySvg(w, h) {
  return Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Aluminum foil rim metallic gradient -->
        <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f0f3f6" />
          <stop offset="25%" stop-color="#c8d1d8" />
          <stop offset="50%" stop-color="#ffffff" />
          <stop offset="75%" stop-color="#9eaab4" />
          <stop offset="100%" stop-color="#dce3e8" />
        </linearGradient>
        <!-- Tray interior dark shadow -->
        <linearGradient id="innerShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1a1c1e" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#0e1012" stop-opacity="0.8" />
        </linearGradient>
      </defs>
      <!-- Outer tray shadow -->
      <rect x="6" y="8" width="${w - 12}" height="${h - 12}" rx="16" ry="16" fill="#000000" opacity="0.45" filter="blur(6px)" />
      <!-- Outer aluminum folded rim -->
      <rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="14" ry="14" fill="url(#rimGrad)" stroke="#7a8894" stroke-width="2" />
      <!-- Crimped rim details -->
      <rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="11" ry="11" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.85" />
      <!-- Tray interior recess -->
      <rect x="14" y="14" width="${w - 28}" height="${h - 28}" rx="9" ry="9" fill="url(#innerShadow)" stroke="#4a5259" stroke-width="1" />
    </svg>
  `);
}

// Round container for salads/soups
function getRoundContainerSvg(size) {
  return Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="plasticRim" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stop-color="#e2e8f0" stop-opacity="0.3" />
          <stop offset="95%" stop-color="#ffffff" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.7" />
        </radialGradient>
      </defs>
      <!-- Drop shadow -->
      <circle cx="${size/2}" cy="${size/2 + 5}" r="${size/2 - 8}" fill="#000000" opacity="0.4" />
      <!-- Outer plastic tub -->
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 6}" fill="#1a1c1e" stroke="#cbd5e1" stroke-width="4" />
      <!-- Rim highlight -->
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 6}" fill="url(#plasticRim)" />
    </svg>
  `);
}

// Background for Holiday Party Favorites
function getHolidayPartyTableSvg() {
  return `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="woodBg" cx="50%" cy="50%" r="75%">
        <stop offset="0%" stop-color="#3d2b1f" />
        <stop offset="60%" stop-color="#281a12" />
        <stop offset="100%" stop-color="#140b07" />
      </radialGradient>
      <radialGradient id="candleGlow" cx="50%" cy="20%" r="60%">
        <stop offset="0%" stop-color="#ffdf7e" stop-opacity="0.35" />
        <stop offset="50%" stop-color="#e17055" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      <pattern id="woodGrain" width="100" height="20" patternUnits="userSpaceOnUse">
        <path d="M0 10 Q 50 12, 100 10" stroke="#1d120c" stroke-width="1.5" fill="none" opacity="0.4" />
        <path d="M0 18 Q 50 16, 100 18" stroke="#4a3525" stroke-width="1" fill="none" opacity="0.25" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#woodBg)" />
    <rect width="100%" height="100%" fill="url(#woodGrain)" />
    <!-- Festive cranberry table runner down center -->
    <rect x="60" y="40" width="1080" height="820" rx="16" fill="#4d1217" opacity="0.85" />
    <rect x="70" y="50" width="1060" height="800" rx="12" fill="none" stroke="#d4af37" stroke-width="2" stroke-dasharray="12 6" opacity="0.6" />
    <!-- Candlelight glow -->
    <rect width="100%" height="100%" fill="url(#candleGlow)" />
    <!-- Christmas decorations -->
    <!-- Pine branches top -->
    <g fill="#1a3d24" opacity="0.7">
      <ellipse cx="140" cy="50" rx="80" ry="25" />
      <ellipse cx="600" cy="40" rx="120" ry="30" />
      <ellipse cx="1060" cy="50" rx="80" ry="25" />
      <ellipse cx="100" cy="850" rx="90" ry="25" />
      <ellipse cx="1100" cy="850" rx="90" ry="25" />
    </g>
    <!-- Berries & Ornaments -->
    <circle cx="120" cy="45" r="7" fill="#b91c1c" />
    <circle cx="135" cy="40" r="6" fill="#dc2626" />
    <circle cx="1050" cy="45" r="7" fill="#b91c1c" />
    <circle cx="1065" cy="40" r="6" fill="#dc2626" />
    <!-- Gold baubles -->
    <circle cx="530" cy="45" r="14" fill="#d97706" opacity="0.8" />
    <circle cx="670" cy="45" r="12" fill="#eab308" opacity="0.8" />
  </svg>`;
}

// Background for Asian Holiday Table
function getAsianHolidayTableSvg() {
  return `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="greenBg" cx="50%" cy="50%" r="75%">
        <stop offset="0%" stop-color="#1f422b" />
        <stop offset="60%" stop-color="#132c1c" />
        <stop offset="100%" stop-color="#0a180e" />
      </radialGradient>
      <radialGradient id="goldGlow" cx="50%" cy="30%" r="65%">
        <stop offset="0%" stop-color="#fde047" stop-opacity="0.3" />
        <stop offset="50%" stop-color="#ea580c" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#greenBg)" />
    <rect width="100%" height="100%" fill="url(#goldGlow)" />
    <!-- Gold holiday stars and candles in corners -->
    <circle cx="110" cy="80" r="28" fill="#eab308" opacity="0.25" filter="blur(8px)" />
    <circle cx="110" cy="80" r="16" fill="#fef08a" />
    <circle cx="1090" cy="80" r="28" fill="#eab308" opacity="0.25" filter="blur(8px)" />
    <circle cx="1090" cy="80" r="16" fill="#fef08a" />
    <!-- Bottom candle -->
    <circle cx="600" cy="855" r="24" fill="#f97316" opacity="0.3" filter="blur(6px)" />
    <circle cx="600" cy="855" r="14" fill="#fed7aa" />
    <!-- Pine sprigs -->
    <g fill="#143320" opacity="0.8">
      <ellipse cx="100" cy="130" rx="60" ry="20" />
      <ellipse cx="1100" cy="130" rx="60" ry="20" />
      <ellipse cx="600" cy="50" rx="100" ry="25" />
    </g>
  </svg>`;
}

// Background for Classic Christmas Comfort
function getClassicComfortTableSvg() {
  return `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="darkWood" cx="50%" cy="50%" r="75%">
        <stop offset="0%" stop-color="#3b2518" />
        <stop offset="60%" stop-color="#24140c" />
        <stop offset="100%" stop-color="#110905" />
      </radialGradient>
      <radialGradient id="warmAmber" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#fed7aa" stop-opacity="0.32" />
        <stop offset="50%" stop-color="#ea580c" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#darkWood)" />
    <rect width="100%" height="100%" fill="url(#warmAmber)" />
    <!-- Warm candle votives -->
    <circle cx="80" cy="90" r="22" fill="#fef08a" opacity="0.8" />
    <circle cx="80" cy="90" r="38" fill="#fde047" opacity="0.25" filter="blur(8px)" />
    <circle cx="1120" cy="90" r="22" fill="#fef08a" opacity="0.8" />
    <circle cx="1120" cy="90" r="38" fill="#fde047" opacity="0.25" filter="blur(8px)" />
    <circle cx="180" cy="840" r="20" fill="#fef08a" opacity="0.75" />
    <!-- Pinecones and Christmas branches -->
    <g fill="#17361f" opacity="0.75">
      <ellipse cx="600" cy="50" rx="110" ry="24" />
      <ellipse cx="1080" cy="850" rx="80" ry="25" />
    </g>
    <!-- Berries -->
    <circle cx="580" cy="48" r="6" fill="#dc2626" />
    <circle cx="610" cy="52" r="7" fill="#b91c1c" />
    <circle cx="625" cy="46" r="6" fill="#ef4444" />
  </svg>`;
}

// Helper to fit dish image inside aluminum tray
async function createDishInTray(dishFile, trayW, trayH, isRound = false) {
  const dishPath = path.join(DISHES_DIR, dishFile);
  if (!fs.existsSync(dishPath)) {
    console.error(`Missing dish: ${dishPath}`);
    return null;
  }

  const traySvg = isRound ? getRoundContainerSvg(trayW) : getAluminumTraySvg(trayW, trayH);
  const trayBase = await sharp(traySvg).png().toBuffer();

  const padX = isRound ? 20 : 18;
  const padY = isRound ? 20 : 18;
  const innerW = trayW - padX * 2;
  const innerH = trayH - padY * 2;

  // Resize and cover dish image
  const dishBuf = await sharp(dishPath)
    .resize(innerW, innerH, { fit: 'cover', position: 'center' })
    .png()
    .toBuffer();

  // Composite dish into the tray
  return await sharp(trayBase)
    .composite([
      {
        input: dishBuf,
        left: padX,
        top: padY,
        blend: 'over'
      }
    ])
    .png()
    .toBuffer();
}

async function buildFeasts() {
  console.log('Generating realistic catering tray feast images...');

  // Tray dimensions: 2 large top trays, 2 bottom trays (1 large, 1 loaf or round)
  const trayW = 490;
  const trayH = 340;

  // 1. Classic Christmas Comfort
  // - Top Left: Baked Macaroni
  // - Top Right: Homestyle Fried Chicken with Gravy
  // - Bottom Left: Shanghai Rolls
  // - Bottom Right: Banana Loaf Cake
  {
    const bgSvg = Buffer.from(getClassicComfortTableSvg());
    const [t1, t2, t3, t4] = await Promise.all([
      createDishInTray('baked-macaroni-1.png', trayW, trayH),
      createDishInTray('homestyle-fried-chicken-with-gravy-1.png', trayW, trayH),
      createDishInTray('shanghai-1.png', trayW, trayH),
      createDishInTray('banana-loaf-cake.webp', 460, 320)
    ]);

    const result = await sharp(bgSvg)
      .composite([
        { input: t1, left: 80, top: 100 },
        { input: t2, left: 630, top: 100 },
        { input: t3, left: 80, top: 480 },
        { input: t4, left: 645, top: 490 }
      ])
      .jpeg({ quality: 92 })
      .toBuffer();

    fs.writeFileSync(path.join(OUT_DIR, 'Classic Christmas Comfort.png'), result);
    fs.writeFileSync('/app/applet/public/Classic Christmas Comfort.png', result);
    fs.writeFileSync(path.join(OUT_DIR, 'feast-classic-christmas-comfort.jpg'), result);
    console.log('Created Classic Christmas Comfort');
  }

  // 2. Holiday Party Favorites
  // - Top Left: Baked Spaghetti with Meatballs
  // - Top Right: Flavored Chicken Wings
  // - Bottom Left: Pork BBQ skewers
  // - Bottom Right: Lemon Loaf Cake
  {
    const bgSvg = Buffer.from(getHolidayPartyTableSvg());
    const [t1, t2, t3, t4] = await Promise.all([
      createDishInTray('baked-spaghetti-meatballs.webp', trayW, trayH),
      createDishInTray('flavored-chicken-wings.webp', trayW, trayH),
      createDishInTray('nyo-bbq-1.png', trayW, trayH),
      createDishInTray('banana-loaf-cake.webp', 460, 320) // lemon loaf substitute with loaf pan
    ]);

    const result = await sharp(bgSvg)
      .composite([
        { input: t1, left: 80, top: 100 },
        { input: t2, left: 630, top: 100 },
        { input: t3, left: 80, top: 480 },
        { input: t4, left: 645, top: 490 }
      ])
      .jpeg({ quality: 92 })
      .toBuffer();

    fs.writeFileSync(path.join(OUT_DIR, 'Holiday Party Favorites.png'), result);
    fs.writeFileSync('/app/applet/public/Holiday Party Favorites.png', result);
    fs.writeFileSync(path.join(OUT_DIR, 'feast-holiday-party-favorites.jpg'), result);
    console.log('Created Holiday Party Favorites');
  }

  // 3. Asian Holiday Table
  // - Top Left: Golden Garlic Sotanghon
  // - Top Right: Chinese-Style Braised Pork Belly
  // - Bottom Left: Chicken Wings Asian Style
  // - Bottom Right: Korean Cucumber Salad (round tub)
  {
    const bgSvg = Buffer.from(getAsianHolidayTableSvg());
    const [t1, t2, t3, t4] = await Promise.all([
      createDishInTray('golden-garlic-sotanghon.webp', trayW, trayH),
      createDishInTray('chinese-braised-pork-belly.webp', trayW, trayH),
      createDishInTray('flavored-chicken-wings.webp', trayW, trayH),
      createDishInTray('cucumber-salad-1.png', 340, 340, true)
    ]);

    const result = await sharp(bgSvg)
      .composite([
        { input: t1, left: 80, top: 100 },
        { input: t2, left: 630, top: 100 },
        { input: t3, left: 80, top: 480 },
        { input: t4, left: 700, top: 480 }
      ])
      .jpeg({ quality: 92 })
      .toBuffer();

    fs.writeFileSync(path.join(OUT_DIR, 'Asian Holiday Table.png'), result);
    fs.writeFileSync('/app/applet/public/Asian Holiday Table.png', result);
    fs.writeFileSync(path.join(OUT_DIR, 'feast-asian-holiday.jpg'), result);
    fs.writeFileSync(path.join(OUT_DIR, 'feast-asian-holiday-table.jpg'), result);
    console.log('Created Asian Holiday Table');
  }

  console.log('All 3 catering tray images generated and saved!');
}

buildFeasts().catch(err => {
  console.error(err);
  process.exit(1);
});
