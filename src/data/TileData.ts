/**
 * TileData.ts
 * 
 * Tile categories and images based on the actual TilesImages folder structure.
 * Each size has ONE image only (as per Excel reference).
 * 
 * Categories based on Excel reference:
 * - SMALL TILES (100x100 to 300x450)
 * - MEDIUM TILES (300x600 to 600x600)
 * - LARGE TILES (600x1200 to 300x1200)
 * - EXTRA LARGE TILES (800x3000 to 1200x3200)
 * - FULL BODY TILES (600x600, 600x1200)
 */

export type TileImg = {
  src: string;
  fallback: string;
  alt: string;
};

export type TileSize = {
  name: string;
  images: TileImg[];
};

export type TileCategory = {
  id: string;
  name: string;
  sizeRange: string;
  description: string;
  images: TileImg[];  // Category preview images (uses first image from sizes)
  sizes: TileSize[];
};

// ============================================================
// TILES CATEGORIES - Based on TilesImages folder & Excel reference
// ============================================================

export const tileCategories: TileCategory[] = [
  {
    id: 'small-tiles',
    name: 'Small Tiles',
    sizeRange: '100x100 to 300x450',
    description: 'Compact and versatile tiles perfect for detailed wall designs and small spaces',
    // Category preview uses first size image
    images: [
      {
        src: '/TilesImages/small.webp',
        fallback: '/TilesImages/small.webp',
        alt: 'Small Tiles Collection',
      },
    ],
    sizes: [
      {
        name: '100x100',
        images: [
          {
            src: '/TilesImages/100x100.webp',
            fallback: '/TilesImages/100x100.webp',
            alt: 'Tile 100x100',
          },
        ],
      },
      {
        name: '100x200',
        images: [
          {
            src: '/TilesImages/100x200.webp',
            fallback: '/TilesImages/100x200.webp',
            alt: 'Tile 100x200',
          },
        ],
      },
      {
        name: '200x300',
        images: [
          {
            src: '/TilesImages/200x300.webp',
            fallback: '/TilesImages/200x300.webp',
            alt: 'Tile 200x300',
          },
        ],
      },
      {
        name: '250x375',
        images: [
          {
            src: '/TilesImages/250x375.webp',
            fallback: '/TilesImages/250x375.webp',
            alt: 'Tile 250x375',
          },
        ],
      },
      {
        name: '300x300',
        images: [
          {
            src: '/TilesImages/300x300.webp',
            fallback: '/TilesImages/300x300.webp',
            alt: 'Tile 300x300',
          },
        ],
      },
      {
        name: '300x450',
        images: [
          {
            src: '/TilesImages/300x450.webp',
            fallback: '/TilesImages/300x450.webp',
            alt: 'Tile 300x450',
          },
        ],
      },
    ]
  },
  {
    id: 'medium-tiles',
    name: 'Medium Tiles',
    sizeRange: '300x600 to 600x600',
    description: 'Balanced size tiles ideal for walls and floors in bathrooms, kitchens and living areas',
    images: [
      {
        src: '/TilesImages/medium.webp',
        fallback: '/TilesImages/medium.webp',
        alt: 'Medium Tiles Collection',
      },
    ],
    sizes: [
      {
        name: '300x600',
        images: [
          {
            src: '/TilesImages/300x600.webp',
            fallback: '/TilesImages/300x600.webp',
            alt: 'Tile 300x600',
          },
        ],
      },
      {
        name: '400x400',
        images: [
          {
            src: '/TilesImages/400x400.webp',
            fallback: '/TilesImages/400x400.webp',
            alt: 'Tile 400x400',
          },
        ],
      },
      {
        name: '500x500',
        images: [
          {
            src: '/TilesImages/500x500.webp',
            fallback: '/TilesImages/500x500.webp',
            alt: 'Tile 500x500',
          },
        ],
      },
      {
        name: '600x600',
        images: [
          {
            src: '/TilesImages/600x600.webp',
            fallback: '/TilesImages/600x600.webp',
            alt: 'Tile 600x600',
          },
        ],
      },
    ]
  },
  {
    id: 'large-tiles',
    name: 'Large Tiles',
    sizeRange: '600x1200 to 800x2400',
    description: 'Grand format tiles for seamless and luxurious flooring with minimal grout lines',
    images: [
      {
        src: '/TilesImages/large.webp',
        fallback: '/TilesImages/large.webp',
        alt: 'Large Tiles Collection',
      },
    ],
    sizes: [
      {
        name: '600x1200',
        images: [
          {
            src: '/TilesImages/600x1200.webp',
            fallback: '/TilesImages/600x1200.webp',
            alt: 'Tile 600x1200',
          },
        ],
      },
      {
        name: '800x1600',
        images: [
          {
            src: '/TilesImages/800x1600.webp',
            fallback: '/TilesImages/800x1600.webp',
            alt: 'Tile 800x1600',
          },
        ],
      },
      {
        name: '800x2400',
        images: [
          {
            src: '/TilesImages/800x2400.webp',
            fallback: '/TilesImages/800x2400.webp',
            alt: 'Tile 800x2400',
          },
        ],
      },
      {
        name: '200x1200',
        images: [
          {
            src: '/TilesImages/200x1200.webp',
            fallback: '/TilesImages/200x1200.webp',
            alt: 'Tile 200x1200',
          },
        ],
      },
      {
        name: '300x1200',
        images: [
          {
            src: '/TilesImages/300x1200.webp',
            fallback: '/TilesImages/300x1200.webp',
            alt: 'Tile 300x1200',
          },
        ],
      },
    ]
  },
  {
    id: 'extra-large-tiles',
    name: 'Extra Large Tiles',
    sizeRange: '800x3000 to 1200x3200',
    description: 'Premium oversized tiles for statement walls and expansive flooring applications',
    images: [
      {
        src: '/TilesImages/extra large.webp',
        fallback: '/TilesImages/extra large.webp',
        alt: 'Extra Large Tiles Collection',
      },
    ],
    sizes: [
      {
        name: '800x3000',
        images: [
          {
            src: '/TilesImages/800x3000.webp',
            fallback: '/TilesImages/800x3000.webp',
            alt: 'Tile 800x3000',
          },
        ],
      },
      {
        name: '1200x1600',
        images: [
          {
            src: '/TilesImages/1200x1600.webp',
            fallback: '/TilesImages/1200x1600.webp',
            alt: 'Tile 1200x1600',
          },
        ],
      },
      {
        name: '1200x2400',
        images: [
          {
            src: '/TilesImages/1200x2400.webp',
            fallback: '/TilesImages/1200x2400.webp',
            alt: 'Tile 1200x2400',
          },
        ],
      },
      {
        name: '1200x3200',
        images: [
          {
            src: '/TilesImages/1200x3200.webp',
            fallback: '/TilesImages/1200x3200.webp',
            alt: 'Tile 1200x3200',
          },
        ],
      },
    ]
  },
  {
    id: 'full-body-tiles',
    name: 'Full Body Tiles',
    sizeRange: '600x600 to 600x1200',
    description: 'Through-body colored tiles with consistent pattern throughout for high-traffic areas',
    images: [
      {
        src: '/TilesImages/Full Body.webp',
        fallback: '/TilesImages/Full Body.webp',
        alt: 'Full Body Tiles Collection',
      },
    ],
    sizes: [
      {
        name: '600x600',
        images: [
          {
            src: '/TilesImages/600x600 full body.webp',
            fallback: '/TilesImages/600x600 full body.webp',
            alt: 'Full Body Tile 600x600',
          },
        ],
      },
      {
        name: '600x1200',
        images: [
          {
            src: '/TilesImages/600x1200 full body.webp',
            fallback: '/TilesImages/600x1200 full body.webp',
            alt: 'Full Body Tile 600x1200',
          },
        ],
      },
    ]
  },
];

