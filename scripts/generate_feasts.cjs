const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DISH_DIR = '/tmp/dish_images';
const OUT_DIR = '/app/applet/public/assets';

// Table dimensions (4:3 ratio)
const W = 1200;
const H = 900;

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// 1. Rich Christmas Festive Dining Table SVG
function generateChristmasTableSvg(width, height, feastTitle, categoryTitle) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep Forest Green Christmas Tablecloth with Radial Ambient Light -->
      <radialGradient id="tableclothGlow" cx="50%" cy="50%" r="72%">
        <stop offset="0%" stop-color="#1e4e37" />
        <stop offset="35%" stop-color="#16402d" />
        <stop offset="70%" stop-color="#0e2e1f" />
        <stop offset="100%" stop-color="#061910" />
      </radialGradient>

      <!-- Linen / Damask Fabric Weave Texture -->
      <pattern id="damask" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="#255a40" stroke-width="1.2" opacity="0.22" />
        <circle cx="20" cy="20" r="2.5" fill="#296245" opacity="0.3" />
        <circle cx="0" cy="0" r="1.5" fill="#296245" opacity="0.2" />
        <circle cx="40" cy="0" r="1.5" fill="#296245" opacity="0.2" />
        <circle cx="0" cy="40" r="1.5" fill="#296245" opacity="0.2" />
        <circle cx="40" cy="40" r="1.5" fill="#296245" opacity="0.2" />
      </pattern>

      <!-- Festive Cranberry Table Runner with Gold Embroidered Borders -->
      <linearGradient id="runnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#6e1318" stop-opacity="0.85" />
        <stop offset="20%" stop-color="#991f27" stop-opacity="0.9" />
        <stop offset="50%" stop-color="#7a161d" stop-opacity="0.85" />
        <stop offset="80%" stop-color="#991f27" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#6e1318" stop-opacity="0.85" />
      </linearGradient>

      <!-- Candle Light Warm Amber Glow Filter -->
      <filter id="candleGlow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="30" result="blur" />
      </filter>

      <!-- 3D Gold Ornament Gradient -->
      <radialGradient id="goldBauble" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#fff5cc" />
        <stop offset="25%" stop-color="#ffd24d" />
        <stop offset="65%" stop-color="#cc9900" />
        <stop offset="100%" stop-color="#4d3900" />
      </radialGradient>

      <!-- 3D Red Holiday Bauble Gradient -->
      <radialGradient id="redBauble" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#ff9999" />
        <stop offset="25%" stop-color="#d92632" />
        <stop offset="70%" stop-color="#800f17" />
        <stop offset="100%" stop-color="#3d0307" />
      </radialGradient>

      <!-- Pine branch cluster with holly berries -->
      <g id="pineBranch">
        <path d="M0,0 Q30,-20 70,-10 M20,-8 Q35,-25 50,-18 M40,-5 Q55,-22 75,-14 M15,-4 Q28,-18 42,-12 M30,-2 Q45,-15 62,-8" 
              stroke="#266343" stroke-width="3.2" stroke-linecap="round" fill="none" />
        <path d="M0,0 Q30,20 70,10 M20,8 Q35,25 50,18 M40,5 Q55,22 75,14 M15,4 Q28,18 42,12 M30,2 Q45,15 62,8" 
              stroke="#1b4931" stroke-width="2.6" stroke-linecap="round" fill="none" />
        <path d="M0,0 Q40,-5 90,0" stroke="#4a2e18" stroke-width="3.5" stroke-linecap="round" fill="none" />
        <!-- Holly Berries with shiny highlights -->
        <circle cx="25" cy="-2" r="6" fill="#d92632" />
        <circle cx="26" cy="-4" r="1.8" fill="#ffffff" opacity="0.85" />
        <circle cx="33" cy="5" r="5.2" fill="#b01b25" />
        <circle cx="34" cy="3" r="1.5" fill="#ffffff" opacity="0.85" />
        <circle cx="39" cy="-4" r="5" fill="#e63946" />
        <circle cx="40" cy="-6" r="1.4" fill="#ffffff" opacity="0.85" />
      </g>

      <!-- Pinecone Graphic -->
      <g id="pineCone">
        <ellipse cx="0" cy="0" rx="9" ry="14" fill="#4d2c14" />
        <path d="M-7,-6 Q0,-10 7,-6 M-8,-1 Q0,-5 8,-1 M-8,4 Q0,0 8,4 M-6,9 Q0,5 6,9" 
              stroke="#8c582e" stroke-width="2" fill="none" />
        <circle cx="0" cy="-14" r="1.5" fill="#fff" opacity="0.5" />
      </g>

      <!-- Glowing Christmas Candle -->
      <g id="christmasCandle">
        <!-- Radial Warm Amber Glow -->
        <circle cx="0" cy="0" r="75" fill="#ffb703" opacity="0.22" filter="url(#candleGlow)" />
        <circle cx="0" cy="0" r="40" fill="#ffd166" opacity="0.35" filter="url(#candleGlow)" />
        <!-- Ceramic / Glass Holder -->
        <rect x="-14" y="0" width="28" height="40" rx="5" fill="#fcf9f2" stroke="#d5c8b5" stroke-width="1" />
        <!-- Candle Wax Rim -->
        <ellipse cx="0" cy="0" rx="14" ry="4.5" fill="#f5ede0" stroke="#c4b59d" stroke-width="0.8" />
        <!-- Flame -->
        <path d="M0,-8 C-5,-14 -4,-22 0,-28 C4,-22 5,-14 0,-8 Z" fill="#ff9e00" />
        <path d="M0,-9 C-3,-14 -2,-20 0,-24 C2,-20 3,-14 0,-9 Z" fill="#ffd166" />
        <ellipse cx="0" cy="-12" rx="1.5" ry="3" fill="#ffffff" />
      </g>
    </defs>

    <!-- 1. Tablecloth Base -->
    <rect width="${width}" height="${height}" fill="url(#tableclothGlow)" />
    <!-- Damask Texture -->
    <rect width="${width}" height="${height}" fill="url(#damask)" />

    <!-- 2. Central Holiday Table Runner -->
    <rect x="0" y="${height * 0.44}" width="${width}" height="${height * 0.12}" 
          fill="url(#runnerGrad)" opacity="0.65" />
    <line x1="0" y1="${height * 0.44}" x2="${width}" y2="${height * 0.44}" 
          stroke="#dda74f" stroke-width="2.5" stroke-dasharray="14 7" opacity="0.8" />
    <line x1="0" y1="${height * 0.56}" x2="${width}" y2="${height * 0.56}" 
          stroke="#dda74f" stroke-width="2.5" stroke-dasharray="14 7" opacity="0.8" />

    <!-- 3. Festive Table Perimeter Trim -->
    <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="20" ry="20"
          fill="none" stroke="#dda74f" stroke-width="1.5" stroke-dasharray="10 5" opacity="0.45" />

    <!-- 4. Corner Holiday Garlands & Baubles -->
    <!-- Top Left -->
    <g transform="translate(60, 50) scale(1.65)">
      <use href="#pineBranch" transform="rotate(32)" />
      <use href="#pineBranch" transform="rotate(72) scale(0.85)" />
      <use href="#pineCone" transform="translate(30, 20) rotate(15)" />
      <circle cx="55" cy="35" r="15" fill="url(#goldBauble)" />
      <circle cx="50" cy="30" r="3.5" fill="#ffffff" opacity="0.8" />
    </g>

    <!-- Top Right -->
    <g transform="translate(${width - 60}, 50) scale(1.65)">
      <use href="#pineBranch" transform="scale(-1, 1) rotate(32)" />
      <use href="#pineBranch" transform="scale(-1, 1) rotate(72) scale(0.85)" />
      <use href="#pineCone" transform="translate(-30, 20) rotate(-15)" />
      <circle cx="-55" cy="35" r="15" fill="url(#redBauble)" />
      <circle cx="-59" cy="30" r="3.5" fill="#ffffff" opacity="0.8" />
    </g>

    <!-- Bottom Left -->
    <g transform="translate(60, ${height - 50}) scale(1.65)">
      <use href="#pineBranch" transform="scale(1, -1) rotate(32)" />
      <use href="#pineBranch" transform="scale(1, -1) rotate(72) scale(0.85)" />
      <use href="#pineCone" transform="translate(30, -20) rotate(-15)" />
      <circle cx="55" cy="-35" r="15" fill="url(#redBauble)" />
      <circle cx="50" cy="-40" r="3.5" fill="#ffffff" opacity="0.8" />
    </g>

    <!-- Bottom Right -->
    <g transform="translate(${width - 60}, ${height - 50}) scale(1.65)">
      <use href="#pineBranch" transform="scale(-1, -1) rotate(32)" />
      <use href="#pineBranch" transform="scale(-1, -1) rotate(72) scale(0.85)" />
      <use href="#pineCone" transform="translate(-30, -20) rotate(15)" />
      <circle cx="-55" cy="-35" r="15" fill="url(#goldBauble)" />
      <circle cx="-59" cy="-40" r="3.5" fill="#ffffff" opacity="0.8" />
    </g>

    <!-- 5. Table Centerpiece Christmas Candles -->
    <use href="#christmasCandle" transform="translate(85, ${height / 2}) scale(1.15)" />
    <use href="#christmasCandle" transform="translate(${width - 85}, ${height / 2}) scale(1.15)" />
    <use href="#christmasCandle" transform="translate(${width / 2}, 60) scale(0.9)" />
    <use href="#christmasCandle" transform="translate(${width / 2}, ${height - 60}) scale(0.9)" />

    <!-- 6. Scattered Golden Holiday Stars & Sparkles -->
    <g fill="#ffd166" opacity="0.75">
      <path d="M220,95 L222,101 L228,103 L222,105 L220,111 L218,105 L212,103 L218,101 Z" />
      <path d="M980,95 L982,101 L988,103 L982,105 L980,111 L978,105 L972,103 L978,101 Z" />
      <path d="M220,805 L222,811 L228,813 L222,815 L220,821 L218,815 L212,813 L218,811 Z" />
      <path d="M980,805 L982,811 L988,813 L982,815 L980,821 L978,815 L972,813 L978,811 Z" />
    </g>

    <!-- 7. Refined Holiday Feast Plaque Header -->
    <g transform="translate(${width / 2}, 34)">
      <rect x="-240" y="-18" width="480" height="36" rx="18" ry="18" 
            fill="#0b2417" fill-opacity="0.94" stroke="#dda74f" stroke-width="1.5" />
      <circle cx="-218" cy="0" r="3.5" fill="#dda74f" />
      <circle cx="218" cy="0" r="3.5" fill="#dda74f" />
      <text x="0" y="-2" font-family="'Fraunces', 'Georgia', serif" font-size="14.5" font-weight="900"
            fill="#ffffff" text-anchor="middle" dominant-baseline="central" letter-spacing="0.6px">
        ${escapeXml(feastTitle.toUpperCase())}
      </text>
      <text x="0" y="10" font-family="'Bricolage Grotesque', sans-serif" font-size="9" font-weight="700"
            fill="#dda74f" text-anchor="middle" dominant-baseline="central" letter-spacing="1.2px">
        ${escapeXml(categoryTitle.toUpperCase())} · FOR 10–12 PAX
      </text>
    </g>
  </svg>
  `;
}

// 2. Authentic Fine Porcelain Serving Dish with Gold Filigree and Realistic Depth
async function createPorcelainServingDish(foodPath, dishTitle, width, height, shape = 'oval') {
  // Shape-specific rim measurements
  const rimPadding = shape === 'oval' ? 24 : 20;
  const foodW = width - (rimPadding * 2);
  const foodH = height - (rimPadding * 2);

  const resizedFood = await sharp(foodPath)
    .resize(foodW, foodH, { fit: 'cover', position: 'center' })
    .png()
    .toBuffer();

  let maskSvg = '';
  let platterSvg = '';

  if (shape === 'oval') {
    maskSvg = `
      <svg width="${foodW}" height="${foodH}" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="${foodW / 2}" cy="${foodH / 2}" rx="${foodW / 2}" ry="${foodH / 2}" fill="#ffffff" />
      </svg>
    `;

    platterSvg = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Deep Tablecloth Shadow under Porcelain Platter -->
          <filter id="platterShadow" x="-25%" y="-25%" width="150%" height="160%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#020d06" flood-opacity="0.95" />
            <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.6" />
          </filter>

          <!-- Fine Ivory Bone China Gradient -->
          <radialGradient id="porcelainGrad" cx="50%" cy="38%" r="62%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="45%" stop-color="#faf7f0" />
            <stop offset="85%" stop-color="#ede3d1" />
            <stop offset="100%" stop-color="#dfd2be" />
          </radialGradient>

          <!-- 24K Gold Trim Gradient -->
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d4af37" />
            <stop offset="25%" stop-color="#fff099" />
            <stop offset="50%" stop-color="#d4af37" />
            <stop offset="75%" stop-color="#a67c00" />
            <stop offset="100%" stop-color="#d4af37" />
          </linearGradient>
        </defs>

        <!-- Platter Plated Base with Deep Shadow -->
        <ellipse cx="${width / 2}" cy="${height / 2}" rx="${(width - 14) / 2}" ry="${(height - 14) / 2}"
                 fill="url(#porcelainGrad)" filter="url(#platterShadow)" />

        <!-- Outer 24k Gold Rim Filigree -->
        <ellipse cx="${width / 2}" cy="${height / 2}" rx="${(width - 16) / 2}" ry="${(height - 16) / 2}"
                 fill="none" stroke="url(#goldRim)" stroke-width="3" />

        <!-- Raised Ceramic Lip Ring -->
        <ellipse cx="${width / 2}" cy="${height / 2}" rx="${(width - 34) / 2}" ry="${(height - 34) / 2}"
                 fill="none" stroke="#d5c7b0" stroke-width="1.2" opacity="0.8" />

        <!-- Inner Gold Accent Ring hugging the food -->
        <ellipse cx="${width / 2}" cy="${height / 2}" rx="${foodW / 2 + 1}" ry="${foodH / 2 + 1}"
                 fill="none" stroke="url(#goldRim)" stroke-width="2" />
      </svg>
    `;
  } else {
    // Rectangular / Casserole Porcelain Baker with Scalloped Gold Rim
    maskSvg = `
      <svg width="${foodW}" height="${foodH}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${foodW}" height="${foodH}" rx="24" ry="24" fill="#ffffff" />
      </svg>
    `;

    platterSvg = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="bakerShadow" x="-25%" y="-25%" width="150%" height="160%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#020d06" flood-opacity="0.95" />
            <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.6" />
          </filter>

          <linearGradient id="bakerPorcelain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="40%" stop-color="#fcf9f2" />
            <stop offset="85%" stop-color="#ede3d1" />
            <stop offset="100%" stop-color="#ded0bb" />
          </linearGradient>

          <linearGradient id="goldRimBaker" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d4af37" />
            <stop offset="25%" stop-color="#fff099" />
            <stop offset="50%" stop-color="#d4af37" />
            <stop offset="75%" stop-color="#a67c00" />
            <stop offset="100%" stop-color="#d4af37" />
          </linearGradient>
        </defs>

        <!-- Baker Base Body with Deep Shadow -->
        <rect x="8" y="8" width="${width - 16}" height="${height - 16}" rx="30" ry="30"
              fill="url(#bakerPorcelain)" filter="url(#bakerShadow)" />

        <!-- Outer 24k Gold Rim -->
        <rect x="9" y="9" width="${width - 18}" height="${height - 18}" rx="29" ry="29"
              fill="none" stroke="url(#goldRimBaker)" stroke-width="3" />

        <!-- Inner Gold Rim Accent -->
        <rect x="${rimPadding - 2}" y="${rimPadding - 2}" width="${foodW + 4}" height="${foodH + 4}" rx="25" ry="25"
              fill="none" stroke="url(#goldRimBaker)" stroke-width="2" />
      </svg>
    `;
  }

  // Refined Brass Menu Cartouche Tag below the serving dish
  const cartoucheW = Math.min(width - 50, 310);
  const cartoucheH = 28;
  const cartoucheSvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="tagShadow" x="-15%" y="-15%" width="130%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.75" />
        </filter>
        <linearGradient id="tagBg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0a2215" stop-opacity="0.96" />
          <stop offset="50%" stop-color="#16432b" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#0a2215" stop-opacity="0.96" />
        </linearGradient>
      </defs>

      <!-- Cartouche Plaque -->
      <g transform="translate(${(width - cartoucheW) / 2}, ${height - cartoucheH - 10})" filter="url(#tagShadow)">
        <rect x="0" y="0" width="${cartoucheW}" height="${cartoucheH}" rx="14" ry="14"
              fill="url(#tagBg)" stroke="#d4af37" stroke-width="1.3" />
        <circle cx="12" cy="${cartoucheH / 2}" r="2" fill="#d4af37" />
        <circle cx="${cartoucheW - 12}" cy="${cartoucheH / 2}" r="2" fill="#d4af37" />
        <text x="${cartoucheW / 2}" y="${cartoucheH / 2 + 1}"
              font-family="'Fraunces', 'Georgia', serif" font-size="12" font-weight="700"
              fill="#fffaf0" text-anchor="middle" dominant-baseline="central" letter-spacing="0.4px">
          ${escapeXml(dishTitle)}
        </text>
      </g>
    </svg>
  `;

  // Apply clipping mask to food
  const maskedFood = await sharp(resizedFood)
    .composite([{ input: Buffer.from(maskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  return sharp(Buffer.from(platterSvg))
    .composite([
      { input: maskedFood, top: rimPadding, left: rimPadding },
      { input: Buffer.from(cartoucheSvg), top: 0, left: 0 }
    ])
    .png()
    .toBuffer();
}

// 12 Curated Feasts Definition with Dishes and Serving Dish Shapes
const FEAST_SETS = [
  {
    key: 'classic-christmas-comfort',
    name: 'Classic Christmas Comfort',
    category: 'Christmas Table',
    dishes: [
      { name: 'Ultimate Baked Macaroni', file: 'baked-macaroni-1.png', shape: 'rect' },
      { name: 'Homestyle Fried Chicken', file: 'homestyle-fried-chicken-with-gravy-1.png', shape: 'oval' },
      { name: 'Shanghai Rolls · 48 pcs', file: 'shanghai-1.png', shape: 'rect' },
      { name: 'Banana Loaf Cake', file: 'banana-loaf-cake.webp', shape: 'oval' }
    ]
  },
  {
    key: 'holiday-party-favorites',
    name: 'Holiday Party Favorites',
    category: 'Christmas Table',
    dishes: [
      { name: 'Baked Spaghetti & Meatballs', file: 'baked-spaghetti-meatballs.webp', shape: 'rect' },
      { name: 'Flavored Chicken Wings', file: 'flavored-chicken-wings.webp', shape: 'oval' },
      { name: 'Pork BBQ · 30 Skewers', file: 'nyo-bbq-1.png', shape: 'rect' },
      { name: 'Zesty Lemon Loaf', file: 'zesty-lemon-loaf.webp', shape: 'oval' }
    ]
  },
  {
    key: 'asian-holiday-table',
    name: 'Asian Holiday Table',
    category: 'Christmas Table',
    dishes: [
      { name: 'Golden Garlic Sotanghon', file: 'golden-garlic-sotanghon.webp', shape: 'rect' },
      { name: 'Chinese Braised Pork Belly', file: 'chinese-braised-pork-belly.webp', shape: 'oval' },
      { name: 'Asian Style Chicken Wings', file: 'flavored-chicken-wings.webp', shape: 'oval' },
      { name: 'Korean Cucumber Salad', file: 'cucumber-salad-1.png', shape: 'rect' }
    ]
  },
  {
    key: 'western-holiday-comfort',
    name: 'Western Holiday Comfort',
    category: 'Holiday Feast',
    dishes: [
      { name: 'Creamy Truffle Bacon Pasta', file: 'creamy-truffle-bacon-pasta-2-1.png', shape: 'rect' },
      { name: 'Salisbury Steak Mushroom Gravy', file: 'salisbury-steak.webp', shape: 'oval' },
      { name: 'Chicken Cordon Bleu Mornay', file: 'chicken-cordon-bleu.webp', shape: 'oval' },
      { name: 'Sharing Nacho Salad', file: 'nacho-salad.webp', shape: 'rect' },
      { name: 'Zesty Lemon Loaf', file: 'zesty-lemon-loaf.webp', shape: 'oval' }
    ]
  },
  {
    key: 'chinese-style-holiday-feast',
    name: 'Chinese-Style Holiday Feast',
    category: 'Holiday Feast',
    dishes: [
      { name: 'Savory Charlie Chan', file: 'savory-charlie-chan.webp', shape: 'rect' },
      { name: 'Chinese Braised Pork Belly', file: 'chinese-braised-pork-belly.webp', shape: 'oval' },
      { name: 'Asian Style Chicken Wings', file: 'flavored-chicken-wings.webp', shape: 'oval' },
      { name: 'Golden Garlic Sotanghon', file: 'golden-garlic-sotanghon.webp', shape: 'rect' },
      { name: 'Shanghai Rolls · 48 pcs', file: 'shanghai-1.png', shape: 'rect' }
    ]
  },
  {
    key: 'coastal-holiday-feast',
    name: 'Coastal Holiday Feast',
    category: 'Holiday Feast',
    dishes: [
      { name: 'Creamy Truffle Bacon Pasta', file: 'creamy-truffle-bacon-pasta-2-1.png', shape: 'rect' },
      { name: 'Buttered Garlic Shrimp', file: 'buttered-garlic-shrimp.webp', shape: 'oval' },
      { name: 'Lemon Fish Fillet with Aioli', file: 'lemon-fish-fillet.webp', shape: 'oval' },
      { name: 'Cheesy Baked Bangus', file: 'cheesy-baked-bangus-1.png', shape: 'rect' },
      { name: 'Banana Loaf Cake', file: 'banana-loaf-cake.webp', shape: 'oval' }
    ]
  },
  {
    key: 'filipino-christmas',
    name: 'Filipino Christmas',
    category: 'Christmas Salu-Salo',
    dishes: [
      { name: 'Classic Mom’s Lasagna', file: 'lasagna-1.png', shape: 'rect' },
      { name: 'Kare-Kare with Binagoongan', file: 'beef-kare-kare-1.png', shape: 'oval' },
      { name: 'Flavored Chicken Wings', file: 'flavored-chicken-wings.webp', shape: 'oval' },
      { name: 'Shanghai Rolls · 48 pcs', file: 'shanghai-1.png', shape: 'rect' },
      { name: 'Banana Loaf Cake', file: 'banana-loaf-cake.webp', shape: 'oval' }
    ]
  },
  {
    key: 'holiday-indulgence',
    name: 'Holiday Indulgence',
    category: 'Christmas Salu-Salo',
    dishes: [
      { name: 'Creamy Truffle Bacon Pasta', file: 'creamy-truffle-bacon-pasta-2-1.png', shape: 'rect' },
      { name: 'Beef with Mushroom', file: 'beef-mushroom.webp', shape: 'oval' },
      { name: 'Chicken Alexander', file: 'chicken-alexander.webp', shape: 'oval' },
      { name: 'Taconitos · 12 pcs', file: 'taconitos-1.png', shape: 'rect' },
      { name: 'Zesty Lemon Loaf', file: 'zesty-lemon-loaf.webp', shape: 'oval' }
    ]
  },
  {
    key: 'korean-holiday-feast',
    name: 'Korean Holiday Feast',
    category: 'Christmas Salu-Salo',
    dishes: [
      { name: 'Korean Japchae', file: 'korean-japchae.webp', shape: 'rect' },
      { name: 'Oriental Braised Beef', file: 'oriental-braised-beef.webp', shape: 'oval' },
      { name: 'Asian Style Chicken Wings', file: 'flavored-chicken-wings.webp', shape: 'oval' },
      { name: 'Baked Sushi · Kani & Tuna', file: 'baked-sushi.webp', shape: 'rect' },
      { name: 'Korean Cucumber Salad', file: 'cucumber-salad-1.png', shape: 'rect' }
    ]
  },
  {
    key: 'the-palate-pantry-signature',
    name: 'The Palate Pantry Signature',
    category: 'Grand Christmas Feast',
    dishes: [
      { name: 'Classic Mom’s Lasagna', file: 'lasagna-1.png', shape: 'rect' },
      { name: 'Kare-Kare with Binagoongan', file: 'beef-kare-kare-1.png', shape: 'oval' },
      { name: 'Flavored Chicken Wings', file: 'flavored-chicken-wings.webp', shape: 'oval' },
      { name: 'Buttered Garlic Shrimp', file: 'buttered-garlic-shrimp.webp', shape: 'oval' },
      { name: 'Shanghai Rolls · 48 pcs', file: 'shanghai-1.png', shape: 'rect' },
      { name: 'Banana Loaf Cake', file: 'banana-loaf-cake.webp', shape: 'oval' }
    ]
  },
  {
    key: 'grand-seafood-christmas',
    name: 'Grand Seafood Christmas',
    category: 'Grand Christmas Feast',
    dishes: [
      { name: 'Creamy Truffle Bacon Pasta', file: 'creamy-truffle-bacon-pasta-2-1.png', shape: 'rect' },
      { name: 'Cajun Seafood Boil', file: 'seafood-boil-1.png', shape: 'oval' },
      { name: 'Shrimp Salvatorre', file: 'shrimp-salvatorre-1.png', shape: 'oval' },
      { name: 'Cheesy Baked Bangus', file: 'cheesy-baked-bangus-1.png', shape: 'rect' },
      { name: 'Baked Sushi · Kani & Tuna', file: 'baked-sushi.webp', shape: 'rect' }
    ]
  },
  {
    key: 'ultimate-holiday-table',
    name: 'Ultimate Holiday Table',
    category: 'Grand Christmas Feast',
    dishes: [
      { name: 'Alfredonara', file: 'alfredonara-1.png', shape: 'rect' },
      { name: 'Beef with Mushroom', file: 'beef-mushroom.webp', shape: 'oval' },
      { name: 'Chicken Cordon Bleu Mornay', file: 'chicken-cordon-bleu.webp', shape: 'oval' },
      { name: 'Buttered Garlic Shrimp', file: 'buttered-garlic-shrimp.webp', shape: 'oval' },
      { name: 'Pork BBQ · 30 Skewers', file: 'nyo-bbq-1.png', shape: 'rect' },
      { name: 'Zesty Lemon Loaf', file: 'zesty-lemon-loaf.webp', shape: 'oval' }
    ]
  }
];

// Arrange the serving dishes naturally on the festive table
async function composeFeast(feast) {
  const tableBuffer = Buffer.from(generateChristmasTableSvg(W, H, feast.name, feast.category));
  const composites = [];
  const count = feast.dishes.length;

  if (count === 4) {
    // 4-Dish Banquet: 2x2 with generous platter sizes and festive center breathing space
    const platterW = 500;
    const platterH = 345;
    const startX = 65;
    const startY = 72;
    const gapX = 70;
    const gapY = 55;

    const coords = [
      { left: startX, top: startY },
      { left: startX + platterW + gapX, top: startY },
      { left: startX, top: startY + platterH + gapY },
      { left: startX + platterW + gapX, top: startY + platterH + gapY }
    ];

    for (let i = 0; i < 4; i++) {
      const d = feast.dishes[i];
      const imgPath = path.join(DISH_DIR, d.file);
      const dishBuffer = await createPorcelainServingDish(imgPath, d.name, platterW, platterH, d.shape);
      composites.push({
        input: dishBuffer,
        left: coords[i].left,
        top: coords[i].top
      });
    }

    // Add extra centerpiece holiday pine branch & candlelight between the 4 platters
    const centerpieceSvg = `
      <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <g id="centerPine">
            <path d="M-60,0 Q-20,-15 0,0 Q20,15 60,0" stroke="#256241" stroke-width="4" stroke-linecap="round" fill="none" />
            <path d="M-40,0 Q0,-25 40,0" stroke="#1d4d33" stroke-width="3" stroke-linecap="round" fill="none" />
            <circle cx="-10" cy="-4" r="6" fill="#d92632" />
            <circle cx="-9" cy="-6" r="1.8" fill="#fff" opacity="0.8" />
            <circle cx="10" cy="4" r="5.5" fill="#b01b25" />
            <circle cx="11" cy="2" r="1.6" fill="#fff" opacity="0.8" />
          </g>
          <filter id="centerCandleGlow">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>
        <!-- Center Candle Warm Glow -->
        <circle cx="${W / 2}" cy="${H / 2}" r="65" fill="#ffb703" opacity="0.32" filter="url(#centerCandleGlow)" />
        <use href="#centerPine" transform="translate(${W / 2}, ${H / 2}) scale(1.3)" />
      </svg>
    `;
    composites.push({ input: Buffer.from(centerpieceSvg), left: 0, top: 0 });

  } else if (count === 5) {
    // 5-Dish Banquet: 3 on top row, 2 centered on bottom row
    const platterWTop = 350;
    const platterHTop = 330;
    const platterWBot = 485;
    const platterHBot = 345;

    const gapTop = 35;
    const startXTop = 55;
    const startYTop = 72;

    for (let i = 0; i < 3; i++) {
      const d = feast.dishes[i];
      const imgPath = path.join(DISH_DIR, d.file);
      const dishBuffer = await createPorcelainServingDish(imgPath, d.name, platterWTop, platterHTop, d.shape);
      composites.push({
        input: dishBuffer,
        left: startXTop + i * (platterWTop + gapTop),
        top: startYTop
      });
    }

    const gapBot = 65;
    const startXBot = 85;
    const startYBot = startYTop + platterHTop + 45;

    for (let i = 0; i < 2; i++) {
      const d = feast.dishes[3 + i];
      const imgPath = path.join(DISH_DIR, d.file);
      const dishBuffer = await createPorcelainServingDish(imgPath, d.name, platterWBot, platterHBot, d.shape);
      composites.push({
        input: dishBuffer,
        left: startXBot + i * (platterWBot + gapBot),
        top: startYBot
      });
    }
  } else if (count === 6) {
    // 6-Dish Grand Banquet: 3 on top, 3 on bottom
    const platterW = 350;
    const platterH = 330;
    const gapX = 35;
    const gapY = 45;
    const startX = 55;
    const startY = 72;

    for (let i = 0; i < 6; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const d = feast.dishes[i];
      const imgPath = path.join(DISH_DIR, d.file);
      const dishBuffer = await createPorcelainServingDish(imgPath, d.name, platterW, platterH, d.shape);
      composites.push({
        input: dishBuffer,
        left: startX + col * (platterW + gapX),
        top: startY + row * (platterH + gapY)
      });
    }
  }

  const outPath = path.join(OUT_DIR, `feast-${feast.key}.jpg`);

  await sharp(tableBuffer)
    .composite(composites)
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(outPath);

  console.log(`Generated: feast-${feast.key}.jpg`);
}

async function run() {
  console.log('Composing elegant porcelain serving dishes on Christmas-themed dining tables...');
  for (const feast of FEAST_SETS) {
    await composeFeast(feast);
  }
  console.log('All 12 Christmas feast table images generated successfully!');
}

run().catch(console.error);
