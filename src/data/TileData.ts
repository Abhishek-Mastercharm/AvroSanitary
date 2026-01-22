// TileData.ts
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
  images: TileImg[];
  sizes: TileSize[];
};

export const tileCategories: TileCategory[] = [
  {
    id: 'mosaic',
    name: 'Mosaic Tiles',
    sizeRange: '10mm x 10mm - 50mm x 50mm',
    description: 'Small, intricate tiles perfect for detailed designs',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
        fallback: '/tiles/mosaic/preview-1.jpg',
        alt: 'Mosaic tile texture 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80',
        fallback: '/tiles/mosaic/preview-2.jpg',
        alt: 'Mosaic tile texture 2',
      },
      {
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
        fallback: '/tiles/mosaic/preview-3.jpg',
        alt: 'Mosaic tile texture 3',
      },
    ],
    sizes: [
      {
        name: '10mm x 10mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/mosaic/10x10-1.jpg',
            alt: 'Mosaic tile 10x10',
          },
          {
            src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/mosaic/10x10-2.jpg',
            alt: 'Mosaic tile 10x10 pattern',
          },
        ],
      },
      {
        name: '20mm x 20mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/mosaic/20x20-1.jpg',
            alt: 'Mosaic tile 20x20',
          },
          {
            src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/mosaic/20x20-2.jpg',
            alt: 'Mosaic tile 20x20 detail',
          },
        ],
      },
      {
        name: '50mm x 50mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/mosaic/50x50-1.jpg',
            alt: 'Mosaic tile 50x50',
          },
          {
            src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/mosaic/50x50-2.jpg',
            alt: 'Mosaic tile 50x50 texture',
          },
        ],
      },
    ]
  },
  {
    id: 'small-wall',
    name: 'Small Wall Tiles',
    sizeRange: '100mm x 100mm - 200mm x 200mm',
    description: 'Versatile tiles for interior walls',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=600&q=80',
        fallback: '/tiles/small-wall/preview-1.jpg',
        alt: 'Small wall tile texture 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
        fallback: '/tiles/small-wall/preview-2.jpg',
        alt: 'Small wall tile texture 2',
      },
      {
        src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80',
        fallback: '/tiles/small-wall/preview-3.jpg',
        alt: 'Small wall tile texture 3',
      },
    ],
    sizes: [
      {
        name: '100mm x 100mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/small-wall/100x100-1.jpg',
            alt: 'Wall tile 100x100',
          },
          {
            src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/small-wall/100x100-2.jpg',
            alt: 'Wall tile 100x100 finish',
          },
        ],
      },
      {
        name: '150mm x 150mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/small-wall/150x150-1.jpg',
            alt: 'Wall tile 150x150',
          },
          {
            src: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/small-wall/150x150-2.jpg',
            alt: 'Wall tile 150x150 texture',
          },
        ],
      },
      {
        name: '200mm x 200mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/small-wall/200x200-1.jpg',
            alt: 'Wall tile 200x200',
          },
          {
            src: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/small-wall/200x200-2.jpg',
            alt: 'Wall tile 200x200 pattern',
          },
        ],
      },
    ]
  },
  {
    id: 'medium',
    name: 'Medium Tiles',
    sizeRange: '300mm x 300mm - 400mm x 400mm',
    description: 'Standard format tiles for floors and walls',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
        fallback: '/tiles/medium/preview-1.jpg',
        alt: 'Medium format floor tile 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=600&q=80',
        fallback: '/tiles/medium/preview-2.jpg',
        alt: 'Medium format tile 2',
      },
      {
        src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=80',
        fallback: '/tiles/medium/preview-3.jpg',
        alt: 'Medium format tile texture 3',
      },
    ],
    sizes: [
      {
        name: '300mm x 300mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/medium/300x300-1.jpg',
            alt: 'Tile 300x300',
          },
          {
            src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80',
            fallback: '/tiles/medium/300x300-2.jpg',
            alt: 'Tile 300x300 finish',
          },
        ],
      },
      {
        name: '300mm x 600mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80',
            fallback: '/tiles/medium/300x600-1.jpg',
            alt: 'Tile 300x600',
          },
          {
            src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
            fallback: '/tiles/medium/300x600-2.jpg',
            alt: 'Tile 300x600 texture',
          },
        ],
      },
      {
        name: '400mm x 400mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80',
            fallback: '/tiles/medium/400x400-1.jpg',
            alt: 'Tile 400x400',
          },
          {
            src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80',
            fallback: '/tiles/medium/400x400-2.jpg',
            alt: 'Tile 400x400 pattern',
          },
        ],
      },
    ]
  },
  {
    id: 'large-format',
    name: 'Large Format Tiles',
    sizeRange: '600mm x 600mm - 800mm x 800mm',
    description: 'Modern large tiles for spacious areas',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80',
        fallback: '/tiles/large-format/preview-1.jpg',
        alt: 'Large format tile 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=700&q=80',
        fallback: '/tiles/large-format/preview-2.jpg',
        alt: 'Large format tile 2',
      },
      {
        src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80',
        fallback: '/tiles/large-format/preview-3.jpg',
        alt: 'Large format tile 3',
      },
    ],
    sizes: [
      {
        name: '600mm x 600mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
            fallback: '/tiles/large-format/600x600-1.jpg',
            alt: 'Tile 600x600',
          },
          {
            src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80',
            fallback: '/tiles/large-format/600x600-2.jpg',
            alt: 'Tile 600x600 finish',
          },
        ],
      },
      {
        name: '600mm x 1200mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1100&q=80',
            fallback: '/tiles/large-format/600x1200-1.jpg',
            alt: 'Tile 600x1200',
          },
          {
            src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=80',
            fallback: '/tiles/large-format/600x1200-2.jpg',
            alt: 'Tile 600x1200 texture',
          },
        ],
      },
      {
        name: '800mm x 800mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1000&q=80',
            fallback: '/tiles/large-format/800x800-1.jpg',
            alt: 'Tile 800x800',
          },
          {
            src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=80',
            fallback: '/tiles/large-format/800x800-2.jpg',
            alt: 'Tile 800x800 pattern',
          },
        ],
      },
    ]
  },
  {
    id: 'slab',
    name: 'Slab Tiles',
    sizeRange: '1200mm x 2400mm and above',
    description: 'Premium large format slabs for luxury spaces',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
        fallback: '/tiles/slab/preview-1.jpg',
        alt: 'Slab tile texture 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=900&q=80',
        fallback: '/tiles/slab/preview-2.jpg',
        alt: 'Slab tile texture 2',
      },
      {
        src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
        fallback: '/tiles/slab/preview-3.jpg',
        alt: 'Slab tile texture 3',
      },
    ],
    sizes: [
      {
        name: '1200mm x 2400mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80',
            fallback: '/tiles/slab/1200x2400-1.jpg',
            alt: 'Slab tile 1200x2400',
          },
          {
            src: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1400&q=80',
            fallback: '/tiles/slab/1200x2400-2.jpg',
            alt: 'Slab tile 1200x2400 finish',
          },
        ],
      },
      {
        name: '1200mm x 2600mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1500&q=80',
            fallback: '/tiles/slab/1200x2600-1.jpg',
            alt: 'Slab tile 1200x2600',
          },
          {
            src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=80',
            fallback: '/tiles/slab/1200x2600-2.jpg',
            alt: 'Slab tile 1200x2600 texture',
          },
        ],
      },
      {
        name: '1600mm x 3200mm',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1600&q=80',
            fallback: '/tiles/slab/1600x3200-1.jpg',
            alt: 'Slab tile 1600x3200',
          },
          {
            src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
            fallback: '/tiles/slab/1600x3200-2.jpg',
            alt: 'Slab tile 1600x3200 finish',
          },
        ],
      },
    ]
  },
];

