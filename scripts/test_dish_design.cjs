const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const W = 1200;
const H = 900;
const DISH_DIR = '/tmp/dish_images';

// Helper to escape XML
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

// Generates a rich Christmas-themed table background
function generateChristmasTableSvg(width, height) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep Forest Green Christmas Tablecloth -->
      <radialGradient id="tableclothGlow" cx="50%" cy="48%" r="65%">
        <stop offset="0%" stop-color="#1f4d36" />
        <stop offset="35%" stop-color="#17402c" />
        <stop offset="70%" stop-color="#0f2e1e" />
        <stop offset="100%" stop-color="#071a10" />
      </radialGradient>

      <!-- Tablecloth Damask Pattern -->
      <pattern id="damask" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M30 10 C35 20 45 25 50 30 C45 35 35 40 30 50 C25 40 15 35 10 30 C15 25 25 20 30 10 Z" 
              fill="none" stroke="#25583e" stroke-width="1.2" opacity="0.25" />
        <circle cx="30" cy="30" r="3" fill="#25583e" opacity="0.3" />
        <circle cx="0" cy="0" r="2" fill="#25583e" opacity="0.2" />
        <circle cx="60" cy="0" r="2" fill="#25583e" opacity="0.2" />
        <circle cx="0" cy="60" r="2" fill="#25583e" opacity="0.2" />
        <circle cx="60" cy="60" r="2" fill="#25583e" opacity="0.2" />
      </pattern>

      <!-- Festive Table Runner (Gold Satin with Embroidered Borders) -->
      <linearGradient id="runnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#8a1820" stop-opacity="0.9" />
        <stop offset="15%" stop-color="#a8222b" stop-opacity="0.95" />
        <stop offset="50%" stop-color="#73141a" stop-opacity="0.9" />
        <stop offset="85%" stop-color="#a8222b" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#8a1820" stop-opacity="0.9" />
      </linearGradient>

      <!-- Candle Light Warm Glow Filter -->
      <filter id="candleGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="25" result="blur" />
      </filter>

      <!-- Gold Sparkle Filter -->
      <linearGradient id="goldOrnament" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#fff4cc" />
        <stop offset="30%" stop-color="#e6b800" />
        <stop offset="70%" stop-color="#b8860b" />
        <stop offset="100%" stop-color="#5c4300" />
      </linearGradient>

      <!-- Red Ornament Gradient -->
      <radialGradient id="redOrnament" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#ff9999" />
        <stop offset="25%" stop-color="#d92632" />
        <stop offset="70%" stop-color="#800f17" />
        <stop offset="100%" stop-color="#3d0307" />
      </radialGradient>

      <!-- Pine branch cluster -->
      <g id="pineBranch">
        <path d="M0,0 Q30,-20 70,-10 M20,-8 Q35,-25 50,-18 M40,-5 Q55,-22 75,-14 M15,-4 Q28,-18 42,-12 M30,-2 Q45,-15 62,-8" 
              stroke="#22593b" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M0,0 Q30,20 70,10 M20,8 Q35,25 50,18 M40,5 Q55,22 75,14 M15,4 Q28,18 42,12 M30,2 Q45,15 62,8" 
              stroke="#18432b" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M0,0 Q40,-5 90,0" stroke="#4a2e18" stroke-width="3.5" stroke-linecap="round" fill="none" />
        <!-- Holly Berries -->
        <circle cx="25" cy="-2" r="5.5" fill="#d92632" />
        <circle cx="26" cy="-4" r="1.8" fill="#fff" opacity="0.8" />
        <circle cx="33" cy="4" r="5" fill="#b01b25" />
        <circle cx="34" cy="2" r="1.5" fill="#fff" opacity="0.8" />
        <circle cx="38" cy="-5" r="4.5" fill="#e63946" />
        <circle cx="39" cy="-7" r="1.3" fill="#fff" opacity="0.8" />
      </g>

      <!-- Candle Graphic with Flame -->
      <g id="christmasCandle">
        <!-- Ambient Warm Light Circle -->
        <circle cx="0" cy="0" r="70" fill="#ffb703" opacity="0.22" filter="url(#candleGlow)" />
        <circle cx="0" cy="0" r="35" fill="#ffd166" opacity="0.35" filter="url(#candleGlow)" />
        <!-- Candle Body -->
        <rect x="-14" y="0" width="28" height="42" rx="4" fill="#faf6ee" stroke="#d5c8b5" stroke-width="1" />
        <!-- Wax Rim -->
        <ellipse cx="0" cy="0" rx="14" ry="4" fill="#f0e6d6" stroke="#c4b59d" stroke-width="0.8" />
        <ellipse cx="0" cy="0" rx="6" ry="2" fill="#d5c8b5" />
        <!-- Wick -->
        <line x1="0" y1="0" x2="0" y2="-8" stroke="#332211" stroke-width="2" stroke-linecap="round" />
        <!-- Flame -->
        <path d="M0,-8 C-5,-14 -4,-22 0,-28 C4,-22 5,-14 0,-8 Z" fill="#ff9e00" />
        <path d="M0,-9 C-3,-14 -2,-20 0,-24 C2,-20 3,-14 0,-9 Z" fill="#ffd166" />
        <ellipse cx="0" cy="-12" rx="1.5" ry="3" fill="#ffffff" />
      </g>
    </defs>

    <!-- 1. Rich Forest Green Linen Base -->
    <rect width="${width}" height="${height}" fill="url(#tableclothGlow)" />
    <!-- Subtle Damask Weave Overlay -->
    <rect width="${width}" height="${height}" fill="url(#damask)" />

    <!-- 2. Festive Cranberry & Gold Holiday Runner -->
    <rect x="0" y="${height * 0.44}" width="${width}" height="${height * 0.12}" 
          fill="url(#runnerGrad)" opacity="0.75" />
    <line x1="0" y1="${height * 0.44}" x2="${width}" y2="${height * 0.44}" 
          stroke="#dda74f" stroke-width="2" stroke-dasharray="12 6" opacity="0.85" />
    <line x1="0" y1="${height * 0.56}" x2="${width}" y2="${height * 0.56}" 
          stroke="#dda74f" stroke-width="2" stroke-dasharray="12 6" opacity="0.85" />

    <!-- 3. Christmas Garlands & Natural Greenery on Table -->
    <!-- Top-Left Garland -->
    <g transform="translate(60, 45) scale(1.6)">
      <use href="#pineBranch" transform="rotate(30)" />
      <use href="#pineBranch" transform="rotate(65) scale(0.85)" />
      <!-- Gold Bauble -->
      <circle cx="50" cy="30" r="14" fill="url(#goldOrnament)" />
      <circle cx="46" cy="25" r="3.5" fill="#fff" opacity="0.7" />
    </g>

    <!-- Top-Right Garland -->
    <g transform="translate(${width - 60}, 45) scale(1.6)">
      <use href="#pineBranch" transform="scale(-1, 1) rotate(30)" />
      <use href="#pineBranch" transform="scale(-1, 1) rotate(65) scale(0.85)" />
      <!-- Red Holiday Bauble -->
      <circle cx="-50" cy="30" r="14" fill="url(#redOrnament)" />
      <circle cx="-54" cy="25" r="3.5" fill="#fff" opacity="0.7" />
    </g>

    <!-- Bottom-Left Garland -->
    <g transform="translate(60, ${height - 45}) scale(1.6)">
      <use href="#pineBranch" transform="scale(1, -1) rotate(30)" />
      <use href="#pineBranch" transform="scale(1, -1) rotate(65) scale(0.85)" />
      <!-- Red Holiday Bauble -->
      <circle cx="50" cy="-30" r="14" fill="url(#redOrnament)" />
      <circle cx="46" cy="-35" r="3.5" fill="#fff" opacity="0.7" />
    </g>

    <!-- Bottom-Right Garland -->
    <g transform="translate(${width - 60}, ${height - 45}) scale(1.6)">
      <use href="#pineBranch" transform="scale(-1, -1) rotate(30)" />
      <use href="#pineBranch" transform="scale(-1, -1) rotate(65) scale(0.85)" />
      <!-- Gold Bauble -->
      <circle cx="-50" cy="-30" r="14" fill="url(#goldOrnament)" />
      <circle cx="-54" cy="-35" r="3.5" fill="#fff" opacity="0.7" />
    </g>

    <!-- 4. Glowing Christmas Candles on the Table -->
    <!-- Candle Left -->
    <use href="#christmasCandle" transform="translate(140, ${height / 2}) scale(1.1)" />
    <!-- Candle Right -->
    <use href="#christmasCandle" transform="translate(${width - 140}, ${height / 2}) scale(1.1)" />
    <!-- Candle Center Top -->
    <use href="#christmasCandle" transform="translate(${width / 2}, 65) scale(0.95)" />
    <!-- Candle Center Bottom -->
    <use href="#christmasCandle" transform="translate(${width / 2}, ${height - 65}) scale(0.95)" />

    <!-- 5. Scattered Gold Stars & Confetti on Tablecloth -->
    <g fill="#ffd166" opacity="0.7">
      <path d="M320,110 L322,116 L328,118 L322,120 L320,126 L318,120 L312,118 L318,116 Z" />
      <path d="M880,110 L882,116 L888,118 L882,120 L880,126 L878,120 L872,118 L878,116 Z" />
      <path d="M300,790 L302,796 L308,798 L302,800 L300,806 L298,800 L292,798 L298,796 Z" />
      <path d="M900,790 L902,796 L908,798 L902,800 L900,806 L898,800 L892,798 L898,796 Z" />
      <circle cx="210" cy="220" r="2.5" fill="#ffd166" opacity="0.6" />
      <circle cx="990" cy="220" r="2.5" fill="#ffd166" opacity="0.6" />
      <circle cx="210" cy="680" r="2.5" fill="#ffd166" opacity="0.6" />
      <circle cx="990" cy="680" r="2.5" fill="#ffd166" opacity="0.6" />
    </g>
  </svg>
  `;
}

// Create an authentic fine-porcelain serving dish with gold rim and food inside
async function createPorcelainServingDish(foodPath, dishTitle, width, height, shape = 'oval') {
  const rimSize = 20;
  const foodW = width - (rimSize * 2);
  const foodH = height - (rimSize * 2);

  const resizedFood = await sharp(foodPath)
    .resize(foodW, foodH, { fit: 'cover', position: 'center' })
    .png()
    .toBuffer();

  // Create inner clipping mask for food based on shape
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
          <!-- Deep Tablecloth Shadow under Platter -->
          <filter id="platterShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#020c06" flood-opacity="0.92" />
            <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.6" />
          </filter>

          <!-- Fine Bone China Rim Gradient -->
          <radialGradient id="porcelainRim" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="60%" stop-color="#faf7f0" />
            <stop offset="90%" stop-color="#ede4d4" />
            <stop offset="100%" stop-color="#ded2be" />
          </radialGradient>

          <!-- 24K Gold Rim Trim -->
          <linearGradient id="gold24k" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d4af37" />
            <stop offset="25%" stop-color="#fff2a3" />
            <stop offset="50%" stop-color="#d4af37" />
            <stop offset="75%" stop-color="#aa820a" />
            <stop offset="100%" stop-color="#d4af37" />
          </linearGradient>

          <!-- Inner Platter Depression Shadow -->
          <radialGradient id="innerWellShadow" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stop-color="#000000" stop-opacity="0" />
            <stop offset="100%" stop-color="#000000" stop-opacity="0.35" />
          </radialGradient>
        </defs>

        <!-- Main Oval Ceramic Platter Body -->
        <ellipse cx="${width / 2}" cy="${height / 2}" rx="${(width - 12) / 2}" ry="${(height - 12) / 2}"
                 fill="url(#porcelainRim)" filter="url(#platterShadow)" />

        <!-- Outer 24k Gold Filigree Edge -->
        <ellipse cx="${width / 2}" cy="${height / 2}" rx="${(width - 14) / 2}" ry="${(height - 14) / 2}"
                 fill="none" stroke="url(#gold24k)" stroke-width="2.5" />

        <!-- Embossed Platter Rim Ring -->
        <ellipse cx="${width / 2}" cy="${height / 2}" rx="${(width - 32) / 2}" ry="${(height - 32) / 2}"
                 fill="none" stroke="#d8ccb8" stroke-width="1.2" opacity="0.75" />

        <!-- Inner Gold Accent Ring bordering the food -->
        <ellipse cx="${width / 2}" cy="${height / 2}" rx="${foodW / 2 + 1}" ry="${foodH / 2 + 1}"
                 fill="none" stroke="url(#gold24k)" stroke-width="1.8" />
      </svg>
    `;
  } else {
    // Rectangular / Casserole Baker with Rounded Scalloped Gold Rim
    maskSvg = `
      <svg width="${foodW}" height="${foodH}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${foodW}" height="${foodH}" rx="22" ry="22" fill="#ffffff" />
      </svg>
    `;

    platterSvg = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="bakerShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#020c06" flood-opacity="0.92" />
            <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.6" />
          </filter>

          <linearGradient id="bakerPorcelain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="40%" stop-color="#fdfbf7" />
            <stop offset="85%" stop-color="#ede3d1" />
            <stop offset="100%" stop-color="#dfd2bd" />
          </linearGradient>

          <linearGradient id="gold24kBaker" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d4af37" />
            <stop offset="30%" stop-color="#fff2a3" />
            <stop offset="70%" stop-color="#aa820a" />
            <stop offset="100%" stop-color="#d4af37" />
          </linearGradient>
        </defs>

        <!-- Rectangular Baker Body -->
        <rect x="6" y="6" width="${width - 12}" height="${height - 12}" rx="28" ry="28"
              fill="url(#bakerPorcelain)" filter="url(#bakerShadow)" />

        <!-- Gold Filigree Outer Rim -->
        <rect x="7" y="7" width="${width - 14}" height="${height - 14}" rx="27" ry="27"
              fill="none" stroke="url(#gold24kBaker)" stroke-width="2.5" />

        <!-- Inner Rim Accent -->
        <rect x="${rimSize - 2}" y="${rimSize - 2}" width="${foodW + 4}" height="${foodH + 4}" rx="23" ry="23"
              fill="none" stroke="url(#gold24kBaker)" stroke-width="1.8" />
      </svg>
    `;
  }

  // Elegant brass/gold holiday menu cartouche banner below the food
  const cartoucheW = Math.min(width - 40, 320);
  const cartoucheH = 28;
  const cartoucheSvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="cartoucheShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.65" />
        </filter>
        <linearGradient id="cartoucheBg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0d2417" stop-opacity="0.95" />
          <stop offset="50%" stop-color="#19472e" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#0d2417" stop-opacity="0.95" />
        </linearGradient>
      </defs>

      <!-- Cartouche Plaque -->
      <g transform="translate(${(width - cartoucheW) / 2}, ${height - cartoucheH - 12})" filter="url(#cartoucheShadow)">
        <rect x="0" y="0" width="${cartoucheW}" height="${cartoucheH}" rx="14" ry="14"
              fill="url(#cartoucheBg)" stroke="#d4af37" stroke-width="1.2" />
        <circle cx="10" cy="${cartoucheH / 2}" r="2" fill="#d4af37" />
        <circle cx="${cartoucheW - 10}" cy="${cartoucheH / 2}" r="2" fill="#d4af37" />
        <text x="${cartoucheW / 2}" y="${cartoucheH / 2 + 1}"
              font-family="'Fraunces', 'Georgia', serif" font-size="12.5" font-weight="700"
              fill="#fffaf0" text-anchor="middle" dominant-baseline="central" letter-spacing="0.4px">
          ${escapeXml(dishTitle)}
        </text>
      </g>
    </svg>
  `;

  // Mask food into dish well
  const maskedFood = await sharp(resizedFood)
    .composite([{ input: Buffer.from(maskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  return sharp(Buffer.from(platterSvg))
    .composite([
      { input: maskedFood, top: rimSize, left: rimSize },
      { input: Buffer.from(cartoucheSvg), top: 0, left: 0 }
    ])
    .png()
    .toBuffer();
}

console.log('Test dish design script ready');
