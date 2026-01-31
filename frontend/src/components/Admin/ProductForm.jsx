import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: 'Collection',
    description: '',
    movement: '',
    caseMaterial: '',
    caseDiameter: '',
    waterResistance: '',
    warranty: '',
    powerReserve: '',
    height: 'medium',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        image: product.image || '',
        category: product.category || 'Collection',
        description: product.description || '',
        movement: product.specifications?.movement || '',
        caseMaterial: product.specifications?.caseMaterial || '',
        caseDiameter: product.specifications?.caseDiameter || '',
        waterResistance: product.specifications?.waterResistance || '',
        warranty: product.specifications?.warranty || '',
        powerReserve: product.specifications?.powerReserve || '',
        height: product.height || 'medium',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.price || !formData.price.trim()) {
      newErrors.price = 'Price is required';
    }
    if (!formData.image || !formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }
    if (!formData.category || !formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (!formData.description || !formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const { movement, caseMaterial, caseDiameter, waterResistance, warranty, powerReserve, ...mainData } = formData;
    
    const productData = {
      name: mainData.name.trim(),
      price: mainData.price.trim(),
      image: mainData.image.trim(),
      images: mainData.image.trim() ? [mainData.image.trim()] : [],
      category: mainData.category.trim(),
      description: mainData.description.trim(),
      height: mainData.height || 'medium',
      specifications: {
        movement: movement || '',
        caseMaterial: caseMaterial || '',
        caseDiameter: caseDiameter || '',
        waterResistance: waterResistance || '',
        warranty: warranty || '',
        powerReserve: powerReserve || '',
      },
    };
    
    try {
      await onSubmit(productData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-serif text-xl text-gold mb-4">Basic Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-transparent border ${errors.name ? 'border-red-500' : 'border-gold/30'} text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors`}
              required
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Price *</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="$29,900"
              className={`w-full bg-transparent border ${errors.price ? 'border-red-500' : 'border-gold/30'} text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors`}
              required
            />
            {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className={`w-full bg-transparent border ${errors.image ? 'border-red-500' : 'border-gold/30'} text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors`}
              required
            />
            {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full bg-charcoal border ${errors.category ? 'border-red-500' : 'border-gold/30'} text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors cursor-pointer`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c5a47e' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.5rem',
                appearance: 'none',
              }}
              required
            >
              <option value="Collection" className="bg-charcoal text-white">Collection</option>
              <option value="Spotlight" className="bg-charcoal text-white">Spotlight</option>
            </select>
            {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Height</label>
            <select
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full bg-charcoal border border-gold/30 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c5a47e' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.5rem',
                appearance: 'none',
              }}
            >
              <option value="medium" className="bg-charcoal text-white">Medium</option>
              <option value="tall" className="bg-charcoal text-white">Tall</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-white/70 text-sm mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full bg-transparent border ${errors.description ? 'border-red-500' : 'border-gold/30'} text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none`}
            required
          />
          {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl text-gold mb-4">Specifications</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">Movement</label>
            <input
              type="text"
              name="movement"
              value={formData.movement}
              onChange={handleChange}
              placeholder="Swiss Automatic"
              className="w-full bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Case Material</label>
            <input
              type="text"
              name="caseMaterial"
              value={formData.caseMaterial}
              onChange={handleChange}
              placeholder="Titanium"
              className="w-full bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Case Diameter</label>
            <input
              type="text"
              name="caseDiameter"
              value={formData.caseDiameter}
              onChange={handleChange}
              placeholder="42mm"
              className="w-full bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Water Resistance</label>
            <input
              type="text"
              name="waterResistance"
              value={formData.waterResistance}
              onChange={handleChange}
              placeholder="100m"
              className="w-full bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Warranty</label>
            <input
              type="text"
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              placeholder="5 Years"
              className="w-full bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Power Reserve</label>
            <input
              type="text"
              name="powerReserve"
              value={formData.powerReserve}
              onChange={handleChange}
              placeholder="72 hours"
              className="w-full bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-8 py-4 bg-gold text-obsidian font-sans text-sm uppercase tracking-widest font-semibold hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          data-cursor-hover
        >
          {isSubmitting ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
        </motion.button>
        <motion.button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-8 py-4 border border-gold/30 text-gold font-sans text-sm uppercase tracking-widest hover:bg-gold/10 transition-colors disabled:opacity-50"
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          data-cursor-hover
        >
          Cancel
        </motion.button>
      </div>
    </form>
  );
};

export default ProductForm;
