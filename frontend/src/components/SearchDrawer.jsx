import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { searchProducts } from '../data/products';

const SearchDrawer = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const productContext = useContext(ProductContext);
  const products = productContext?.products || [];

  const searchResults = useMemo(() => {
    if (!products || products.length === 0) return [];
    return searchProducts(searchQuery, products);
  }, [searchQuery, products]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    onClose();
  };

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-obsidian/90 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.div
            className="fixed inset-0 md:inset-y-0 md:left-0 md:right-auto md:w-[500px] bg-charcoal border-r border-gold/20 z-[101] shadow-2xl overflow-hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gold/20">
                <h2 className="font-serif text-2xl text-gold">Search</h2>
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-gold transition-colors"
                  data-cursor-hover
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 border-b border-gold/20">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search watches..."
                    className="w-full bg-transparent border-0 border-b border-gold/30 text-white placeholder-white/30 focus:outline-none pb-3 text-lg focus:border-gold transition-colors"
                    autoFocus
                  />
                  <svg
                    className="absolute right-0 bottom-3 w-5 h-5 text-gold/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {searchQuery && (
                  <p className="text-white/50 text-xs mt-2">
                    {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
                  </p>
                )}
              </div>

              <div className="flex-1 overflow-y-auto">
                {!searchQuery ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <svg className="w-16 h-16 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-white/60 text-sm mb-2">Start typing to search</p>
                    <p className="text-white/40 text-xs">Search by watch name, description, or category</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <svg className="w-16 h-16 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-white/60 text-sm mb-1">No results found</p>
                    <p className="text-white/40 text-xs">Try different keywords</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-2">
                    {searchResults.map((product, index) => {
                      const productId = product.id || product._id;
                      if (!productId) return null;
                      
                      return (
                      <motion.div
                        key={productId}
                        onClick={() => handleProductClick(productId)}
                        className="flex items-center gap-4 p-4 bg-obsidian/50 border border-gold/10 hover:border-gold/30 hover:bg-obsidian/70 transition-all cursor-pointer group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                        data-cursor-hover
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-white text-sm md:text-base mb-1 truncate group-hover:text-gold transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-gold text-xs md:text-sm font-light mb-1">
                            {product.price}
                          </p>
                          <p className="text-white/50 text-xs truncate">
                            {product.description}
                          </p>
                          <span className="inline-block mt-1 text-gold/60 text-xs uppercase tracking-wider">
                            {product.category}
                          </span>
                        </div>

                        <svg
                          className="w-5 h-5 text-white/40 group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchDrawer;