// ============================================================
// MARBLE & STONES CATEGORIES - Placeholder (no images yet)
// ============================================================

export type MarbleCategory = TileCategory;

export const marbleCategories: MarbleCategory[] = [
  {
    id: 'marble-collection',
    name: 'Marble',
    sizeRange: '2400x1400 to 3000x1800',
    description: 'Exquisite natural marble for premium interiors and statement pieces.',
    images: [
      {
        src: '/TilesImages/All Marble 3000x1800 x 20 mm.webp',
        fallback: '/TilesImages/All Marble 3000x1800 x 20 mm.webp',
        alt: 'Marble Collection',
      },
    ],
    sizes: [
      {
        name: '3000x1800 x 20', // All Marble
        images: [
          {
            src: '/TilesImages/All Marble 3000x1800 x 20 mm.webp',
            fallback: '/TilesImages/All Marble 3000x1800 x 20 mm.webp',
            alt: 'All Marble',
          },
        ],
      },
      {
        name: '2400x1400 x 20', // Forest Green
        images: [
          {
            src: '/TilesImages/Forest Green Marble 2400x1400 x 20 mm.webp',
            fallback: '/TilesImages/Forest Green Marble 2400x1400 x 20 mm.webp',
            alt: 'Forest Green Marble',
          },
        ],
      },
      {
        name: '3000x1800 x 20', // Indian Statuario
        images: [
          {
            src: '/TilesImages/Indian Statuario Marble 3000x1800 x 20 mm.webp',
            fallback: '/TilesImages/Indian Statuario Marble 3000x1800 x 20 mm.webp',
            alt: 'Indian Statuario Marble',
          },
        ],
      },
      // Using name as dimensions to keep consistent with tiles, 
      // or should I use the Stone Name? 
      // The UI displays "name MM", e.g. "600x600 MM". 
      // If I put "Forest Green", it will say "Forest Green MM".
      // The user requested "use the data in the selected image... marble are 3 image".
      // I'll stick to dimensions for the 'name' field effectively, 
      // BUT since multiple have same dimensions, maybe I should use the name 
      // and distinct them? 
      // Let's check Tiles.tsx: 
      // <span className="text-[9px] ...">{size.name} <span className="text-[#d4af37]">MM</span></span>
      // So it expects a number.
      // However, for marble, specific names are more important. 
      // I will modify Tiles.tsx later if needed to handle non-numeric names better, 
      // OR I can put "Forest Green" as name and accept it says "Forest Green MM" 
      // which is weird. 
      // Actually, commonly for stones, size is the key differentiator in this specific UI layout?
      // Let's use the Size as the name for now, as per the current pattern.
      // Wait, duplicate sizes (3000x1800) might be an issue for the "key" in react loop if not handled.
      // Tiles.tsx: key={`${activeCategoryId}-${size.name}-${sizeIdx}`} -> This is unique enough (sizeIdx included).
    ]
  },
  {
    id: 'granite-collection',
    name: 'Granite',
    sizeRange: '2600x1400 to 2800x1600',
    description: 'Durable and elegant granite surfaces for lasting beauty.',
    images: [
      {
        src: '/TilesImages/granite.webp',
        fallback: '/TilesImages/granite.webp',
        alt: 'Granite Collection',
      },
    ],
    sizes: [
      {
        name: '2800x1600 x 20', // Kashmir White
        images: [
          {
            src: '/TilesImages/Kashmir White granite   2800x1600x20mm.webp',
            fallback: '/TilesImages/Kashmir White granite   2800x1600x20mm.webp',
            alt: 'Kashmir White Granite',
          },
        ],
      },
      {
        name: '2600x1400 x 30', // New Imperial Red
        images: [
          {
            src: '/TilesImages/New Imperial Red Granite 2600x1400 x 30 mm.webp',
            fallback: '/TilesImages/New Imperial Red Granite 2600x1400 x 30 mm.webp',
            alt: 'New Imperial Red Granite',
          },
        ],
      },
    ]
  },
  {
    id: 'quartz-collection',
    name: 'Quartz',
    sizeRange: '3200x1600',
    description: 'Engineered perfection - Quartz surfaces for modern living.',
    images: [
      {
        src: '/TilesImages/quartz.webp',
        fallback: '/TilesImages/quartz.webp',
        alt: 'Quartz Collection',
      },
    ],
    sizes: [
      {
        name: '3200x1600 x 20', // Rosy Pink
        images: [
          {
            src: '/TilesImages/Rosy Pink Quartz  3200x1600 x 20 mm.webp',
            fallback: '/TilesImages/Rosy Pink Quartz  3200x1600 x 20 mm.webp',
            alt: 'Rosy Pink Quartz',
          },
        ],
      },
      {
        name: '3200x1600 x 20', // Full Slab
        images: [
          {
            src: '/TilesImages/full slab of Engineered Quartz 3200x1600 x 20 mm.webp',
            fallback: '/TilesImages/full slab of Engineered Quartz 3200x1600 x 20 mm.webp',
            alt: 'Engineered Quartz',
          },
        ],
      },
    ]
  }
];
