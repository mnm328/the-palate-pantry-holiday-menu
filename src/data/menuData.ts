export interface FeastItem {
  name: string;
  price: string;
  items: string[];
  image?: string;
}

export interface FeastCategory {
  label: string;
  feasts: FeastItem[];
}

export interface AlacarteItem {
  name: string;
  price: string;
  regular?: string;
  note?: string;
}

export interface AlacarteCategory {
  title: string;
  seasonal?: boolean;
  footnote?: string;
  items: AlacarteItem[];
}

export const curatedFeasts: FeastCategory[] = [
  {
    label: "Christmas Table",
    feasts: [
      {
        name: "Holiday Party Favorites",
        price: "₱4,500",
        image: "/assets/holiday-party-favorites.png",
        items: [
          "Baked Spaghetti with Meatballs",
          "Flavored Chicken Wings",
          "Not-Your-Ordinary Pork BBQ · 30 skewers",
          "Zesty Lemon Loaf"
        ]
      },
      {
        name: "Asian Holiday Table",
        price: "₱4,600",
        image: "/assets/asian-holiday-table.png",
        items: [
          "Golden Garlic Sotanghon",
          "Chinese-Style Braised Pork Belly",
          "Chicken Wings · Asian Style",
          "Christmas Sharing Korean Cucumber Salad"
        ]
      },
      {
        name: "Classic Christmas Comfort",
        price: "₱3,500",
        image: "/assets/classic-christmas-comfort.png",
        items: [
          "Ultimate Baked Macaroni",
          "Homestyle Fried Chicken with Gravy",
          "Shanghai Rolls · 48 pcs",
          "Banana Loaf Cake"
        ]
      }
    ]
  },
  {
    label: "Holiday Feast",
    feasts: [
      {
        name: "Coastal Holiday Feast",
        price: "₱5,900",
        image: "/assets/coastal-holiday-feast.png",
        items: [
          "Creamy Truffle Bacon Pasta",
          "Buttered Garlic Shrimp",
          "Lemon Fish Fillet with Aioli",
          "Cheesy Baked Bangus",
          "Banana Loaf Cake"
        ]
      },
      {
        name: "Chinese-Style Holiday Feast",
        price: "₱6,150",
        image: "/assets/chinese-style-holiday-feast.png",
        items: [
          "Savory Charlie Chan",
          "Chinese-Style Braised Pork Belly",
          "Chicken Wings · Asian Style",
          "Golden Garlic Sotanghon",
          "Shanghai Rolls · 48 pcs"
        ]
      },
      {
        name: "Western Holiday Comfort",
        price: "₱5,600",
        image: "/assets/western-holiday-comfort.png",
        items: [
          "Creamy Truffle Bacon Pasta",
          "Salisbury Steak with Mushroom Gravy",
          "Chicken Cordon Bleu with Mornay",
          "Christmas Sharing Nacho Salad",
          "Zesty Lemon Loaf"
        ]
      }
    ]
  },
  {
    label: "Christmas Salu-Salo",
    feasts: [
      {
        name: "Filipino Christmas",
        price: "₱6,300",
        image: "/assets/filipino-christmas.png",
        items: [
          "Classic Mom’s Lasagna",
          "Classic Kare-Kare with Binagoongan",
          "Flavored Chicken Wings",
          "Shanghai Rolls · 48 pcs",
          "Banana Loaf Cake"
        ]
      },
      {
        name: "Korean Holiday Feast",
        price: "₱6,850",
        image: "/assets/korean-holiday-feast.png",
        items: [
          "Korean Japchae",
          "Braised Beef",
          "Chicken Wings · Asian Style",
          "Baked Sushi · Kani & Tuna",
          "Christmas Sharing Korean Cucumber Salad"
        ]
      },
      {
        name: "Holiday Indulgence",
        price: "₱6,150",
        image: "/assets/holiday-indulgence.png",
        items: [
          "Creamy Truffle Bacon Pasta",
          "Beef with Mushroom",
          "Chicken Alexander",
          "Taconitos · 12 pcs",
          "Zesty Lemon Loaf"
        ]
      }
    ]
  },
  {
    label: "Grand Christmas Feast",
    feasts: [
      {
        name: "Ultimate Holiday Table",
        price: "₱8,150",
        image: "/assets/ultimate-holiday-table.png",
        items: [
          "Alfredonara",
          "Beef with Mushroom",
          "Chicken Cordon Bleu with Mornay",
          "Buttered Garlic Shrimp",
          "Not-Your-Ordinary Pork BBQ · 30 skewers",
          "Zesty Lemon Loaf"
        ]
      },
      {
        name: "Grand Seafood Christmas",
        price: "₱8,600",
        image: "/assets/grand-seafood-christmas.png",
        items: [
          "Creamy Truffle Bacon Pasta",
          "Cajun Seafood Boil",
          "Shrimp Salvatorre",
          "Cheesy Baked Bangus",
          "Baked Sushi · Kani & Tuna"
        ]
      },
      {
        name: "The Palate Pantry Signature",
        price: "₱7,999",
        image: "/assets/the-palate-pantry-signature.png",
        items: [
          "Classic Mom’s Lasagna",
          "Classic Kare-Kare with Binagoongan",
          "Flavored Chicken Wings",
          "Buttered Garlic Shrimp",
          "Shanghai Rolls · 48 pcs",
          "Banana Loaf Cake"
        ]
      }
    ]
  }
];

