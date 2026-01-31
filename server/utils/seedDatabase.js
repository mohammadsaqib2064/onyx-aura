import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const seedProducts = [
  {
    name: 'Titan Apex Pro',
    price: '$29,900',
    image: 'https://example.com/spot1.jpg',
    images: ['https://example.com/spot1.jpg'],
    category: 'Spotlight',
    description: 'Premium flagship watch with bold luxury appeal',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Titanium',
      caseDiameter: '42mm',
      waterResistance: '100m',
      warranty: '5 Years',
      powerReserve: '72 hours',
    },
    height: 'tall',
  },
  {
    name: 'Orion Prime',
    price: '$32,500',
    image: 'https://example.com/spot2.jpg',
    images: ['https://example.com/spot2.jpg'],
    category: 'Spotlight',
    description: 'High-end executive watch for elite professionals',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Ceramic',
      caseDiameter: '43mm',
      waterResistance: '150m',
      warranty: '5 Years',
      powerReserve: '70 hours',
    },
    height: 'tall',
  },
  {
    name: 'Royal Chronos',
    price: '$35,000',
    image: 'https://example.com/spot3.jpg',
    images: ['https://example.com/spot3.jpg'],
    category: 'Spotlight',
    description: 'Luxury chronograph with royal finishing',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Gold Plated Steel',
      caseDiameter: '44mm',
      waterResistance: '100m',
      warranty: '5 Years',
      powerReserve: '72 hours',
    },
    height: 'tall',
  },
  {
    name: 'Phantom X',
    price: '$28,700',
    image: 'https://example.com/spot4.jpg',
    images: ['https://example.com/spot4.jpg'],
    category: 'Spotlight',
    description: 'Stealth black watch with modern dominance',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Ceramic',
      caseDiameter: '42mm',
      waterResistance: '100m',
      warranty: '4 Years',
      powerReserve: '68 hours',
    },
    height: 'tall',
  },
  {
    name: 'Ocean Master Pro',
    price: '$34,200',
    image: 'https://example.com/spot5.jpg',
    images: ['https://example.com/spot5.jpg'],
    category: 'Spotlight',
    description: 'Professional deep-sea diving watch',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Titanium',
      caseDiameter: '45mm',
      waterResistance: '300m',
      warranty: '5 Years',
      powerReserve: '72 hours',
    },
    height: 'tall',
  },
  {
    name: 'Lunar Supreme',
    price: '$31,800',
    image: 'https://example.com/spot6.jpg',
    images: ['https://example.com/spot6.jpg'],
    category: 'Spotlight',
    description: 'Space-inspired futuristic luxury watch',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Carbon Fiber',
      caseDiameter: '43mm',
      waterResistance: '120m',
      warranty: '5 Years',
      powerReserve: '70 hours',
    },
    height: 'tall',
  },
  {
    name: 'Imperial Crown',
    price: '$38,900',
    image: 'https://example.com/spot7.jpg',
    images: ['https://example.com/spot7.jpg'],
    category: 'Spotlight',
    description: 'Ultra-luxury masterpiece with heritage design',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Platinum Coated',
      caseDiameter: '41mm',
      waterResistance: '100m',
      warranty: '6 Years',
      powerReserve: '75 hours',
    },
    height: 'tall',
  },
  {
    name: 'Nova Classic',
    price: '$18,500',
    image: 'https://example.com/col1.jpg',
    images: ['https://example.com/col1.jpg'],
    category: 'Collection',
    description: 'Minimal everyday luxury watch',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Stainless Steel',
      caseDiameter: '40mm',
      waterResistance: '50m',
      warranty: '3 Years',
      powerReserve: '48 hours',
    },
    height: 'tall',
  },
  {
    name: 'Skyline Urban',
    price: '$14,900',
    image: 'https://example.com/col2.jpg',
    images: ['https://example.com/col2.jpg'],
    category: 'Collection',
    description: 'Modern urban-style timepiece',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Aluminum',
      caseDiameter: '40mm',
      waterResistance: '50m',
      warranty: '2 Years',
      powerReserve: '42 hours',
    },
    height: 'tall',
  },
  {
    name: 'Vintage Crown',
    price: '$17,300',
    image: 'https://example.com/col3.jpg',
    images: ['https://example.com/col3.jpg'],
    category: 'Collection',
    description: 'Vintage-inspired classic watch',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Bronze',
      caseDiameter: '39mm',
      waterResistance: '50m',
      warranty: '3 Years',
      powerReserve: '48 hours',
    },
    height: 'tall',
  },
  {
    name: 'Falcon Racer',
    price: '$23,800',
    image: 'https://example.com/col4.jpg',
    images: ['https://example.com/col4.jpg'],
    category: 'Collection',
    description: 'Racing chronograph with sporty look',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Stainless Steel',
      caseDiameter: '43mm',
      waterResistance: '100m',
      warranty: '4 Years',
      powerReserve: '70 hours',
    },
    height: 'tall',
  },
  {
    name: 'Glacier Ice',
    price: '$15,700',
    image: 'https://example.com/col5.jpg',
    images: ['https://example.com/col5.jpg'],
    category: 'Collection',
    description: 'Clean and cool modern watch',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Stainless Steel',
      caseDiameter: '40mm',
      waterResistance: '50m',
      warranty: '3 Years',
      powerReserve: '46 hours',
    },
    height: 'tall',
  },
  {
    name: 'Desert Storm',
    price: '$20,900',
    image: 'https://example.com/col6.jpg',
    images: ['https://example.com/col6.jpg'],
    category: 'Collection',
    description: 'Rugged watch for harsh environments',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Titanium',
      caseDiameter: '44mm',
      waterResistance: '200m',
      warranty: '5 Years',
      powerReserve: '72 hours',
    },
    height: 'tall',
  },
  {
    name: 'Classic Heritage',
    price: '$13,900',
    image: 'https://example.com/col7.jpg',
    images: ['https://example.com/col7.jpg'],
    category: 'Collection',
    description: 'Affordable classic luxury watch',
    specifications: {
      movement: 'Swiss Automatic',
      caseMaterial: 'Stainless Steel',
      caseDiameter: '39mm',
      waterResistance: '50m',
      warranty: '2 Years',
      powerReserve: '40 hours',
    },
    height: 'tall',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/onyx_aura');
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const products = await Product.insertMany(seedProducts);
    console.log(`✅ Seeded ${products.length} products`);

    const adminUser = await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@onyxaura.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@321@',
      role: 'admin',
    });
    console.log(`✅ Created admin user: ${adminUser.email}`);

    const demoUser = await User.create({
      email: 'demo@onyxaura.com',
      password: 'demo123',
      role: 'demo',
    });
    console.log(`✅ Created demo admin user: ${demoUser.email}`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
