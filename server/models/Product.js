import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: {
    type: String,
    required: [true, 'Price is required'],
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
  },
  images: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Collection', 'Spotlight'],
    default: 'Collection',
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  specifications: {
    movement: String,
    caseMaterial: String,
    caseDiameter: String,
    waterResistance: String,
    warranty: String,
    powerReserve: String,
  },
  height: {
    type: String,
    enum: ['medium', 'tall'],
    default: 'medium',
  },
}, {
  timestamps: true,
});

productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