export const alacarteCategories: AlacarteCategory[] = [
  {
    title: "Salads & Savory Bites",
    items: [
      { name: "Taconitos", note: "12 pcs", price: "₱900" },
      { name: "Shanghai Rolls", note: "48 pcs", price: "₱700" },
      { name: "Baked Sushi · Kani & Tuna", note: "10–12 pax", price: "₱1,500" },
      { name: "Korean Cucumber Salad", note: "3–4 pax / tub", price: "₱300" },
      { name: "Nacho Salad", note: "individual tub · min. 10", price: "₱150/tub" }
    ]
  },
  {
    title: "Pasta & Noodles",
    items: [
      { name: "Alfredonara", price: "₱1,300" },
      { name: "Baked Spaghetti with Meatballs", price: "₱1,300" },
      { name: "Creamy Truffle Bacon Pasta", price: "₱1,500" },
      { name: "Bold Chicken Fajita Pasta", price: "₱1,200" },
      { name: "Classic Mom’s Lasagna", price: "₱1,700" },
      { name: "Ultimate Baked Macaroni", price: "₱1,200" },
      { name: "Savory Charlie Chan", price: "₱1,400" },
      { name: "Korean Japchae", price: "₱1,600" },
      { name: "Golden Garlic Sotanghon", price: "₱1,200" }
    ]
  },
  {
    title: "Beef",
    seasonal: true,
    items: [
      { name: "Salisbury Steak", regular: "₱1,300", price: "₱1,350" },
      { name: "Classic Kare-Kare with Binagoongan", regular: "₱1,900", price: "₱2,000" },
      { name: "Beef with Mushroom", regular: "₱1,800", price: "₱1,900" },
      { name: "Beef & Pork Mechado", regular: "₱1,700", price: "₱1,800" },
      { name: "Braised Beef", regular: "₱1,600", price: "₱1,700" }
    ]
  },
  {
    title: "Chicken",
    footnote: "Wings: Classic Buffalo · Honey Mustard · Asian Style (Soy Garlic Lemon)",
    items: [
      { name: "Chicken Cordon Bleu", price: "₱1,300" },
      { name: "Homestyle Fried Chicken with Gravy", price: "₱1,090" },
      { name: "Flavored Chicken Wings", price: "₱1,350" },
      { name: "Chicken Alexander", price: "₱1,300" },
      { name: "Hainanese Chicken", price: "₱1,700" }
    ]
  },
  {
    title: "Pork",
    items: [
      { name: "Classic Pork Sisig", price: "₱1,300" },
      { name: "Chinese-Style Braised Pork Belly", price: "₱1,400" },
      { name: "Not-Your-Ordinary Pork BBQ", note: "30 skewers", price: "₱1,350" },
      { name: "Pork Dinuguan with Puto", price: "₱1,700" }
    ]
  },
  {
    title: "Fish & Seafood",
    seasonal: true,
    items: [
      { name: "Sinuglaw · Sugba + Kilaw", regular: "₱1,500", price: "₱1,600" },
      { name: "Lemon Fish Fillet with Aioli", regular: "₱1,100", price: "₱1,150" },
      { name: "Cheesy Baked Bangus", regular: "₱950", price: "₱1,000" },
      { name: "Shrimp Salvatorre", regular: "₱1,750", price: "₱1,850" },
      { name: "Buttered Garlic Shrimp", regular: "₱1,650", price: "₱1,750" },
      { name: "Cajun Seafood Boil", regular: "₱2,500", price: "₱2,650" }
    ]
  },
  {
    title: "Something Sweet",
    items: [
      { name: "Banana Loaf Cake", price: "₱425" },
      { name: "Zesty Lemon Loaf", price: "₱450" }
    ]
  }
];

