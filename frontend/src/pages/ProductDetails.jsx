import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import reviewService from '../services/reviewService';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, loading, getProductById } = useProducts();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!id) return;
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
          if (data.images && data.images.length > 0) {
            setSelectedImageIndex(0);
          }
        }
      } catch (error) {
        setProduct(null);
      }
    };
    loadProduct();
  }, [id, getProductById]);

  useEffect(() => {
    const loadReviews = async () => {
      if (!id) return;
      try {
        setReviewsLoading(true);
        const reviewsData = await reviewService.getReviewsByProduct(id);
        setReviews(reviewsData || []);
      } catch (error) {
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };
    loadReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewForm.name.trim() || !reviewForm.email.trim() || !reviewForm.comment.trim()) {
      setToast({
        show: true,
        message: 'Please fill in all fields',
        type: 'error',
      });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(reviewForm.email)) {
      setToast({
        show: true,
        message: 'Please enter a valid email address',
        type: 'error',
      });
      return;
    }

    try {
      setSubmittingReview(true);
      const productId = product._id || product.id;
      await reviewService.createReview({
        productId,
        ...reviewForm,
      });

      const reviewsData = await reviewService.getReviewsByProduct(productId);
      setReviews(reviewsData || []);

      setReviewForm({
        name: '',
        email: '',
        rating: 5,
        comment: '',
      });
      setShowReviewForm(false);
      setReviewSubmitted(true);

      setToast({
        show: true,
        message: 'Review Submitted Successfully',
        type: 'success',
      });
    } catch (error) {
      setToast({
        show: true,
        message: error.message || 'Failed to submit review',
        type: 'error',
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center pt-24">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-gold hover:text-gold/70 transition-colors"
            data-cursor-hover
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Create images array if not exists
  const productImages = (product.images && product.images.length > 0) 
    ? product.images 
    : (product.image ? [product.image] : []);

  const averageRating = calculateAverageRating();

  return (
    <motion.div
      className="min-h-screen bg-obsidian pt-20 sm:pt-24 md:pt-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ show: false, message: '', type: 'success' })}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 md:mb-8 text-white/60 hover:text-gold transition-colors flex items-center gap-2 text-sm sm:text-base"
          data-cursor-hover
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">
          <div>
            <div className="relative h-[300px] xs:h-[400px] sm:h-[500px] md:h-[600px] mb-3 sm:mb-4 overflow-hidden bg-charcoal">
              {productImages[selectedImageIndex] ? (
                <motion.img
                  key={selectedImageIndex}
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
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
            {productImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-16 xs:h-20 sm:h-20 md:h-24 overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-gold'
                        : 'border-transparent hover:border-gold/50'
                    }`}
                    data-cursor-hover
                  >
                    {(img || product.image) ? (
                      <img 
                        src={img || product.image} 
                        alt={`${product.name} ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-full h-full bg-charcoal flex items-center justify-center text-white/20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center mt-4 sm:mt-0">
            <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white mb-3 sm:mb-4">{product.name}</h1>
            <p className="text-gold text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6">{product.price}</p>
            <p className="text-white/70 text-sm xs:text-base sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
              {product.description}
            </p>

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-gold mb-4">Specifications</h2>
                <div className="border-t border-gold/20 pt-4 space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gold/10 pb-3">
                      <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-white">{value || 'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <motion.button
              onClick={() => addToCart(product)}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gold text-obsidian font-sans text-xs sm:text-sm uppercase tracking-widest font-semibold hover:bg-gold/90 transition-colors mb-6 sm:mb-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
            >
              Add to Cart
            </motion.button>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-6 sm:pt-8 md:pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white mb-2">Customer Reviews</h2>
              {reviews.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-gold text-xl font-semibold">{averageRating}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.round(averageRating) ? 'text-gold' : 'text-white/20'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-white/50 text-sm">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
                </div>
              )}
            </div>
            <motion.button
              onClick={() => {
                setShowReviewForm(!showReviewForm);
                setReviewSubmitted(false);
              }}
              className="mt-4 sm:mt-0 px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors text-sm uppercase tracking-wider"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </motion.button>
          </div>

          {reviewSubmitted && !showReviewForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 p-6 border border-gold bg-gold/10"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-serif text-lg text-gold mb-1">Review Submitted Successfully</h3>
                  <p className="text-white/70 text-sm">Thank you for sharing your experience. Your review has been posted.</p>
                </div>
              </div>
            </motion.div>
          )}

          {showReviewForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 border border-gold/20 bg-charcoal/50"
            >
              <h3 className="font-serif text-xl text-white mb-4">Share Your Experience</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Name *</label>
                    <input
                      type="text"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="w-full px-4 py-2 bg-charcoal border border-gold/20 text-white focus:outline-none focus:border-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      value={reviewForm.email}
                      onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                      className="w-full px-4 py-2 bg-charcoal border border-gold/20 text-white focus:outline-none focus:border-gold"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Rating *</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating })}
                        className={`transition-transform ${
                          reviewForm.rating >= rating ? 'text-gold' : 'text-white/20'
                        }`}
                        data-cursor-hover
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Your Review *</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-charcoal border border-gold/20 text-white focus:outline-none focus:border-gold resize-none"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={submittingReview}
                  className="px-6 py-2 bg-gold text-obsidian font-semibold hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: submittingReview ? 1 : 1.02 }}
                  whileTap={{ scale: submittingReview ? 1 : 0.98 }}
                  data-cursor-hover
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </motion.button>
              </form>
            </motion.div>
          )}

          {reviewsLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/50 text-lg mb-4">No reviews yet</p>
              <p className="text-white/30 text-sm">Be the first to review this product!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div
                  key={review._id || review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b border-gold/10 pb-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="font-serif text-lg text-white mb-1 sm:mb-0">{review.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-gold' : 'text-white/20'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-white/50 text-sm mb-2">{formatDate(review.createdAt || review.date)}</p>
                  <p className="text-white/70 leading-relaxed">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
