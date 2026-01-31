import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import ProductTable from '../../components/Admin/ProductTable';
import ProductForm from '../../components/Admin/ProductForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { products, loading, addProduct, updateProduct, deleteProduct, loadProducts } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const isDemo = user?.role === 'demo';
  const isAdmin = user?.role === 'admin';

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleAddProduct = async (productData) => {
    if (isDemo) {
      setToast({ show: true, message: 'Demo account cannot make changes', type: 'error' });
      return;
    }
    try {
      await addProduct(productData);
      setShowForm(false);
      setEditingProduct(null);
      setToast({ show: true, message: 'Product added successfully!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.message || 'Failed to add product', type: 'error' });
    }
  };

  const handleEditProduct = async (productData) => {
    if (isDemo) {
      setToast({ show: true, message: 'Demo account cannot make changes', type: 'error' });
      return;
    }
    try {
      const productId = editingProduct._id || editingProduct.id;
      await updateProduct(productId, productData);
      setShowForm(false);
      setEditingProduct(null);
      setToast({ show: true, message: 'Product updated successfully!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Failed to update product', type: 'error' });
    }
  };

  const handleDeleteProduct = async (id) => {
    if (isDemo) {
      setToast({ show: true, message: 'Demo account cannot make changes', type: 'error' });
      return;
    }
    try {
      await deleteProduct(id);
      setDeleteConfirm(null);
      setToast({ show: true, message: 'Product deleted successfully!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Failed to delete product', type: 'error' });
    }
  };

  const handleEdit = (product) => {
    if (isDemo) {
      setToast({ show: true, message: 'Demo account cannot make changes', type: 'error' });
      return;
    }
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-16">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold mb-2">
              {isDemo ? 'Demo Dashboard' : 'Admin Dashboard'}
            </h1>
            <p className="text-white/60 text-xs sm:text-sm">
              {isDemo ? 'View-only access to product catalog' : 'Manage your product catalog'}
            </p>
            {isDemo && (
              <p className="text-gold/60 text-xs mt-1 italic">
                Demo Mode - Changes are disabled
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
            {isAdmin && (
              <motion.button
                onClick={() => setShowForm(true)}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gold text-obsidian font-sans text-xs sm:text-sm uppercase tracking-widest font-semibold hover:bg-gold/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
              >
                + Add Product
              </motion.button>
            )}
            {isDemo && (
              <motion.button
                disabled
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gold/20 text-gold/50 font-sans text-xs sm:text-sm uppercase tracking-widest font-semibold cursor-not-allowed opacity-50"
              >
                + Add Product (Disabled)
              </motion.button>
            )}
            <motion.button
              onClick={() => {
                logout();
                navigate('/admin');
              }}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gold/30 text-gold font-sans text-xs sm:text-sm uppercase tracking-widest hover:bg-gold/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              Logout
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <>
              <motion.div
                className="fixed inset-0 bg-obsidian/90 backdrop-blur-sm z-[200]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCancel}
              />
              <motion.div
                className="fixed inset-0 z-[201] flex items-center justify-center p-4 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-charcoal border-2 border-gold/30 max-w-3xl w-full p-8 md:p-10 my-8"
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 50 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-2xl text-gold">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                      onClick={handleCancel}
                      className="text-white/60 hover:text-gold transition-colors"
                      data-cursor-hover
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <ProductForm
                    product={editingProduct}
                    onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
                    onCancel={handleCancel}
                  />
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {deleteConfirm && (
            <>
              <motion.div
                className="fixed inset-0 bg-obsidian/90 backdrop-blur-sm z-[200]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDeleteConfirm(null)}
              />
              <motion.div
                className="fixed inset-0 z-[201] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-charcoal border-2 border-gold/30 max-w-md w-full p-8"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="font-serif text-xl text-white mb-4">Delete Product?</h3>
                  <p className="text-white/70 text-sm mb-6">
                    Are you sure you want to delete this product? This action cannot be undone.
                  </p>
                  <div className="flex gap-4">
                    <motion.button
                      onClick={() => handleDeleteProduct(deleteConfirm)}
                      className="flex-1 px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-400 font-sans text-sm uppercase tracking-widest hover:bg-red-500/30 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      data-cursor-hover
                    >
                      Delete
                    </motion.button>
                    <motion.button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 px-6 py-3 border border-gold/30 text-gold font-sans text-sm uppercase tracking-widest hover:bg-gold/10 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      data-cursor-hover
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-charcoal border border-gold/20 p-6">
            <div className="mb-4">
              <p className="text-white/60 text-sm">
                Total Products: <span className="text-gold font-semibold">{products.length}</span>
              </p>
            </div>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/60 mb-4">No products found</p>
                {isAdmin ? (
                  <motion.button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-gold text-obsidian font-sans text-sm uppercase tracking-widest font-semibold hover:bg-gold/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-hover
                  >
                    Add Your First Product
                  </motion.button>
                ) : (
                  <p className="text-white/40 text-sm">Demo account cannot add products</p>
                )}
              </div>
            ) : (
              <ProductTable
                products={products}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteConfirm(id)}
                isDemo={isDemo}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
