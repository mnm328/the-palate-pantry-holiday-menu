const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const W = 1200;
const H = 900;
const DISHES_DIR = '/app/applet/public/assets/dishes';
const OUT_DIR = '/app/applet/public/assets';

function getChristmasTableSvg() {
  return `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="tableBg" cx="50%" cy="50%" r="72%">
        <stop offset="0%" stop-color="#244d34" />
        <stop offset="55%" stop-color="#183b26" />
        <stop offset="85%" stop-color="#0f2619" />
        <stop offset="100%" stop-color="#09180f" />
      </radialGradient>
      
      <!-- Warm central candlelight glow -->
      <radialGradient id="candleGlowCenter" cx="50%" cy="45%" r="58%">
        <stop offset="0%" stop-color="#ffebaa" stop-opacity="0.25" />
        <stop offset="45%" stop-color="#e17055" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <!-- Corner candle glows -->
      <radialGradient id="glowL" cx="12%" cy="14%" r="28%">
        <stop offset="0%" stop-color="#ffeaa7" stop-opacity="0.38" />
        <stop offset="50%" stop-color="#e17055" stop-opacity="0.10" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="glowR" cx="88%" cy="14%" r="28%">
        <stop offset="0%" stop-color="#ffeaa7" stop-opacity="0.38" />
        <stop offset="50%" stop-color="#e17055" stop-opacity="0.10" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      
      <!-- Subtle woven tablecloth texture -->
      <pattern id="linen" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="none" />
        <path d="M0 0h8v1H0zM0 4h8v1H0zM0 0v8h1V0zM4 0v8h1V0z" fill="#ffffff" opacity="0.02" />
      </pattern>
    </defs>

    <!-- Christmas Green Tablecloth Base -->
    <rect width="100%" height="100%" fill="url(#tableBg)" />
    <rect width="100%" height="100%" fill="url(#linen)" />

    <!-- Center Table Runner with Gold Embroidered Edges -->
    <rect x="90" y="0" width="1020" height="900" fill="#14311f" opacity="0.75" />
    <line x1="90" y1="0" x2="90" y2="900" stroke="#d4af37" stroke-width="2" stroke-dasharray="10 6" opacity="0.6" />
    <line x1="1110" y1="0" x2="1110" y2="900" stroke="#d4af37" stroke-width="2" stroke-dasharray="10 6" opacity="0.6" />

    <!-- Warm Candlelight Ambient Glows -->
    <rect width="100%" height="100%" fill="url(#candleGlowCenter)" />
    <rect width="100%" height="100%" fill="url(#glowL)" />
    <rect width="100%" height="100%" fill="url(#glowR)" />

    <!-- Left Holiday Candle -->
    <g transform="translate(135, 95)">
      <ellipse cx="0" cy="15" rx="20" ry="8" fill="rgba(0,0,0,0.45)" />
      <rect x="-15" y="-15" width="30" height="26" rx="4" fill="#f5eedc" stroke="#c5a059" stroke-width="2" />
      <ellipse cx="0" cy="-15" rx="15" ry="5.5" fill="#e8dcbc" />
      <path d="M-1,-25 Q0,-31 0,-33 Q0,-31 1,-25 Z" fill="#222" />
      <ellipse cx="0" cy="-33" rx="6" ry="12" fill="#ff9f43" opacity="0.85" />
      <ellipse cx="0" cy="-31" rx="3" ry="6" fill="#ffffff" opacity="0.9" />
    </g>

    <!-- Right Holiday Candle -->
    <g transform="translate(1065, 95)">
      <ellipse cx="0" cy="15" rx="20" ry="8" fill="rgba(0,0,0,0.45)" />
      <rect x="-15" y="-15" width="30" height="26" rx="4" fill="#f5eedc" stroke="#c5a059" stroke-width="2" />
      <ellipse cx="0" cy="-15" rx="15" ry="5.5" fill="#e8dcbc" />
      <path d="M-1,-25 Q0,-31 0,-33 Q0,-31 1,-25 Z" fill="#222" />
      <ellipse cx="0" cy="-33" rx="6" ry="12" fill="#ff9f43" opacity="0.85" />
      <ellipse cx="0" cy="-31" rx="3" ry="6" fill="#ffffff" opacity="0.9" />
    </g>

    <!-- Pine Needles and Holly Garlands at Edges -->
    <g opacity="0.85">
      <path d="M 30,35 Q 160,75 270,45" stroke="#0f2e1b" stroke-width="4" fill="none" />
      <path d="M 930,45 Q 1040,75 1170,35" stroke="#0f2e1b" stroke-width="4" fill="none" />
      <path d="M 70,40 L 95,20 M 90,45 L 115,30 M 120,52 L 145,35 M 155,56 L 185,42 M 195,58 L 225,46" stroke="#2d6a4f" stroke-width="3" stroke-linecap="round" />
      <path d="M 1130,40 L 1105,20 M 1110,45 L 1085,30 M 1080,52 L 1055,35 M 1045,56 L 1015,42 M 1005,58 L 975,46" stroke="#2d6a4f" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- Red Holly Berries -->
    <g>
      <circle cx="125" cy="65" r="7.5" fill="#b71540" />
      <circle cx="137" cy="72" r="6.5" fill="#e55039" />
      <circle cx="123" cy="77" r="7" fill="#83112b" />
      <circle cx="134" cy="69" r="2.2" fill="#fff" opacity="0.65" />

      <circle cx="1075" cy="65" r="7.5" fill="#b71540" />
      <circle cx="1063" cy="72" r="6.5" fill="#e55039" />
      <circle cx="1077" cy="77" r="7" fill="#83112b" />
      <circle cx="1066" cy="69" r="2.2" fill="#fff" opacity="0.65" />

      <!-- Bottom Berries -->
      <circle cx="50" cy="850" r="8" fill="#b71540" />
      <circle cx="64" cy="858" r="7" fill="#e55039" />
      <circle cx="1150" cy="850" r="8" fill="#b71540" />
      <circle cx="1136" cy="858" r="7" fill="#e55039" />
    </g>

    <!-- Subtle fairy light bokeh -->
    <g opacity="0.6">
      <circle cx="360" cy="55" r="10" fill="#ffeaa7" filter="blur(4px)" />
      <circle cx="840" cy="55" r="10" fill="#ffeaa7" filter="blur(4px)" />
      <circle cx="600" cy="40" r="12" fill="#ffd32a" filter="blur(5px)" />
      <circle cx="100" cy="500" r="9" fill="#ffeaa7" filter="blur(4px)" />
      <circle cx="1100" cy="500" r="9" fill="#ffeaa7" filter="blur(4px)" />
    </g>
  </svg>
  `;
}

