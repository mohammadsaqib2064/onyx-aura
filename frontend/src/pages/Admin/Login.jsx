import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../components/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        setShowToast(true);
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 500);
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <Toast
        message="Login successful!"
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="bg-charcoal border-2 border-gold/30 p-8 md:p-10"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-serif text-2xl text-white mb-6 text-center">Admin Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/70 text-sm mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="Enter email"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-gold/30 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="Enter password"
                required
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <motion.p
                className="text-red-400 text-sm text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gold text-obsidian font-sans text-sm uppercase tracking-widest font-semibold hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              data-cursor-hover
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-gold/20">
            <p className="text-white/50 text-xs text-center mb-2">
              Demo Account (Read-Only):
            </p>
            <p className="text-gold/70 text-xs text-center font-mono">
              demo@onyxaura.com / demo123
            </p>
            <p className="text-white/30 text-[10px] text-center mt-3">
              Demo account can view dashboard but cannot make changes
            </p>
          </div>
        </motion.div>

        <motion.button
          onClick={() => navigate('/')}
          className="mt-6 text-white/60 hover:text-gold transition-colors text-sm text-center w-full"
          whileHover={{ y: -2 }}
          data-cursor-hover
        >
          ← Back to Website
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