export const dishImages: Record<string, string> = {
  "Ultimate Baked Macaroni": "/assets/dishes/baked-macaroni-1.png",
  "Homestyle Fried Chicken with Gravy": "/assets/dishes/homestyle-fried-chicken-with-gravy-1.png",
  "Shanghai Rolls · 48 pcs": "/assets/dishes/shanghai-1.png",
  "Shanghai Rolls": "/assets/dishes/shanghai-1.png",
  "Banana Loaf Cake": "/assets/dishes/banana-loaf-cake.webp",
  "Baked Spaghetti with Meatballs": "/assets/dishes/baked-spaghetti-meatballs.webp",
  "Flavored Chicken Wings": "/assets/dishes/flavored-chicken-wings.webp",
  "Chicken Wings · Asian Style": "/assets/dishes/flavored-chicken-wings.webp",
  "Not-Your-Ordinary Pork BBQ · 30 skewers": "/assets/dishes/nyo-bbq-1.png",
  "Not-Your-Ordinary Pork BBQ": "/assets/dishes/nyo-bbq-1.png",
  "Zesty Lemon Loaf": "/assets/dishes/zesty-lemon-loaf.webp",
  "Golden Garlic Sotanghon": "/assets/dishes/golden-garlic-sotanghon.webp",
  "Chinese-Style Braised Pork Belly": "/assets/dishes/chinese-braised-pork-belly.webp",
  "Christmas Sharing Korean Cucumber Salad": "/assets/dishes/cucumber-salad-1.png",
  "Korean Cucumber Salad": "/assets/dishes/cucumber-salad-1.png",
  "Creamy Truffle Bacon Pasta": "/assets/dishes/creamy-truffle-bacon-pasta-2-1.png",
  "Salisbury Steak with Mushroom Gravy": "/assets/dishes/salisbury-steak.webp",
  "Salisbury Steak": "/assets/dishes/salisbury-steak.webp",
  "Chicken Cordon Bleu with Mornay": "/assets/dishes/chicken-cordon-bleu.webp",
  "Chicken Cordon Bleu": "/assets/dishes/chicken-cordon-bleu.webp",
  "Christmas Sharing Nacho Salad": "/assets/dishes/nacho-salad.webp",
  "Nacho Salad": "/assets/dishes/nacho-salad.webp",
  "Savory Charlie Chan": "/assets/dishes/savory-charlie-chan.webp",
  "Buttered Garlic Shrimp": "/assets/dishes/buttered-garlic-shrimp.webp",
  "Lemon Fish Fillet with Aioli": "/assets/dishes/lemon-fish-fillet.webp",
  "Cheesy Baked Bangus": "/assets/dishes/cheesy-baked-bangus-1.png",
  "Classic Mom’s Lasagna": "/assets/dishes/lasagna-1.png",
  "Classic Kare-Kare with Binagoongan": "/assets/dishes/beef-kare-kare-1.png",
  "Beef with Mushroom": "/assets/dishes/beef-mushroom.webp",
  "Chicken Alexander": "/assets/dishes/chicken-alexander.webp",
  "Taconitos · 12 pcs": "/assets/dishes/taconitos-1.png",
  "Taconitos": "/assets/dishes/taconitos-1.png",
  "Korean Japchae": "/assets/dishes/korean-japchae.webp",
  "Braised Beef": "/assets/dishes/oriental-braised-beef.webp",
  "Oriental Braised Beef": "/assets/dishes/oriental-braised-beef.webp",
  "Baked Sushi · Kani & Tuna": "/assets/dishes/baked-sushi.webp",
  "Cajun Seafood Boil": "/assets/dishes/seafood-boil-1.png",
  "Shrimp Salvatorre": "/assets/dishes/shrimp-salvatorre-1.png",
  "Alfredonara": "/assets/dishes/alfredonara-1.png",
  "Bold Chicken Fajita Pasta": "/assets/dishes/bold-chicken-fajita-1.png",
  "Beef & Pork Mechado": "/assets/dishes/beef-pork-mechado.webp",
  "Hainanese Chicken": "/assets/dishes/hainanese-chicken.webp",
  "Classic Pork Sisig": "/assets/dishes/pork-sisig-1.png",
  "Pork Dinuguan with Puto": "/assets/dishes/pork-dinuguan.webp",
  "Sinuglaw · Sugba + Kilaw": "/assets/dishes/pork-sinuglaw-1.png"
};

