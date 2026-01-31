import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsOrderPlaced(true);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/')}
            className="text-gold hover:text-gold/70 transition-colors"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }


  return (
    <>
      <AnimatePresence>
        {isOrderPlaced && (
          <>
            <motion.div
              className="fixed inset-0 bg-obsidian/90 backdrop-blur-sm z-[200]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOrderPlaced(false);
                navigate('/');
              }}
            />

            <motion.div
              className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-charcoal border-2 border-gold/30 max-w-md w-full p-8 md:p-10 pointer-events-auto shadow-2xl"
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setIsOrderPlaced(false);
                    navigate('/');
                  }}
                  className="absolute top-4 right-4 text-white/60 hover:text-gold transition-colors"
                  data-cursor-hover
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                >
                  <motion.svg
                    className="w-10 h-10 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </motion.svg>
                </motion.div>

                <motion.h2
                  className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold text-center mb-3 sm:mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Order Placed!
                </motion.h2>

                <motion.div
                  className="bg-obsidian/50 border border-gold/20 p-6 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-white/90 font-sans text-sm leading-relaxed mb-2">
                        <span className="text-gold font-semibold">Demo Project Notice:</span>
                      </p>
                      <p className="text-white/70 font-sans text-sm leading-relaxed">
                        This is a demonstration project. No actual order has been placed or payment processed. This website showcases the frontend functionality of an e-commerce platform.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  className="text-white/80 text-center text-sm mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Thank you for exploring Onyx & Aura!
                </motion.p>

                <motion.button
                  onClick={() => {
                    setIsOrderPlaced(false);
                    navigate('/');
                  }}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gold text-obsidian font-sans text-xs sm:text-sm uppercase tracking-widest font-semibold hover:bg-gold/90 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor-hover
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-obsidian pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-12 md:pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 sm:mb-8 md:mb-12">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          <div className="md:col-span-2 order-2 md:order-1">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-gold mb-4 sm:mb-6">Shipping Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors md:col-span-2"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors md:col-span-2"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors md:col-span-2"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    className="bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors md:col-span-2"
                    required
                  />
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-gold mb-4 sm:mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gold text-obsidian font-sans text-xs sm:text-sm uppercase tracking-widest font-semibold hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                data-cursor-hover
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </motion.button>
            </form>
          </div>

          <div className="md:col-span-1 order-1 md:order-2">
            <div className="bg-charcoal border border-gold/20 p-4 sm:p-6 sticky top-20 sm:top-24">
              <h2 className="font-serif text-xl sm:text-2xl text-gold mb-4 sm:mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => {
                  const itemId = item.id || item._id;
                  if (!itemId) return null;
                  
                  return (
                    <div key={itemId} className="flex gap-4">
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-charcoal flex items-center justify-center">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name || 'Product'} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-white text-sm mb-1">{item.name || 'Product'}</h3>
                        <p className="text-gold text-xs">Qty: {item.quantity || 1}</p>
                        <p className="text-white/60 text-xs">{item.price || '$0'}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gold/20 pt-4 space-y-2">
                <div className="flex justify-between text-white/70 text-sm">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-white/70 text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-serif text-xl text-gold pt-2 border-t border-gold/20">
                  <span>Total</span>
                  <span>${getTotalPrice().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Checkout;
