const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ProductService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const method = options.method || 'GET';
    
    const headers = new Headers();
    
    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }
    
    let body = options.body;
    
    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      if (typeof body === 'object' && !(body instanceof FormData) && !(body instanceof Blob)) {
        body = JSON.stringify(body);
        headers.set('Content-Type', 'application/json');
      } else if (typeof body === 'string') {
        headers.set('Content-Type', 'application/json');
      }
    }
    
    const config = {
      method: method,
      headers: headers,
    };
    
    if (body) {
      config.body = body;
    }

    try {
      const response = await fetch(url, config);
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        const text = await response.text();
        throw new Error(`Server error: ${text || response.statusText}`);
      }

      if (!response.ok) {
        const errorMsg = data.message || data.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMsg);
      }

      return data;
    } catch (error) {
      if (error.message) {
        throw error;
      }
      throw new Error(`Network error: ${error.message || 'Failed to connect to server'}`);
    }
  }

  async getAllProducts() {
    try {
      const response = await this.request('/products');
      return response.data || [];
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const response = await this.request(`/products/${id}`);
    return response.data;
  }

  async getProductsByCategory(category) {
    try {
      const response = await this.request(`/products?category=${encodeURIComponent(category)}`);
      return response.data || [];
    } catch (error) {
      return [];
    }
  }

  getAuthToken() {
    try {
      const authData = localStorage.getItem('onyxAuraAdminAuth');
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.token;
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  async addProduct(productData) {
    const token = this.getAuthToken();
    
    if (!productData.name || !productData.price || !productData.image || !productData.category || !productData.description) {
      throw new Error('Missing required fields: name, price, image, category, description');
    }
    
    const response = await this.request('/products', {
      method: 'POST',
      body: productData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  }

  async updateProduct(id, productData) {
    const token = this.getAuthToken();
    
    const response = await this.request(`/products/${id}`, {
      method: 'PUT',
      body: productData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  }

  async deleteProduct(id) {
    const token = this.getAuthToken();
    
    const response = await this.request(`/products/${id}`, {
      method: 'DELETE',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response;
  }
}

export default new ProductService();