export const PRODUCT_URLS: Record<string, string> = {
  // Salads & Savory Bites
  "Taconitos": "https://thepalatepantry.com/store-product-detail/product/taconitos",
  "Shanghai Rolls": "https://thepalatepantry.com/store-product-detail/product/shanghai-rolls",
  "Baked Sushi - Kani & Tuna": "https://thepalatepantry.com/store-product-detail/product/baked-sushi-kani-and-tuna",
  "Baked Sushi · Kani & Tuna": "https://thepalatepantry.com/store-product-detail/product/baked-sushi-kani-and-tuna",
  "Korean Cucumber Salad": "https://thepalatepantry.com/store-product-detail/product/korean-cucumber-salad",
  "Nacho Salad": "https://thepalatepantry.com/store-product-detail/product/nacho-salad",

  // Pasta & Noodles
  "Alfredonara": "https://thepalatepantry.com/store-product-detail/product/alfredonara",
  "Baked Spaghetti with Meatballs": "https://thepalatepantry.com/store-product-detail/product/baked-spaghetti-with-meatballs",
  "Creamy Truffle Bacon Pasta": "https://thepalatepantry.com/store-product-detail/product/creamy-truffle-bacon-pasta",
  "Bold Chicken Fajita Pasta": "https://thepalatepantry.com/store-product-detail/product/bold-chicken-fajita-pasta",
  "Classic Mom's Lasagna": "https://thepalatepantry.com/store-product-detail/product/classic-mom-s-lasagna",
  "Classic Mom’s Lasagna": "https://thepalatepantry.com/store-product-detail/product/classic-mom-s-lasagna",
  "Ultimate Baked Macaroni": "https://thepalatepantry.com/store-product-detail/product/ultimate-baked-macaroni",
  "Savory Charlie Chan": "https://thepalatepantry.com/store-product-detail/product/savory-charlie-chan",
  "Korean Japchae": "https://thepalatepantry.com/store-product-detail/product/korean-japchae",
  "Golden Garlic Sotanghon": "https://thepalatepantry.com/store-product-detail/product/golden-garlic-sotanghon",

  // Beef
  "Salisbury Steak": "https://thepalatepantry.com/store-product-detail/product/holiday-salisbury-steak",
  "Classic Kare-Kare with Binagoongan": "https://thepalatepantry.com/store-product-detail/product/holiday-classic-kare-kare-with-binagoongan",
  "Beef with Mushroom": "https://thepalatepantry.com/store-product-detail/product/holiday-beef-with-mushroom",
  "Beef & Pork Mechado": "https://thepalatepantry.com/store-product-detail/product/holiday-beef-pork-mechado",
  "Braised Beef": "https://thepalatepantry.com/store-product-detail/product/holiday-braised-beef",

  // Chicken
  "Chicken Cordon Bleu": "https://thepalatepantry.com/store-product-detail/product/chicken-cordon-bleu",
  "Homestyle Fried Chicken with Gravy": "https://thepalatepantry.com/store-product-detail/product/homestyle-fried-chicken-with-gravy",
  "Flavored Chicken Wings": "https://thepalatepantry.com/store-product-detail/product/flavored-chicken-wings",
  "Chicken Alexander": "https://thepalatepantry.com/store-product-detail/product/chicken-alexander",
  "Hainanese Chicken": "https://thepalatepantry.com/store-product-detail/product/hainanese-chicken",

  // Pork
  "Classic Pork Sisig": "https://thepalatepantry.com/store-product-detail/product/classic-pork-sisig",
  "Chinese-Style Braised Pork Belly": "https://thepalatepantry.com/store-product-detail/product/chinese-style-braised-pork-belly",
  "Not-Your-Ordinary Pork BBQ": "https://thepalatepantry.com/store-product-detail/product/not-your-ordinary-pork-bbq",
  "Pork Dinuguan with Puto": "https://thepalatepantry.com/store-product-detail/product/pork-dinuguan-with-puto",

  // Fish & Seafood
  "Sinuglaw - Sugba + Kilaw": "https://thepalatepantry.com/store-product-detail/product/holiday-sinuglaw-sugba-kilaw",
  "Sinuglaw · Sugba + Kilaw": "https://thepalatepantry.com/store-product-detail/product/holiday-sinuglaw-sugba-kilaw",
  "Lemon Fish Fillet with Aioli": "https://thepalatepantry.com/store-product-detail/product/holiday-lemon-fish-fillet-with-aioli",
  "Cheesy Baked Bangus": "https://thepalatepantry.com/store-product-detail/product/holiday-cheesy-baked-bangus",
  "Shrimp Salvatorre": "https://thepalatepantry.com/store-product-detail/product/holiday-shrimp-salvatorre",
  "Buttered Garlic Shrimp": "https://thepalatepantry.com/store-product-detail/product/holiday-buttered-garlic-shrimp",
  "Cajun Seafood Boil": "https://thepalatepantry.com/store-product-detail/product/holiday-cajun-seafood-boil",

  // Something Sweet
  "Banana Loaf Cake": "https://thepalatepantry.com/store-product-detail/product/banana-loaf-cake",
  "Zesty Lemon Loaf": "https://thepalatepantry.com/store-product-detail/product/zesty-lemon-loaf",

  // Curated Feasts
  "Classic Christmas Comfort": "https://thepalatepantry.com/store-product-detail/product/christmas-table-a-classic-christmas-comfort",
  "Holiday Party Favorites": "https://thepalatepantry.com/store-product-detail/product/christmas-table-b-holiday-party-favorites",
  "Asian Holiday Table": "https://thepalatepantry.com/store-product-detail/product/christmas-table-c-asian-holiday-table",
  "Western Holiday Comfort": "https://thepalatepantry.com/store-product-detail/product/holiday-feast-a-western-holiday-comfort",
  "Chinese-Style Holiday Feast": "https://thepalatepantry.com/store-product-detail/product/holiday-feast-b-chinese-style-holiday-feast",
  "Coastal Holiday Feast": "https://thepalatepantry.com/store-product-detail/product/holiday-feast-c-coastal-holiday-feast",
  "Filipino Christmas": "https://thepalatepantry.com/store-product-detail/product/christmas-salu-salo-a-filipino-christmas",
  "Holiday Indulgence": "https://thepalatepantry.com/store-product-detail/product/christmas-salu-salo-b-holiday-indulgence",
  "Korean Holiday Feast": "https://thepalatepantry.com/store-product-detail/product/christmas-salu-salo-c-korean-holiday-feast",
  "The Palate Pantry Signature": "https://thepalatepantry.com/store-product-detail/product/grand-christmas-feast-a-the-palate-pantry-signature",
  "Grand Seafood Christmas": "https://thepalatepantry.com/store-product-detail/product/grand-christmas-feast-b-grand-seafood-christmas",
  "Ultimate Holiday Table": "https://thepalatepantry.com/store-product-detail/product/grand-christmas-feast-c-ultimate-holiday-table"
};

/**
 * Returns the matching GHL product page URL for any product or feast name.
 * Normalizes punctuation and apostrophes so variations always match reliably.
 */
export function getProductUrl(name: string): string {
  if (PRODUCT_URLS[name]) {
    return PRODUCT_URLS[name];
  }
  const clean = (str: string) =>
    str
      .replace(/[\u2018\u2019']/g, "'")
      .replace(/[·–—]/g, '-')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

  const target = clean(name);
  for (const [key, url] of Object.entries(PRODUCT_URLS)) {
    if (clean(key) === target) {
      return url;
    }
  }

  // Fallback to store root if unknown
  return "https://thepalatepantry.com";
}
