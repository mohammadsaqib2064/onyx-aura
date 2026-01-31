import { createContext, useContext, useState, useEffect } from 'react';
import productService from '../services/productService';

const ProductContext = createContext();

export { ProductContext };

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    return { products: [], loading: false, error: null };
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      const normalizedData = data.map(product => ({
        ...product,
        id: product._id || product.id,
      }));
      setProducts(normalizedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const getProductById = async (id) => {
    try {
      const product = await productService.getProductById(id);
      if (product && product._id && !product.id) {
        product.id = product._id;
      }
      return product;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  };

  const addProduct = async (productData) => {
    try {
      setLoading(true);
      setError(null);
      const newProduct = await productService.addProduct(productData);
      const normalizedProduct = {
        ...newProduct,
        id: newProduct._id || newProduct.id,
      };
      await loadProducts();
      return normalizedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      const updated = await productService.updateProduct(id, productData);
      const normalizedProduct = {
        ...updated,
        id: updated._id || updated.id,
      };
      setProducts(prev => prev.map(p => (p.id === id || p._id === id) ? normalizedProduct : p));
      return normalizedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id && p._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        loadProducts,
        getProductById,
        getProductsByCategory,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
