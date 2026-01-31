import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <footer className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-obsidian">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-gold mb-3 sm:mb-4">Onyx & Aura</h3>
            <p className="text-white/50 text-xs sm:text-sm font-light">
              Timeless elegance. Elevated craftsmanship.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col space-y-3"
          >
            <a href="#" className="text-white/70 hover:text-gold transition-colors text-sm uppercase tracking-wider" data-cursor-hover>
              Collection
            </a>
            <a href="#" className="text-white/70 hover:text-gold transition-colors text-sm uppercase tracking-wider" data-cursor-hover>
              Heritage
            </a>
            <a href="#" className="text-white/70 hover:text-gold transition-colors text-sm uppercase tracking-wider" data-cursor-hover>
              Craftsmanship
            </a>
            <a href="#" className="text-white/70 hover:text-gold transition-colors text-sm uppercase tracking-wider" data-cursor-hover>
              Contact
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-white/70 text-sm uppercase tracking-wider mb-6">
              Newsletter
            </p>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter your email"
                className="w-full bg-transparent border-0 border-b border-gold/30 text-white placeholder-white/30 focus:outline-none pb-2 text-sm transition-colors"
              />
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-gold"
                initial={{ width: 0 }}
                animate={{ width: isFocused ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.button
              className="mt-6 text-gold text-sm uppercase tracking-wider hover:text-gold/70 transition-colors"
              whileHover={{ x: 5 }}
              data-cursor-hover
            >
              Subscribe →
            </motion.button>
            
            <div className="flex items-center space-x-4 mt-8">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                data-cursor-hover
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                data-cursor-hover
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.136-.937.873-5.965.873-5.965 0 0-.727-1.485-.727-2.94 0-2.753 1.596-4.807 3.584-4.807 1.691 0 2.506 1.269 2.506 2.792 0 1.701-1.082 4.243-1.64 6.599-.466 1.98.997 3.601 2.98 3.601 3.576 0 6.32-3.768 6.32-9.205 0-3.812-2.74-6.477-6.66-6.477-4.534 0-7.198 3.398-7.198 6.91 0 1.375.529 2.85 1.191 3.653.131.159.149.298.11.461-.12.5-.384 1.576-.436 1.797-.07.303-.23.369-.532.223-1.985-.924-3.225-3.824-3.225-6.152 0-5.006 3.638-9.602 10.49-9.602 5.508 0 9.79 3.916 9.79 9.15 0 5.475-3.45 9.876-8.24 9.876-1.609 0-3.123-.835-3.64-1.976l-.991 3.769c-.36 1.398-1.331 3.147-1.98 4.219 1.49.461 3.064.712 4.711.712 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
            </div>
            
            <div className="flex items-center space-x-3 mt-6">
              <span className="text-white/40 text-xs uppercase tracking-wider">Secure Payment</span>
              <div className="flex items-center space-x-2">
                <motion.div
                  className="text-white/40 hover:text-gold transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="w-8 h-5" viewBox="0 0 40 24" fill="currentColor">
                    <path d="M16.5 9.5h-2.5v5h2.5c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5zm-2.5-3h2.5c3 0 5.5 2.5 5.5 5.5s-2.5 5.5-5.5 5.5h-2.5v-11zm-3 11h-2v-11h2v11zm-5-11h-2.5l-2.5 7.5-2.5-7.5h-2.5l3.5 11h2l3.5-11zm18 7.5c0-1.4-1.1-2.5-2.5-2.5h-2.5v5h2.5c1.4 0 2.5-1.1 2.5-2.5zm-2.5-4.5c3 0 5.5 2.5 5.5 5.5s-2.5 5.5-5.5 5.5h-5v-11h5z"/>
                  </svg>
                </motion.div>
                <motion.div
                  className="text-white/40 hover:text-gold transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="w-8 h-5" viewBox="0 0 40 24" fill="currentColor">
                    <path d="M8 12h24v-2h-24v2zm0 4h24v-2h-24v2zm0 4h16v-2h-16v2z"/>
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center text-white/30 text-xs gap-3 sm:gap-0">
            <p className="text-center sm:text-left">© 2024 Onyx & Aura. All rights reserved.</p>
            <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
              <Link
                to="/admin"
                className="hover:text-gold transition-colors opacity-30 hover:opacity-100 text-[10px] tracking-widest uppercase"
                data-cursor-hover
                title="Admin Access"
              >
                © Admin
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
