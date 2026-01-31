import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-charcoal border-l border-gold/20 z-[101] shadow-2xl overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{ maxWidth: '500px' }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gold/20 flex-shrink-0">
                <h2 className="font-serif text-2xl text-gold">Shopping Cart</h2>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-gold transition-colors"
                  data-cursor-hover
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 min-h-0">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <svg className="w-16 h-16 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-white/60 text-sm">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const itemId = item.id || item._id;
                      if (!itemId) return null;
                      
                      return (
                        <motion.div
                          key={itemId}
                          className="flex gap-4 pb-4 border-b border-gold/10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-charcoal flex items-center justify-center">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name || 'Product'}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/20">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-serif text-white text-sm mb-1">{item.name || 'Product'}</h3>
                              <p className="text-gold text-sm">{item.price || '$0'}</p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(itemId, (item.quantity || 1) - 1)}
                                  className="w-6 h-6 flex items-center justify-center border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
                                  data-cursor-hover
                                >
                                  <span className="text-xs">−</span>
                                </button>
                                <span className="text-white text-sm w-8 text-center">{item.quantity || 1}</span>
                                <button
                                  onClick={() => updateQuantity(itemId, (item.quantity || 1) + 1)}
                                  className="w-6 h-6 flex items-center justify-center border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
                                  data-cursor-hover
                                >
                                  <span className="text-xs">+</span>
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(itemId)}
                                className="text-white/40 hover:text-gold transition-colors text-xs"
                                data-cursor-hover
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-gold/20 p-6 space-y-4 flex-shrink-0">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm uppercase tracking-wider">Total</span>
                    <span className="font-serif text-2xl text-gold">
                      ${getTotalPrice().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="block w-full px-8 py-4 bg-gold text-obsidian font-sans text-sm uppercase tracking-widest font-semibold hover:bg-gold/90 transition-colors text-center"
                    data-cursor-hover
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
