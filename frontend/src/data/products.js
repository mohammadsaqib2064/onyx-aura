export const searchProducts = (query, products = []) => {
  if (!query || query.trim() === '' || !products || products.length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
  return products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchTerm);
    const descriptionMatch = product.description?.toLowerCase().includes(searchTerm);
    const categoryMatch = product.category?.toLowerCase().includes(searchTerm);
    
    const words = searchTerm.split(' ');
    const nameWords = product.name.toLowerCase().split(' ');
    const descriptionWords = (product.description || '').toLowerCase().split(' ');
    
    const wordMatch = words.some(word => 
      nameWords.some(nw => nw.startsWith(word) || nw.includes(word)) ||
      descriptionWords.some(dw => dw.startsWith(word) || dw.includes(word))
    );
    
    return nameMatch || descriptionMatch || categoryMatch || wordMatch;
  });
};

export const allProducts = [
  {
    id: 1,
    name: 'Midnight Serenity',
    price: '$26,800',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    category: 'Collection',
    description: 'Crafted with precision and elegance',
  },
  {
    id: 2,
    name: 'Eternal Shadow',
    price: '$30,200',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
    category: 'Collection',
    description: 'A masterpiece of horological artistry',
  },
  {
    id: 3,
    name: 'Noir Essence',
    price: '$27,500',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80',
    category: 'Collection',
    description: 'Elegant design meets exceptional performance',
  },
  {
    id: 4,
    name: 'Velvet Eclipse',
    price: '$29,900',
    image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800&q=80',
    category: 'Collection',
    description: 'A statement piece that commands attention',
  },
  {
    id: 5,
    name: 'Obsidian Crown',
    price: '$35,000',
    image: 'https://images.unsplash.com/photo-1518687337097-5a47d0f1d5a3?w=800&q=80',
    category: 'Collection',
    description: 'The pinnacle of luxury watchmaking',
  },
  {
    id: 6,
    name: 'Carbon Legacy',
    price: '$28,500',
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80',
    category: 'Collection',
    description: 'Modern innovation meets classic elegance',
  },
  {
    id: 7,
    name: 'Onyx Eclipse',
    price: '$24,500',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
    category: 'Spotlight',
    description: 'Dark elegance redefined',
  },
  {
    id: 8,
    name: 'Aura Midnight',
    price: '$28,900',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    category: 'Spotlight',
    description: 'Timeless sophistication',
  },
  {
    id: 9,
    name: 'Obsidian Legacy',
    price: '$32,000',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80',
    category: 'Spotlight',
    description: 'Heritage meets innovation',
  },
];
