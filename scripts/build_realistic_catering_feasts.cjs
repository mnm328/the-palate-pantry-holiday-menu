const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const W = 1200;
const H = 900;
const DISHES_DIR = '/app/applet/public/assets/dishes';
const OUT_DIR = '/app/applet/public/assets';

// Photorealistic aluminum catering foil tray generator
function createAluminumTraySvg(w, h, label) {
  return Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Metallic brushed aluminum gradient for crimped rim -->
        <linearGradient id="foilRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="15%" stop-color="#d9e2ec" />
          <stop offset="35%" stop-color="#bcccdc" />
          <stop offset="50%" stop-color="#f0f4f8" />
          <stop offset="70%" stop-color="#9fb3c8" />
          <stop offset="85%" stop-color="#d9e2ec" />
          <stop offset="100%" stop-color="#829ab1" />
        </linearGradient>

        <!-- Deep tray interior shadow -->
        <radialGradient id="innerCavityShadow" cx="50%" cy="50%" r="55%">
          <stop offset="70%" stop-color="#000000" stop-opacity="0" />
          <stop offset="90%" stop-color="#0b1015" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.85" />
        </radialGradient>

        <!-- Foil crimping pattern -->
        <pattern id="foilCrimping" width="12" height="12" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="6" y2="12" stroke="#ffffff" stroke-width="1.2" opacity="0.6" />
          <line x1="6" y1="12" x2="12" y2="0" stroke="#627d98" stroke-width="1.2" opacity="0.5" />
        </pattern>
      </defs>

      <!-- Soft outer ambient shadow -->
      <rect x="12" y="14" width="${w - 24}" height="${h - 24}" rx="18" ry="18" fill="#000000" opacity="0.6" filter="blur(10px)" />
      <!-- Sharp contact shadow -->
      <rect x="6" y="8" width="${w - 12}" height="${h - 12}" rx="16" ry="16" fill="#05080b" opacity="0.75" />

      <!-- Folded Outer Aluminum Lip -->
      <rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="16" ry="16" fill="url(#foilRimGrad)" stroke="#486581" stroke-width="1.5" />
      <rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="16" ry="16" fill="url(#foilCrimping)" opacity="0.35" />

      <!-- Inner crimp line -->
      <rect x="10" y="10" width="${w - 20}" height="${h - 20}" rx="13" ry="13" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.7" />
      <rect x="14" y="14" width="${w - 28}" height="${h - 28}" rx="11" ry="11" fill="none" stroke="#334e68" stroke-width="1.5" opacity="0.8" />

      <!-- Interior tray well (base where food sits) -->
      <rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="9" ry="9" fill="#102a43" />
      <!-- Cavity edge shadow overlay -->
      <rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="9" ry="9" fill="url(#innerCavityShadow)" />

      <!-- Subtle aluminum corner embossed ridges -->
      <line x1="8" y1="8" x2="20" y2="20" stroke="#ffffff" stroke-width="2" opacity="0.8" />
      <line x1="${w - 8}" y1="8" x2="${w - 20}" y2="20" stroke="#ffffff" stroke-width="2" opacity="0.8" />
      <line x1="8" y1="${h - 8}" x2="20" y2="${h - 20}" stroke="#ffffff" stroke-width="2" opacity="0.8" />
      <line x1="${w - 8}" y1="${h - 8}" x2="${w - 20}" y2="${h - 20}" stroke="#ffffff" stroke-width="2" opacity="0.8" />
    </svg>
  `);
}

// Clear round deli container for salads
function createDeliTubSvg(size) {
  return Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tubRim" cx="50%" cy="50%" r="50%">
          <stop offset="75%" stop-color="#ffffff" stop-opacity="0" />
          <stop offset="90%" stop-color="#e2e8f0" stop-opacity="0.6" />
          <stop offset="96%" stop-color="#ffffff" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#64748b" stop-opacity="0.8" />
        </radialGradient>
      </defs>
      <!-- Shadow -->
      <circle cx="${size/2}" cy="${size/2 + 8}" r="${size/2 - 10}" fill="#000000" opacity="0.55" filter="blur(8px)" />
      <!-- Base container -->
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 8}" fill="#0f172a" stroke="#94a3b8" stroke-width="3" />
      <!-- Rim highlight -->
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 8}" fill="url(#tubRim)" />
      <!-- Inner lip ring -->
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 18}" fill="none" stroke="#cbd5e1" stroke-width="2" opacity="0.6" />
    </svg>
  `);
}