function makeShadow(w, h, rx, ry) {
  const sw = w + 80;
  const sh = Math.floor(h * 0.48) + 60;
  const svg = `
    <svg width="${sw}" height="${sh}" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="${sw/2}" cy="${sh/2}" rx="${rx}" ry="${ry}" fill="rgba(0,0,0,0.60)" filter="url(#f)" />
      <defs>
        <filter id="f"><feGaussianBlur stdDeviation="18" /></filter>
      </defs>
    </svg>
  `;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function prepareDish(filename, targetW, targetH) {
  const filePath = path.join(DISHES_DIR, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error('Dish file not found: ' + filePath);
  }
  const meta = await sharp(filePath).metadata();

  if (meta.hasAlpha) {
    // Isolated PNG platter dish
    const buf = await sharp(filePath)
      .resize(targetW, targetH, { fit: 'inside' })
      .png()
      .toBuffer();
    const bMeta = await sharp(buf).metadata();
    return {
      buffer: buf,
      width: bMeta.width,
      height: bMeta.height,
      shadow: await makeShadow(bMeta.width, bMeta.height, bMeta.width * 0.42, bMeta.height * 0.17)
    };
  } else {
    // WebP image: Plate on an elegant fine-porcelain serving platter
    const dishW = targetW;
    const dishH = targetH ? targetH : Math.floor(targetW * 0.70);

    const cropped = await sharp(filePath)
      .resize(dishW, dishH, { fit: 'cover' })
      .toBuffer();

    const platterMask = Buffer.from(`
      <svg width="${dishW}" height="${dishH}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${dishW}" height="${dishH}" rx="22" ry="22" fill="#ffffff" />
      </svg>
    `);
    const masked = await sharp(cropped)
      .composite([{ input: platterMask, blend: 'dest-in' }])
      .png()
      .toBuffer();

    const rimW = dishW + 16;
    const rimH = dishH + 16;
    const rimSvg = Buffer.from(`
      <svg width="${rimW}" height="${rimH}" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="${rimW - 6}" height="${rimH - 6}" rx="26" ry="26" fill="#faf7f2" stroke="#d4af37" stroke-width="3" />
      </svg>
    `);
    const plated = await sharp(rimSvg)
      .composite([{ input: masked, left: 8, top: 8 }])
      .png()
      .toBuffer();

    return {
      buffer: plated,
      width: rimW,
      height: rimH,
      shadow: await makeShadow(rimW, rimH, rimW * 0.44, rimH * 0.18)
    };
  }
}

// Feast Configurations
const feasts = [
  {
    output: 'feast-classic-christmas-comfort.jpg',
    dishes: [
      { file: 'baked-macaroni-1.png', w: 490 },
      { file: 'homestyle-fried-chicken-with-gravy-1.png', w: 490 },
      { file: 'shanghai-1.png', w: 470 },
      { file: 'banana-loaf-cake.webp', w: 410, h: 290 }
    ],
    layout: 'grid4'
  },
  {
    output: 'feast-holiday-party-favorites.jpg',
    dishes: [
      { file: 'baked-spaghetti-meatballs.webp', w: 440, h: 310 },
      { file: 'flavored-chicken-wings.webp', w: 440, h: 310 },
      { file: 'nyo-bbq-1.png', w: 480 },
      { file: 'zesty-lemon-loaf.webp', w: 410, h: 290 }
    ],
    layout: 'grid4'
  },
  {
    output: 'feast-asian-holiday.jpg',
    dishes: [
      { file: 'golden-garlic-sotanghon.webp', w: 440, h: 310 },
      { file: 'chinese-braised-pork-belly.webp', w: 440, h: 310 },
      { file: 'flavored-chicken-wings.webp', w: 440, h: 310 },
      { file: 'cucumber-salad-1.png', w: 470 }
    ],
    layout: 'grid4'
  },
  {
    output: 'feast-western-holiday-comfort.jpg',
    dishes: [
      { file: 'creamy-truffle-bacon-pasta-2-1.png', w: 460 },
      { file: 'salisbury-steak.webp', w: 420, h: 290 },
      { file: 'chicken-cordon-bleu.webp', w: 370, h: 260 },
      { file: 'nacho-salad.webp', w: 370, h: 260 },
      { file: 'zesty-lemon-loaf.webp', w: 370, h: 260 }
    ],
    layout: 'layout5'
  },
  {
    output: 'feast-chinese-style.jpg',
    dishes: [
      { file: 'savory-charlie-chan.webp', w: 430, h: 300 },
      { file: 'chinese-braised-pork-belly.webp', w: 430, h: 300 },
      { file: 'flavored-chicken-wings.webp', w: 370, h: 260 },
      { file: 'golden-garlic-sotanghon.webp', w: 370, h: 260 },
      { file: 'shanghai-1.png', w: 410 }
    ],
    layout: 'layout5'
  },
  {
    output: 'feast-coastal-holiday-feast.jpg',
    dishes: [
      { file: 'creamy-truffle-bacon-pasta-2-1.png', w: 450 },
      { file: 'cheesy-baked-bangus-1.png', w: 450 },
      { file: 'buttered-garlic-shrimp.webp', w: 370, h: 260 },
      { file: 'lemon-fish-fillet.webp', w: 370, h: 260 },
      { file: 'banana-loaf-cake.webp', w: 370, h: 260 }
    ],
    layout: 'layout5'
  },
  {
    output: 'feast-filipino-christmas.jpg',
    dishes: [
      { file: 'lasagna-1.png', w: 460 },
      { file: 'beef-kare-kare-1.png', w: 460 },
      { file: 'flavored-chicken-wings.webp', w: 370, h: 260 },
      { file: 'shanghai-1.png', w: 410 },
      { file: 'banana-loaf-cake.webp', w: 370, h: 260 }
    ],
    layout: 'layout5'
  },
  {
    output: 'feast-holiday-indulgence.jpg',
    dishes: [
      { file: 'creamy-truffle-bacon-pasta-2-1.png', w: 460 },
      { file: 'beef-mushroom.webp', w: 420, h: 290 },
      { file: 'chicken-alexander.webp', w: 370, h: 260 },
      { file: 'taconitos-1.png', w: 410 },
      { file: 'zesty-lemon-loaf.webp', w: 370, h: 260 }
    ],
    layout: 'layout5'
  },
  {
    output: 'feast-korean-holiday.jpg',
    dishes: [
      { file: 'korean-japchae.webp', w: 430, h: 300 },
      { file: 'oriental-braised-beef.webp', w: 430, h: 300 },
      { file: 'flavored-chicken-wings.webp', w: 370, h: 260 },
      { file: 'baked-sushi.webp', w: 370, h: 260 },
      { file: 'cucumber-salad-1.png', w: 410 }
    ],
    layout: 'layout5'
  },
  {
    output: 'feast-the-palate-pantry-signature.jpg',
    dishes: [
      { file: 'lasagna-1.png', w: 430 },
      { file: 'beef-kare-kare-1.png', w: 430 },
      { file: 'flavored-chicken-wings.webp', w: 360, h: 250 },
      { file: 'buttered-garlic-shrimp.webp', w: 360, h: 250 },
      { file: 'shanghai-1.png', w: 390 },
      { file: 'banana-loaf-cake.webp', w: 360, h: 250 }
    ],
    layout: 'layout6'
  },
  {
    output: 'feast-grand-seafood.jpg',
    dishes: [
      { file: 'seafood-boil-1.png', w: 440 },
      { file: 'cheesy-baked-bangus-1.png', w: 440 },
      { file: 'creamy-truffle-bacon-pasta-2-1.png', w: 380 },
      { file: 'shrimp-salvatorre-1.png', w: 380 },
      { file: 'baked-sushi.webp', w: 360, h: 250 }
    ],
    layout: 'layout5'
  },
  {
    output: 'feast-ultimate-holiday-table.jpg',
    dishes: [
      { file: 'alfredonara-1.png', w: 430 },
      { file: 'nyo-bbq-1.png', w: 430 },
      { file: 'beef-mushroom.webp', w: 360, h: 250 },
      { file: 'chicken-cordon-bleu.webp', w: 360, h: 250 },
      { file: 'buttered-garlic-shrimp.webp', w: 360, h: 250 },
      { file: 'zesty-lemon-loaf.webp', w: 360, h: 250 }
    ],
    layout: 'layout6'
  }
];

async function generateAll() {
  const bgSvg = getChristmasTableSvg();
  const bgBaseBuffer = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  for (const f of feasts) {
    console.log('Generating:', f.output);
    const preparedDishes = [];
    for (const d of f.dishes) {
      preparedDishes.push(await prepareDish(d.file, d.w, d.h));
    }

    const comps = [];

    if (f.layout === 'grid4') {
      // 4 Dishes Layout: 2 top, 2 bottom
      const coords = [
        { x: 120, y: 110 },
        { x: 600, y: 110 },
        { x: 120, y: 490 },
        { x: 610, y: 500 }
      ];

      for (let i = 0; i < 4; i++) {
        const dish = preparedDishes[i];
        const c = coords[i];
        // Shadow
        comps.push({
          input: dish.shadow,
          left: Math.max(0, c.x - 40),
          top: Math.max(0, c.y + dish.height - 95)
        });
      }
      for (let i = 0; i < 4; i++) {
        const dish = preparedDishes[i];
        const c = coords[i];
        // Platter / Food
        comps.push({
          input: dish.buffer,
          left: c.x,
          top: c.y
        });
      }
    } else if (f.layout === 'layout5') {
      // 5 Dishes Layout: 2 top large, 3 bottom smaller
      const coords = [
        { x: 140, y: 110 },
        { x: 600, y: 110 },
        { x: 70,  y: 500 },
        { x: 440, y: 500 },
        { x: 800, y: 500 }
      ];

      for (let i = 0; i < 5; i++) {
        const dish = preparedDishes[i];
        const c = coords[i];
        comps.push({
          input: dish.shadow,
          left: Math.max(0, c.x - 40),
          top: Math.max(0, c.y + dish.height - 85)
        });
      }
      for (let i = 0; i < 5; i++) {
        const dish = preparedDishes[i];
        const c = coords[i];
        comps.push({
          input: dish.buffer,
          left: c.x,
          top: c.y
        });
      }
    } else if (f.layout === 'layout6') {
      // 6 Dishes Layout: 2 top, 2 middle, 2 bottom (or 3 top, 3 bottom)
      const coords = [
        { x: 140, y: 95 },
        { x: 620, y: 95 },
        { x: 70,  y: 370 },
        { x: 450, y: 370 },
        { x: 810, y: 370 },
        { x: 440, y: 620 }
      ];

      for (let i = 0; i < 6; i++) {
        const dish = preparedDishes[i];
        const c = coords[i];
        comps.push({
          input: dish.shadow,
          left: Math.max(0, c.x - 40),
          top: Math.max(0, c.y + dish.height - 80)
        });
      }
      for (let i = 0; i < 6; i++) {
        const dish = preparedDishes[i];
        const c = coords[i];
        comps.push({
          input: dish.buffer,
          left: c.x,
          top: c.y
        });
      }
    }

    const outPath = path.join(OUT_DIR, f.output);
    await sharp(bgBaseBuffer)
      .composite(comps)
      .jpeg({ quality: 92 })
      .toFile(outPath);
    console.log('Saved:', outPath);
  }
}

generateAll().catch(console.error);
