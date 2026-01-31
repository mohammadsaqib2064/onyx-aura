const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ReviewService {
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getReviewsByProduct(productId) {
    try {
      const response = await this.request(`/reviews/product/${productId}`);
      return response.data || [];
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch reviews');
    }
  }

  async createReview(reviewData) {
    const { productId, name, email, rating, comment } = reviewData;

    if (!productId || !name || !email || !rating || !comment) {
      throw new Error('Please provide all required fields');
    }

    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const response = await this.request('/reviews', {
      method: 'POST',
      body: {
        productId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        rating: parseInt(rating),
        comment: comment.trim(),
      },
    });

    return response.data;
  }
}

export default new ReviewService();
