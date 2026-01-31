import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import QuickViewModal from './QuickViewModal';
import LoadingSpinner from './LoadingSpinner';

const Spotlight = () => {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const navigate = useNavigate();
  const { products, loading, getProductsByCategory } = useProducts();
  
  const featuredWatches = getProductsByCategory('Spotlight').slice(0, 3);
  
  useEffect(() => {
    if (containerRef.current) {
      const computedStyle = window.getComputedStyle(containerRef.current);
      if (computedStyle.position === 'static') {
        containerRef.current.style.position = 'relative';
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const parallax3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const parallaxTransforms = [parallax1, parallax2, parallax3];

  if (loading) {
    return (
      <section 
        id="heritage"
        className="relative py-32 px-4 md:px-8 overflow-hidden"
        style={{ backgroundColor: '#0a0a0a', position: 'relative' }}
      >
        <div className="max-w-7xl mx-auto">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section 
      id="heritage"
      ref={containerRef}
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden"
      style={{ backgroundColor: '#0a0a0a', position: 'relative' }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-charcoal via-obsidian to-charcoal transition-opacity duration-1000"
        animate={{
          opacity: hoveredIndex !== null ? 0.7 : 1,
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          style={{ y, opacity }}
          className="mb-12 sm:mb-16 md:mb-24"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-gold font-light mb-3 sm:mb-4">
            Spotlight
          </h2>
          <div className="w-20 sm:w-24 h-px bg-gold" />
        </motion.div>

        {featuredWatches.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60">No featured products yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {featuredWatches.map((watch, index) => {
            const watchId = watch.id || watch._id;
            if (!watchId) return null;
            const isHovered = hoveredIndex === index;
            
            return (
            <motion.div
              key={watchId}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate(`/product/${watchId}`)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              data-cursor-hover
            >
              <motion.div
                className="relative h-[400px] md:h-[500px] overflow-hidden mb-6 rounded-sm"
                style={{
                  y: parallaxTransforms[index] || parallax1,
                }}
              >
                {watch.image ? (
                  <motion.img
                    src={watch.image}
                    alt={watch.name || 'Watch'}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: isHovered ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-full h-full bg-charcoal flex items-center justify-center text-white/20">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent"
                  animate={{
                    opacity: isHovered ? 0.8 : 0.6,
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                <motion.div
                  className="absolute inset-0 bg-gold/0"
                  animate={{
                    backgroundColor: isHovered ? 'rgba(197, 164, 126, 0.1)' : 'rgba(197, 164, 126, 0)',
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>

              <motion.div
                className="space-y-3"
                animate={{
                  y: isHovered ? -8 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.h3
                  className="font-serif text-2xl md:text-3xl text-white"
                  animate={{
                    color: isHovered ? '#c5a47e' : '#ffffff',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {watch.name || 'Watch'}
                </motion.h3>
                <motion.p
                  className="text-gold/70 text-xs md:text-sm uppercase tracking-wider"
                  animate={{
                    opacity: isHovered ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {watch.description || 'Luxury timepiece'}
                </motion.p>
                <motion.p
                  className="text-gold text-lg md:text-xl font-light"
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {watch.price || '$0'}
                </motion.p>
                
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuickViewProduct({ 
                      ...watch, 
                      id: watchId,
                      description: (watch.description || '') + '. Crafted with precision and elegance, this timepiece embodies the essence of luxury.' 
                    });
                  }}
                  className="mt-4 px-6 py-2.5 border border-gold/50 text-gold font-sans text-xs uppercase tracking-wider bg-obsidian/80 backdrop-blur-sm"
                  animate={{
                    opacity: isHovered ? 1 : 0.7,
                    borderColor: isHovered ? 'rgba(197, 164, 126, 0.8)' : 'rgba(197, 164, 126, 0.5)',
                    backgroundColor: isHovered ? 'rgba(10, 10, 10, 0.9)' : 'rgba(10, 10, 10, 0.8)',
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: 'rgba(197, 164, 126, 1)',
                    backgroundColor: 'rgba(197, 164, 126, 0.15)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  data-cursor-hover
                >
                  Quick View
                </motion.button>
              </motion.div>

              <motion.div
                className="absolute inset-0 border-2 border-gold/0 pointer-events-none rounded-sm"
                animate={{
                  borderColor: isHovered ? 'rgba(197, 164, 126, 0.4)' : 'rgba(197, 164, 126, 0)',
                  boxShadow: isHovered ? '0 0 30px rgba(197, 164, 126, 0.2)' : '0 0 0px rgba(197, 164, 126, 0)',
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

export default Spotlight;
