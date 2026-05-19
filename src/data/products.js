const products = [
  {
    id: 1,
    handle: 'akira-vase',
    name: 'Akira Vase',
    category: 'Vases',
    material: 'Porcelain · Celadon Glaze',
    price: '620',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dc1c?w=600&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dc1c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578749556534-5d6a5c0e24b7?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514222709107-a180c68f54fe?w=1200&q=85&auto=format&fit=crop',
    ],
    caption: 'A sculptural silhouette inspired by Japanese ink painting.',
    description:
      'The Akira Vase draws from the quiet power of sumi-e brushstrokes — each curve flowing with the same intentional grace. Hand-thrown on the wheel from porcelain and finished in a soft celadon glaze, it stands as a meditative object for the modern home.',
    details: ['Hand-thrown porcelain', 'Celadon glaze finish', 'Height: 32cm · Width: 18cm', 'Fired at 1280°C', 'Limited batch of 50'],
  },
  {
    id: 2,
    handle: 'noir-bowl',
    name: 'Noir Bowl',
    category: 'Bowls',
    material: 'Stoneware · Matte Black',
    price: '340',
    image: 'https://images.unsplash.com/photo-1578749556534-5d6a5c0e24b7?w=600&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578749556534-5d6a5c0e24b7?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603199506016-b9a594b593e6?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610701596007-11502861dc1c?w=1200&q=85&auto=format&fit=crop',
    ],
    caption: 'Deep black ceramic with a velvety matte finish.',
    description:
      'The Noir Bowl embraces darkness as a material virtue. Crafted from coarse stoneware and fired in a reduction kiln, its matte black surface absorbs light rather than reflects it — revealing a texture that begs to be touched.',
    details: ['Hand-coiled stoneware', 'Matte black reduction glaze', 'Diameter: 24cm · Depth: 10cm', 'Food-safe', 'Each piece varies subtly'],
  },
  {
    id: 3,
    handle: 'sora-cup',
    name: 'Sora Cup',
    category: 'Drinkware',
    material: 'Porcelain · Celadon',
    price: '180',
    image: 'https://images.unsplash.com/photo-1514222709107-a180c68f54fe?w=600&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1514222709107-a180c68f54fe?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610701596007-11502861dc1c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603199506016-b9a594b593e6?w=1200&q=85&auto=format&fit=crop',
    ],
    caption: 'Delicate transparency meets quiet strength in every sip.',
    description:
      'Sora — sky in Japanese — captures the ethereal quality of morning light through translucent porcelain. Thin enough to feel the warmth of tea through the walls, yet strong enough for daily ritual.',
    details: ['Thin-walled porcelain', 'Translucent celadon glaze', 'Height: 9cm · Capacity: 280ml', 'Dishwasher safe', 'Set of two'],
  },
  {
    id: 4,
    handle: 'terra-plate',
    name: 'Terra Plate',
    category: 'Serving',
    material: 'Terracotta · Hand-painted',
    price: '280',
    image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593e6?w=600&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1603199506016-b9a594b593e6?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514222709107-a180c68f54fe?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578749556534-5d6a5c0e24b7?w=1200&q=85&auto=format&fit=crop',
    ],
    caption: 'Earthy tones painted by hand in our Kyoto atelier.',
    description:
      'The Terra Plate celebrates the raw beauty of natural terracotta. Each piece is hand-painted with mineral pigments in our Kyoto atelier, resulting in a surface that feels ancient yet entirely contemporary.',
    details: ['Hand-pressed terracotta', 'Mineral pigment painting', 'Diameter: 28cm', 'Food-safe sealant', 'Hand-wash recommended'],
  },
  {
    id: 5,
    handle: 'kumo-pitcher',
    name: 'Kumo Pitcher',
    category: 'Serving',
    material: 'Porcelain · Cloud White',
    price: '480',
    image: 'https://images.unsplash.com/photo-1602419231015-0fa36e4be4bc?w=600&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1602419231015-0fa36e4be4bc?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610701596007-11502861dc1c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514222709107-a180c68f54fe?w=1200&q=85&auto=format&fit=crop',
    ],
    caption: 'Cloud-like porcelain with an effortless pour.',
    description:
      'Kumo — cloud in Japanese — captures lightness in solid form. Its generous body tapers to a精准 spout designed for a clean, drip-free pour. A sculptural object that transforms the everyday act of serving water into a ceremony.',
    details: ['Hand-thrown porcelain', 'Cloud white glaze', 'Height: 26cm · Capacity: 1.2L', 'Ergonomic handle', 'Dishwasher safe'],
  },
  {
    id: 6,
    handle: 'raku-incense-holder',
    name: 'Raku Incense Holder',
    category: 'Objects',
    material: 'Raku · Gold Leaf Accent',
    price: '220',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578749556534-5d6a5c0e24b7?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602419231015-0fa36e4be4bc?w=1200&q=85&auto=format&fit=crop',
    ],
    caption: 'Raku-fired with 24k gold leaf detail.',
    description:
      'The Raku Incense Holder is a study in opposites — rough crackled glaze against polished gold, organic form against refined detail. Each piece is pull from the kiln red-hot and cooled in sawdust, creating unpredictable patterns that make every holder unique.',
    details: ['Raku firing technique', '24k gold leaf accent', 'Height: 8cm · Width: 12cm', 'Includes 10 incense sticks', 'Each piece is unique'],
  },
]

export default products
