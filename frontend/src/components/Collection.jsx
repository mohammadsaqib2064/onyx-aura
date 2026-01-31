import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import QuickViewModal from './QuickViewModal';
import LoadingSpinner from './LoadingSpinner';

const Collection = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const navigate = useNavigate();
  const { products, loading, getProductsByCategory } = useProducts();
  
  const watches = getProductsByCategory('Collection');

  if (loading) {
    return (
      <section id="collection" className="relative py-32 px-4 md:px-8 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section id="collection" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12 sm:mb-16 md:mb-24 ml-0 md:ml-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white font-light mb-3 sm:mb-4">
            Curated
            <br />
            <span className="text-gold">Collection</span>
          </h2>
          <div className="w-20 sm:w-24 h-px bg-gold mt-4 sm:mt-6" />
        </motion.div>

        {watches.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60">No products in collection yet.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {watches.map((watch, index) => {
            const watchId = watch.id || watch._id;
            if (!watchId) return null;
            const isHovered = hoveredId === watchId;
            
            return (
            <motion.div
              key={watchId}
              className="relative group cursor-pointer overflow-hidden break-inside-avoid mb-6 md:mb-8 rounded-sm"
              onMouseEnter={() => setHoveredId(watchId)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => navigate(`/product/${watchId}`)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-cursor-hover
            >
              <div className={`relative overflow-hidden rounded-sm ${
                watch.height === 'tall' ? 'h-[700px]' : 'h-[500px]'
              }`}>
                {watch.image ? (
                  <motion.img
                    src={watch.image}
                    alt={watch.name || 'Watch'}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                ) : (
                  <div className="w-full h-full bg-charcoal flex items-center justify-center text-white/20">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent"
                  animate={{
                    opacity: isHovered ? 0.9 : 0.6,
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                <motion.div
                  className="absolute inset-0 bg-gold/0"
                  animate={{
                    backgroundColor: isHovered ? 'rgba(197, 164, 126, 0.12)' : 'rgba(197, 164, 126, 0)',
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuickViewProduct({ 
                      ...watch, 
                      id: watchId,
                      description: 'Crafted with precision and elegance, this timepiece embodies the essence of luxury. Each detail is meticulously designed to reflect timeless sophistication and uncompromising quality.' 
                    });
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-3.5 border-2 border-gold text-gold font-sans text-sm uppercase tracking-widest bg-obsidian/95 backdrop-blur-md shadow-lg"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.8,
                    y: isHovered ? 0 : 20,
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ 
                    scale: 1.08,
                    borderColor: 'rgba(197, 164, 126, 1)',
                    backgroundColor: 'rgba(197, 164, 126, 0.2)',
                    color: '#ffffff',
                  }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor-hover
                >
                  Quick View
                </motion.button>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none"
                initial={{ y: 100, opacity: 0 }}
                animate={{
                  y: isHovered ? 0 : 100,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.h3
                  className="font-serif text-xl md:text-2xl text-white mb-2"
                  animate={{
                    color: isHovered ? '#c5a47e' : '#ffffff',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {watch.name || 'Watch'}
                </motion.h3>
                <motion.p
                  className="text-gold text-base md:text-lg font-light"
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {watch.price || '$0'}
                </motion.p>
              </motion.div>

              <motion.div
                className="absolute inset-0 border-2 border-gold/0 pointer-events-none rounded-sm"
                animate={{
                  borderColor: isHovered ? 'rgba(197, 164, 126, 0.4)' : 'rgba(197, 164, 126, 0)',
                  boxShadow: isHovered ? '0 0 40px rgba(197, 164, 126, 0.25)' : '0 0 0px rgba(197, 164, 126, 0)',
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.div>
            );
          })}
          </div>
        )}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};

export default Collection;
