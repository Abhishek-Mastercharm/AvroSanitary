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
        src: '/TilesImages/100x100.png',
        fallback: '/TilesImages/100x100.png',
        alt: 'Small Tiles 100x100',
      },
    ],
    sizes: [
      {
        name: '100x100',
        images: [
          {
            src: '/TilesImages/100x100.png',
            fallback: '/TilesImages/100x100.png',
            alt: 'Tile 100x100',
          },
        ],
      },
      {
        name: '100x200',
        images: [
          {
            src: '/TilesImages/100x200.png',
            fallback: '/TilesImages/100x200.png',
            alt: 'Tile 100x200',
          },
        ],
      },
      {
        name: '200x300',
        images: [
          {
            src: '/TilesImages/200x300.jpg',
            fallback: '/TilesImages/200x300.jpg',
            alt: 'Tile 200x300',
          },
        ],
      },
      {
        name: '250x375',
        images: [
          {
            src: '/TilesImages/250x375.png',
            fallback: '/TilesImages/250x375.png',
            alt: 'Tile 250x375',
          },
        ],
      },
      {
        name: '300x300',
        images: [
          {
            src: '/TilesImages/300x300.jpg',
            fallback: '/TilesImages/300x300.jpg',
            alt: 'Tile 300x300',
          },
        ],
      },
      {
        name: '300x450',
        images: [
          {
            src: '/TilesImages/300x450.jpg',
            fallback: '/TilesImages/300x450.jpg',
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
        src: '/TilesImages/300x600.jpg',
        fallback: '/TilesImages/300x600.jpg',
        alt: 'Medium Tiles 300x600',
      },
    ],
    sizes: [
      {
        name: '300x600',
        images: [
          {
            src: '/TilesImages/300x600.jpg',
            fallback: '/TilesImages/300x600.jpg',
            alt: 'Tile 300x600',
          },
        ],
      },
      {
        name: '400x400',
        images: [
          {
            src: '/TilesImages/400x400.png',
            fallback: '/TilesImages/400x400.png',
            alt: 'Tile 400x400',
          },
        ],
      },
      {
        name: '500x500',
        images: [
          {
            src: '/TilesImages/500x500.png',
            fallback: '/TilesImages/500x500.png',
            alt: 'Tile 500x500',
          },
        ],
      },
      {
        name: '600x600',
        images: [
          {
            src: '/TilesImages/600x600.jpg',
            fallback: '/TilesImages/600x600.jpg',
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
        src: '/TilesImages/600x1200.jpg',
        fallback: '/TilesImages/600x1200.jpg',
        alt: 'Large Tiles 600x1200',
      },
    ],
    sizes: [
      {
        name: '600x1200',
        images: [
          {
            src: '/TilesImages/600x1200.jpg',
            fallback: '/TilesImages/600x1200.jpg',
            alt: 'Tile 600x1200',
          },
        ],
      },
      {
        name: '800x1600',
        images: [
          {
            src: '/TilesImages/800x1600.jpg',
            fallback: '/TilesImages/800x1600.jpg',
            alt: 'Tile 800x1600',
          },
        ],
      },
      {
        name: '800x2400',
        images: [
          {
            src: '/TilesImages/800x2400.jpg',
            fallback: '/TilesImages/800x2400.jpg',
            alt: 'Tile 800x2400',
          },
        ],
      },
      {
        name: '200x1200',
        images: [
          {
            src: '/TilesImages/200x1200.jpg',
            fallback: '/TilesImages/200x1200.jpg',
            alt: 'Tile 200x1200',
          },
        ],
      },
      {
        name: '300x1200',
        images: [
          {
            src: '/TilesImages/300x1200.jpg',
            fallback: '/TilesImages/300x1200.jpg',
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
        src: '/TilesImages/800x3000.jpg',
        fallback: '/TilesImages/800x3000.jpg',
        alt: 'Extra Large Tiles 800x3000',
      },
    ],
    sizes: [
      {
        name: '800x3000',
        images: [
          {
            src: '/TilesImages/800x3000.jpg',
            fallback: '/TilesImages/800x3000.jpg',
            alt: 'Tile 800x3000',
          },
        ],
      },
      {
        name: '1200x1600',
        images: [
          {
            src: '/TilesImages/1200x1600.jpg',
            fallback: '/TilesImages/1200x1600.jpg',
            alt: 'Tile 1200x1600',
          },
        ],
      },
      {
        name: '1200x2400',
        images: [
          {
            src: '/TilesImages/1200x2400.jpg',
            fallback: '/TilesImages/1200x2400.jpg',
            alt: 'Tile 1200x2400',
          },
        ],
      },
      {
        name: '1200x3200',
        images: [
          {
            src: '/TilesImages/1200x3200.jpg',
            fallback: '/TilesImages/1200x3200.jpg',
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
        src: '/TilesImages/600x600 full body.jpg',
        fallback: '/TilesImages/600x600 full body.jpg',
        alt: 'Full Body Tiles 600x600',
      },
    ],
    sizes: [
      {
        name: '600x600',
        images: [
          {
            src: '/TilesImages/600x600 full body.jpg',
            fallback: '/TilesImages/600x600 full body.jpg',
            alt: 'Full Body Tile 600x600',
          },
        ],
      },
      {
        name: '600x1200',
        images: [
          {
            src: '/TilesImages/600x1200 full body.jpg',
            fallback: '/TilesImages/600x1200 full body.jpg',
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
    id: 'marble-coming-soon',
    name: 'Marble Collection',
    sizeRange: 'Coming Soon',
    description: 'Premium marble and stone collection coming soon. Stay tuned for our exquisite natural stone offerings.',
    images: [
      {
        src: '/TilesImages/300x300.jpg', // Placeholder image
        fallback: '/TilesImages/300x300.jpg',
        alt: 'Marble Collection Coming Soon',
      },
    ],
    sizes: [
      {
        name: 'Coming Soon',
        images: [
          {
            src: '/TilesImages/300x300.jpg', // Placeholder
            fallback: '/TilesImages/300x300.jpg',
            alt: 'Marble sizes coming soon',
          },
        ],
      },
    ]
  },
];