// Holiday Party Favorites Tablecloth & Atmosphere
function getHolidayPartyBackground() {
  return Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Dark Walnut Wooden Table Base -->
        <linearGradient id="walnutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#241711" />
          <stop offset="30%" stop-color="#332219" />
          <stop offset="70%" stop-color="#2a1b13" />
          <stop offset="100%" stop-color="#190e0a" />
        </linearGradient>

        <!-- Wood plank dividers -->
        <pattern id="woodPlanks" width="1200" height="150" patternUnits="userSpaceOnUse">
          <line x1="0" y1="149" x2="1200" y2="149" stroke="#120a06" stroke-width="3" opacity="0.8" />
          <line x1="0" y1="150" x2="1200" y2="150" stroke="#4a3326" stroke-width="1.5" opacity="0.4" />
        </pattern>

        <!-- Warm Holiday Ambient Lights & Candlelight Bokeh -->
        <radialGradient id="candleCenter" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#fed7aa" stop-opacity="0.32" />
          <stop offset="40%" stop-color="#f97316" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="cornerGlowL" cx="10%" cy="15%" r="35%">
          <stop offset="0%" stop-color="#fef08a" stop-opacity="0.38" />
          <stop offset="60%" stop-color="#eab308" stop-opacity="0.10" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="cornerGlowR" cx="90%" cy="15%" r="35%">
          <stop offset="0%" stop-color="#fef08a" stop-opacity="0.38" />
          <stop offset="60%" stop-color="#eab308" stop-opacity="0.10" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Table surface -->
      <rect width="100%" height="100%" fill="url(#walnutGrad)" />
      <rect width="100%" height="100%" fill="url(#woodPlanks)" />

      <!-- Center table runner in festive deep wine-red with gold stitched borders -->
      <rect x="70" y="30" width="1060" height="840" rx="16" fill="#4a0f15" opacity="0.88" />
      <rect x="80" y="40" width="1040" height="820" rx="12" fill="none" stroke="#d4af37" stroke-width="2.5" stroke-dasharray="14 7" opacity="0.75" />

      <!-- Ambient glow layers -->
      <rect width="100%" height="100%" fill="url(#candleCenter)" />
      <rect width="100%" height="100%" fill="url(#cornerGlowL)" />
      <rect width="100%" height="100%" fill="url(#cornerGlowR)" />

      <!-- Christmas Evergreen Sprigs & Berry Garlands -->
      <!-- Top Garland -->
      <g stroke="#1b4329" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.85">
        <path d="M 40,60 Q 180,95 320,60" />
        <path d="M 880,60 Q 1020,95 1160,60" />
      </g>
      <!-- Needles -->
      <g stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round" opacity="0.9">
        <path d="M 60,65 L 85,45 M 80,70 L 105,52 M 110,75 L 135,58 M 140,78 L 170,62 M 175,76 L 205,62 M 210,74 L 240,62" />
        <path d="M 1140,65 L 1115,45 M 1120,70 L 1095,52 M 1090,75 L 1065,58 M 1060,78 L 1030,62 M 1025,76 L 995,62 M 990,74 L 960,62" />
      </g>
      <!-- Red Holly Berries -->
      <g>
        <circle cx="105" cy="72" r="7.5" fill="#dc2626" />
        <circle cx="118" cy="78" r="6.5" fill="#991b1b" />
        <circle cx="112" cy="85" r="7" fill="#ef4444" />
        <circle cx="103" cy="70" r="2.2" fill="#ffffff" opacity="0.7" />

        <circle cx="1095" cy="72" r="7.5" fill="#dc2626" />
        <circle cx="1082" cy="78" r="6.5" fill="#991b1b" />
        <circle cx="1088" cy="85" r="7" fill="#ef4444" />
        <circle cx="1097" cy="70" r="2.2" fill="#ffffff" opacity="0.7" />
      </g>

      <!-- Warm candlelight bokeh circles top -->
      <circle cx="200" cy="50" r="32" fill="#fde047" opacity="0.18" filter="blur(10px)" />
      <circle cx="600" cy="40" r="45" fill="#fde047" opacity="0.15" filter="blur(14px)" />
      <circle cx="1000" cy="50" r="32" fill="#fde047" opacity="0.18" filter="blur(10px)" />
    </svg>
  `);
}

// Asian Holiday Table Background (Deep Forest Green Tablecloth)
function getAsianHolidayBackground() {
  return Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Deep Festive Emerald Damask Linen Tablecloth -->
        <radialGradient id="emeraldBg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1b4d32" />
          <stop offset="50%" stop-color="#123824" />
          <stop offset="80%" stop-color="#0a2417" />
          <stop offset="100%" stop-color="#04120b" />
        </radialGradient>
        <!-- Linen texture -->
        <pattern id="linenWeave" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="none" />
          <path d="M0 0h10v1H0zM0 5h10v1H0zM0 0v10h1V0zM5 0v10h1V0z" fill="#ffffff" opacity="0.025" />
        </pattern>
        <!-- Warm festive glow -->
        <radialGradient id="goldAmbient" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stop-color="#fef08a" stop-opacity="0.30" />
          <stop offset="50%" stop-color="#ca8a04" stop-opacity="0.10" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#emeraldBg)" />
      <rect width="100%" height="100%" fill="url(#linenWeave)" />

      <!-- Gold Embroidered Festive Center Border -->
      <rect x="70" y="35" width="1060" height="830" rx="18" fill="#0d281a" opacity="0.65" />
      <rect x="80" y="45" width="1040" height="810" rx="14" fill="none" stroke="#d4af37" stroke-width="2" stroke-dasharray="12 6" opacity="0.6" />

      <!-- Warm Candlelight Glow -->
      <rect width="100%" height="100%" fill="url(#goldAmbient)" />

      <!-- Corner Holiday Candle Votives -->
      <circle cx="120" cy="75" r="42" fill="#eab308" opacity="0.22" filter="blur(12px)" />
      <circle cx="120" cy="75" r="20" fill="#fef08a" opacity="0.75" />
      <circle cx="1080" cy="75" r="42" fill="#eab308" opacity="0.22" filter="blur(12px)" />
      <circle cx="1080" cy="75" r="20" fill="#fef08a" opacity="0.75" />

      <!-- Festive Pine sprigs with gold berries -->
      <g stroke="#092014" stroke-width="3" stroke-linecap="round" fill="none">
        <path d="M 60,95 Q 140,135 220,105" />
        <path d="M 1140,95 Q 1060,135 980,105" />
      </g>
      <circle cx="150" cy="118" r="6" fill="#eab308" />
      <circle cx="162" cy="122" r="5" fill="#ca8a04" />
      <circle cx="1050" cy="118" r="6" fill="#eab308" />
      <circle cx="1038" cy="122" r="5" fill="#ca8a04" />
    </svg>
  `);
}