// Add Marble & Stones categories
export const marbleCategories: TileCategory[] = [
{
  id: 'granite',
  name: 'Granite Stones',
  sizeRange: '20mm - 100mm thickness',
  description: 'Natural granite stones for countertops and flooring',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/granite/preview-1.jpg',
      alt: 'Granite stone texture 1',
    },
    {
      src: 'https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/granite/preview-2.jpg',
      alt: 'Granite stone texture 2',
    },
    {
      src: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/granite/preview-3.jpg',
      alt: 'Granite stone polished',
    },
  ],
  sizes: [
    {
      name: '20mm Thickness',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/granite/20mm-1.jpg',
          alt: '20mm granite slab',
        },
        {
          src: 'https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/granite/20mm-2.jpg',
          alt: '20mm granite finish',
        },
      ],
    },
    {
      name: '30mm Thickness',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/granite/30mm-1.jpg',
          alt: '30mm granite slab',
        },
        {
          src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/granite/30mm-2.jpg',
          alt: '30mm granite texture',
        },
      ],
    },
  ]
},
{
  id: 'marble',
  name: 'Premium Marble',
  sizeRange: 'Various sizes and thickness',
  description: 'Luxury marble for elegant interiors',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/premium/preview-1.jpg',
      alt: 'Premium marble texture 1',
    },
    {
      src: 'https://images.unsplash.com/photo-1551021456-dd23a3ed30b2?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/premium/preview-2.jpg',
      alt: 'Premium marble texture 2',
    },
    {
      src: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/premium/preview-3.jpg',
      alt: 'Premium marble veins',
    },
  ],
  sizes: [
    {
      name: 'Standard Slabs',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/premium/standard-1.jpg',
          alt: 'Standard marble slab',
        },
        {
          src: 'https://images.unsplash.com/photo-1551021456-dd23a3ed30b2?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/premium/standard-2.jpg',
          alt: 'Standard marble finish',
        },
      ],
    },
    {
      name: 'Custom Sizes',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/premium/custom-1.jpg',
          alt: 'Custom marble cut',
        },
        {
          src: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/premium/custom-2.jpg',
          alt: 'Custom marble design',
        },
      ],
    },
  ]
},
{
  id: 'quartz',
  name: 'Quartz Stones',
  sizeRange: 'Engineered quartz surfaces',
  description: 'Durable and non-porous quartz for modern spaces',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/quartz/preview-1.jpg',
      alt: 'Quartz stone texture 1',
    },
    {
      src: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/quartz/preview-2.jpg',
      alt: 'Quartz stone texture 2',
    },
    {
      src: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/quartz/preview-3.jpg',
      alt: 'Quartz countertop',
    },
  ],
  sizes: [
    {
      name: 'Quartz Slabs',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/quartz/slab-1.jpg',
          alt: 'Quartz slab',
        },
        {
          src: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/quartz/slab-2.jpg',
          alt: 'Quartz slab finish',
        },
      ],
    },
    {
      name: 'Quartz Tiles',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/quartz/tile-1.jpg',
          alt: 'Quartz tile',
        },
        {
          src: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/quartz/tile-2.jpg',
          alt: 'Quartz tile pattern',
        },
      ],
    },
  ]
},
{
  id: 'limestone',
  name: 'Limestone',
  sizeRange: 'Natural limestone for rustic appeal',
  description: 'Warm-toned limestone perfect for traditional settings',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/limestone/preview-1.jpg',
      alt: 'Limestone texture 1',
    },
    {
      src: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/limestone/preview-2.jpg',
      alt: 'Limestone texture 2',
    },
    {
      src: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/limestone/preview-3.jpg',
      alt: 'Limestone natural',
    },
  ],
  sizes: [
    {
      name: 'Limestone Tiles',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/limestone/tile-1.jpg',
          alt: 'Limestone tile',
        },
        {
          src: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/limestone/tile-2.jpg',
          alt: 'Limestone tile finish',
        },
      ],
    },
    {
      name: 'Limestone Slabs',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/limestone/slab-1.jpg',
          alt: 'Limestone slab',
        },
        {
          src: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/limestone/slab-2.jpg',
          alt: 'Limestone slab texture',
        },
      ],
    },
  ]
},
{
  id: 'travertine',
  name: 'Travertine',
  sizeRange: 'Classic travertine for timeless elegance',
  description: 'Porous stone with natural beauty for indoor/outdoor use',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/travertine/preview-1.jpg',
      alt: 'Travertine texture 1',
    },
    {
      src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/travertine/preview-2.jpg',
      alt: 'Travertine texture 2',
    },
    {
      src: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=600&q=80',
      fallback: '/marble/travertine/preview-3.jpg',
      alt: 'Travertine floor',
    },
  ],
  sizes: [
    {
      name: 'Travertine Tiles',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/travertine/tile-1.jpg',
          alt: 'Travertine tile',
        },
        {
          src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/travertine/tile-2.jpg',
          alt: 'Travertine tile finish',
        },
      ],
    },
    {
      name: 'Travertine Pavers',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/travertine/paver-1.jpg',
          alt: 'Travertine paver',
        },
        {
          src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
          fallback: '/marble/travertine/paver-2.jpg',
          alt: 'Travertine paver texture',
        },
      ],
    },
  ]
},
];

// Export type alias for marble categories (same structure as tiles)
export type MarbleCategory = TileCategory;