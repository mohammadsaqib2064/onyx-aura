import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductTable = ({ products, onDelete, onEdit, isDemo = false }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="block md:hidden space-y-4 px-4">
        {products.map((product, index) => (
          <motion.div
            key={product._id || product.id}
            className="bg-charcoal border border-gold/10 p-4 rounded"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex gap-4 mb-4">
              <div
                className="w-20 h-20 flex-shrink-0 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${product._id || product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-white text-sm mb-1 truncate">{product.name}</p>
                <p className="text-gold text-xs mb-1">{product.price}</p>
                <span className="text-white/60 text-xs uppercase tracking-wider">{product.category}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {isDemo ? (
                <>
                  <motion.button
                    disabled
                    className="flex-1 px-3 py-2 border border-gold/10 text-gold/30 text-xs uppercase tracking-wider cursor-not-allowed opacity-50"
                  >
                    Edit (Disabled)
                  </motion.button>
                  <motion.button
                    disabled
                    className="flex-1 px-3 py-2 border border-red-500/10 text-red-400/30 text-xs uppercase tracking-wider cursor-not-allowed opacity-50"
                  >
                    Delete (Disabled)
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => onEdit(product)}
                    className="flex-1 px-3 py-2 border border-gold/30 text-gold text-xs uppercase tracking-wider hover:bg-gold/10 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => onDelete(product._id || product.id)}
                    className="flex-1 px-3 py-2 border border-red-500/30 text-red-400 text-xs uppercase tracking-wider hover:bg-red-500/10 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <table className="hidden md:table w-full">
        <thead>
          <tr className="border-b border-gold/20">
            <th className="text-left py-4 px-4 text-white/70 text-xs uppercase tracking-wider font-sans">Image</th>
            <th className="text-left py-4 px-4 text-white/70 text-xs uppercase tracking-wider font-sans">Name</th>
            <th className="text-left py-4 px-4 text-white/70 text-xs uppercase tracking-wider font-sans">Price</th>
            <th className="text-left py-4 px-4 text-white/70 text-xs uppercase tracking-wider font-sans">Category</th>
            <th className="text-right py-4 px-4 text-white/70 text-xs uppercase tracking-wider font-sans">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <motion.tr
              key={product._id || product.id}
              className="border-b border-gold/10 hover:bg-obsidian/50 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <td className="py-4 px-4">
                <div
                  className="w-16 h-16 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${product._id || product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                  />
                </div>
              </td>
              <td className="py-4 px-4">
                <p className="font-serif text-white text-sm">{product.name}</p>
              </td>
              <td className="py-4 px-4">
                <p className="text-gold text-sm">{product.price}</p>
              </td>
              <td className="py-4 px-4">
                <span className="text-white/60 text-xs uppercase tracking-wider">{product.category}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex justify-end gap-2">
                  {isDemo ? (
                    <>
                      <motion.button
                        disabled
                        className="px-4 py-2 border border-gold/10 text-gold/30 text-xs uppercase tracking-wider cursor-not-allowed opacity-50"
                      >
                        Edit (Disabled)
                      </motion.button>
                      <motion.button
                        disabled
                        className="px-4 py-2 border border-red-500/10 text-red-400/30 text-xs uppercase tracking-wider cursor-not-allowed opacity-50"
                      >
                        Delete (Disabled)
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => onEdit(product)}
                        className="px-4 py-2 border border-gold/30 text-gold text-xs uppercase tracking-wider hover:bg-gold/10 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-cursor-hover
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        onClick={() => onDelete(product._id || product.id)}
                        className="px-4 py-2 border border-red-500/30 text-red-400 text-xs uppercase tracking-wider hover:bg-red-500/10 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-cursor-hover
                      >
                        Delete
                      </motion.button>
                    </>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