// Classic Christmas Comfort Table Background (Rustic Farmhouse Wood + Holly)
function getClassicComfortBackground() {
  return Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Dark Rustic Cedar / Pine Wood Table -->
        <linearGradient id="rusticWood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2c1a11" />
          <stop offset="35%" stop-color="#3d261a" />
          <stop offset="70%" stop-color="#28170e" />
          <stop offset="100%" stop-color="#140a06" />
        </linearGradient>

        <pattern id="plankLines" width="1200" height="170" patternUnits="userSpaceOnUse">
          <line x1="0" y1="168" x2="1200" y2="168" stroke="#0e0603" stroke-width="3" opacity="0.75" />
          <line x1="0" y1="169" x2="1200" y2="169" stroke="#523525" stroke-width="1.2" opacity="0.35" />
        </pattern>

        <radialGradient id="hearthGlow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#fed7aa" stop-opacity="0.34" />
          <stop offset="50%" stop-color="#ea580c" stop-opacity="0.10" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#rusticWood)" />
      <rect width="100%" height="100%" fill="url(#plankLines)" />

      <!-- Center table runner in festive hunter green -->
      <rect x="70" y="30" width="1060" height="840" rx="16" fill="#1b3d27" opacity="0.8" />
      <rect x="80" y="40" width="1040" height="820" rx="12" fill="none" stroke="#d4af37" stroke-width="2" stroke-dasharray="12 6" opacity="0.6" />

      <!-- Warm glow -->
      <rect width="100%" height="100%" fill="url(#hearthGlow)" />

      <!-- Pinecones & Winter Berries Accent -->
      <circle cx="100" cy="80" r="38" fill="#fed7aa" opacity="0.25" filter="blur(10px)" />
      <circle cx="100" cy="80" r="16" fill="#fef08a" opacity="0.8" />
      <circle cx="1100" cy="80" r="38" fill="#fed7aa" opacity="0.25" filter="blur(10px)" />
      <circle cx="1100" cy="80" r="16" fill="#fef08a" opacity="0.8" />

      <!-- Cedar Sprigs & Red Cranberries -->
      <g stroke="#12381f" stroke-width="3.5" stroke-linecap="round" fill="none">
        <path d="M 50,60 Q 150,90 250,65" />
        <path d="M 1150,60 Q 1050,90 950,65" />
      </g>
      <circle cx="95" cy="62" r="7" fill="#dc2626" />
      <circle cx="106" cy="67" r="6" fill="#991b1b" />
      <circle cx="1105" cy="62" r="7" fill="#dc2626" />
      <circle cx="1094" cy="67" r="6" fill="#991b1b" />
    </svg>
  `);
}

// Function to composite a dish inside an aluminum foil tray
async function assembleTrayDish(dishFile, trayW, trayH, foodScale = 0.90) {
  const traySvg = createAluminumTraySvg(trayW, trayH);
  const trayBase = await sharp(traySvg).png().toBuffer();

  const foodInnerW = Math.round((trayW - 40) * foodScale);
  const foodInnerH = Math.round((trayH - 40) * foodScale);

  const dishPath = path.join(DISHES_DIR, dishFile);
  
  // Crop & fit food image tightly with rounded corners so it nests inside aluminum cavity
  const foodMaskSvg = Buffer.from(`
    <svg width="${foodInnerW}" height="${foodInnerH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${foodInnerW}" height="${foodInnerH}" rx="8" ry="8" fill="#ffffff" />
    </svg>
  `);

  const resizedFood = await sharp(dishPath)
    .resize(foodInnerW, foodInnerH, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 1.05, saturation: 1.12 })
    .composite([{ input: foodMaskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const foodLeft = Math.round((trayW - foodInnerW) / 2);
  const foodTop = Math.round((trayH - foodInnerH) / 2);

  // Overlay food inside tray
  const assembled = await sharp(trayBase)
    .composite([
      { input: resizedFood, left: foodLeft, top: foodTop }
    ])
    .png()
    .toBuffer();

  return assembled;
}

// Function to composite a round deli container dish
async function assembleTubDish(dishFile, size) {
  const tubSvg = createDeliTubSvg(size);
  const tubBase = await sharp(tubSvg).png().toBuffer();

  const foodD = size - 36;
  const foodMaskSvg = Buffer.from(`
    <svg width="${foodD}" height="${foodD}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${foodD/2}" cy="${foodD/2}" r="${foodD/2}" fill="#ffffff" />
    </svg>
  `);

  const dishPath = path.join(DISHES_DIR, dishFile);
  const resizedFood = await sharp(dishPath)
    .resize(foodD, foodD, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 1.05, saturation: 1.15 })
    .composite([{ input: foodMaskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const offset = 18;
  const assembled = await sharp(tubBase)
    .composite([{ input: resizedFood, left: offset, top: offset }])
    .png()
    .toBuffer();

  return assembled;
}

// Save helper: writes to all target filenames and public folders
async function saveToAllTargets(buffer, baseNameKebab, baseNameTitle) {
  const pngBuffer = await sharp(buffer).png({ compressionLevel: 8 }).toBuffer();
  const jpgBuffer = await sharp(buffer).jpeg({ quality: 94 }).toBuffer();

  const targets = [
    path.join(OUT_DIR, `${baseNameTitle}.png`),
    path.join(OUT_DIR, `${baseNameKebab}.png`),
    path.join(OUT_DIR, `${baseNameKebab}.jpg`),
    path.join('/app/applet/public', `${baseNameTitle}.png`),
    path.join('/app/applet/public', `${baseNameKebab}.png`),
    path.join('/app/applet/dist/assets', `${baseNameTitle}.png`),
    path.join('/app/applet/dist/assets', `${baseNameKebab}.png`),
    path.join('/app/applet/dist', `${baseNameTitle}.png`),
    path.join('/app/applet/dist', `${baseNameKebab}.png`)
  ];

  // Specific old filenames
  if (baseNameKebab === 'holiday-party-favorites') {
    targets.push(path.join(OUT_DIR, 'feast-holiday-party-favorites.jpg'));
    targets.push(path.join('/app/applet/dist/assets', 'feast-holiday-party-favorites.jpg'));
  } else if (baseNameKebab === 'asian-holiday-table') {
    targets.push(path.join(OUT_DIR, 'feast-asian-holiday.jpg'));
    targets.push(path.join(OUT_DIR, 'feast-asian-holiday-table.jpg'));
    targets.push(path.join('/app/applet/dist/assets', 'feast-asian-holiday.jpg'));
    targets.push(path.join('/app/applet/dist/assets', 'feast-asian-holiday-table.jpg'));
  } else if (baseNameKebab === 'classic-christmas-comfort') {
    targets.push(path.join(OUT_DIR, 'feast-classic-christmas-comfort.jpg'));
    targets.push(path.join('/app/applet/dist/assets', 'feast-classic-christmas-comfort.jpg'));
  }

  for (const t of targets) {
    try {
      const dir = path.dirname(t);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      if (t.endsWith('.jpg') || t.endsWith('.jpeg')) {
        await sharp(jpgBuffer).toFile(t);
      } else {
        await sharp(pngBuffer).toFile(t);
      }
      console.log('Saved:', t);
    } catch (e) {
      console.warn('Could not write:', t, e.message);
    }
  }
}

async function main() {
  console.log('Generating high-fidelity realistic catering feast spreads...');

  const trayW = 480;
  const trayH = 340;

  // 1. Holiday Party Favorites
  // Items: Baked Spaghetti with Meatballs, Flavored Chicken Wings, Pork BBQ Skewers, Zesty Lemon Loaf
  console.log('1. Building Holiday Party Favorites...');
  const bgHoliday = await sharp(getHolidayPartyBackground()).png().toBuffer();

  const hTray1 = await assembleTrayDish('baked-spaghetti-meatballs.webp', trayW, trayH, 0.95);
  const hTray2 = await assembleTrayDish('flavored-chicken-wings.webp', trayW, trayH, 0.95);
  const hTray3 = await assembleTrayDish('nyo-bbq-1.png', trayW, trayH, 0.95);
  const hTray4 = await assembleTrayDish('zesty-lemon-loaf.webp', trayW, trayH, 0.92);

  const holidayComposites = [
    { input: hTray1, left: 100, top: 90 },
    { input: hTray2, left: 620, top: 90 },
    { input: hTray3, left: 100, top: 470 },
    { input: hTray4, left: 620, top: 470 }
  ];

  const holidayFinal = await sharp(bgHoliday)
    .composite(holidayComposites)
    .png()
    .toBuffer();

  await saveToAllTargets(holidayFinal, 'holiday-party-favorites', 'Holiday Party Favorites');

  // 2. Asian Holiday Table
  // Items: Golden Garlic Sotanghon, Chinese-Style Braised Pork Belly, Chicken Wings Asian Style, Korean Cucumber Salad
  console.log('2. Building Asian Holiday Table...');
  const bgAsian = await sharp(getAsianHolidayBackground()).png().toBuffer();

  const aTray1 = await assembleTrayDish('golden-garlic-sotanghon.webp', trayW, trayH, 0.95);
  const aTray2 = await assembleTrayDish('chinese-braised-pork-belly.webp', trayW, trayH, 0.95);
  const aTray3 = await assembleTrayDish('flavored-chicken-wings.webp', trayW, trayH, 0.95);
  const aTub4  = await assembleTubDish('cucumber-salad-1.png', 340);

  const asianComposites = [
    { input: aTray1, left: 100, top: 90 },
    { input: aTray2, left: 620, top: 90 },
    { input: aTray3, left: 100, top: 470 },
    { input: aTub4,  left: 690, top: 470 } // Centered in bottom right quadrant
  ];

  const asianFinal = await sharp(bgAsian)
    .composite(asianComposites)
    .png()
    .toBuffer();

  await saveToAllTargets(asianFinal, 'asian-holiday-table', 'Asian Holiday Table');

  // 3. Classic Christmas Comfort
  // Items: Ultimate Baked Macaroni, Homestyle Fried Chicken with Gravy, Shanghai Rolls, Banana Loaf Cake
  console.log('3. Building Classic Christmas Comfort...');
  const bgClassic = await sharp(getClassicComfortBackground()).png().toBuffer();

  const cTray1 = await assembleTrayDish('baked-macaroni-1.png', trayW, trayH, 0.96);
  const cTray2 = await assembleTrayDish('homestyle-fried-chicken-with-gravy-1.png', trayW, trayH, 0.96);
  const cTray3 = await assembleTrayDish('shanghai-1.png', trayW, trayH, 0.96);
  const cTray4 = await assembleTrayDish('banana-loaf-cake.webp', trayW, trayH, 0.92);

  const classicComposites = [
    { input: cTray1, left: 100, top: 90 },
    { input: cTray2, left: 620, top: 90 },
    { input: cTray3, left: 100, top: 470 },
    { input: cTray4, left: 620, top: 470 }
  ];

  const classicFinal = await sharp(bgClassic)
    .composite(classicComposites)
    .png()
    .toBuffer();

  await saveToAllTargets(classicFinal, 'classic-christmas-comfort', 'Classic Christmas Comfort');

  console.log('All 3 realistic catering tray spreads generated and updated across all paths!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
