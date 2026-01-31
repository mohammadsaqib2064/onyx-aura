import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-obsidian/90 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-charcoal border border-gold/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-gold transition-colors z-10"
                data-cursor-hover
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
                <div className="relative h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] overflow-hidden order-1 bg-charcoal">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center space-y-4 sm:space-y-6 order-2">
                  <div>
                    <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gold text-xl xs:text-2xl sm:text-2xl md:text-3xl font-light mb-3 sm:mb-4">
                      {product.price}
                    </p>
                    <p className="text-white/70 text-xs xs:text-sm sm:text-sm md:text-base leading-relaxed">
                      {product.description || 'Crafted with precision and elegance, this timepiece embodies the essence of luxury. Each detail is meticulously designed to reflect timeless sophistication and uncompromising quality.'}
                    </p>
                  </div>

                  <div className="border-t border-gold/20 pt-6">
                    <h3 className="font-serif text-xl text-gold mb-4">Specifications</h3>
                    <div className="space-y-2 text-sm text-white/70">
                      <div className="flex justify-between">
                        <span>Movement:</span>
                        <span className="text-white">Swiss Automatic</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Case Material:</span>
                        <span className="text-white">Titanium</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Water Resistance:</span>
                        <span className="text-white">100m</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Warranty:</span>
                        <span className="text-white">5 Years</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleAddToCart}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gold text-obsidian font-sans text-xs sm:text-sm uppercase tracking-widest font-semibold hover:bg-gold/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor-hover
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
