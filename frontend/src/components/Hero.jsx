import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';

const Hero = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = containerRef.current;
      if (parallax) {
        const scale = Math.min(1 + scrolled * 0.0003, 1.2); // Limit max scale
        parallax.style.transform = `translateY(${scrolled * 0.3}px) scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden" id="home">
      <div
        ref={containerRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&q=80)',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/60 to-obsidian" />
      
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-6xl"
        >
          <motion.h1
            className="font-serif text-5xl xs:text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] font-black text-white leading-[0.9] mb-6 sm:mb-8 tracking-tight px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            TIMELESS.
            <br />
            <span className="text-gold">ELEVATED.</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 sm:mt-12"
          >
            <motion.button
              onClick={() => smoothScrollTo('collection')}
              className="group relative px-8 sm:px-12 py-3 sm:py-4 border-2 border-gold/70 text-gold font-sans text-xs sm:text-sm tracking-widest uppercase overflow-hidden bg-obsidian/20 backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(197, 164, 126, 1)',
                boxShadow: '0 0 30px rgba(197, 164, 126, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              data-cursor-hover
            >
              <span className="relative z-10 block transition-colors duration-300 group-hover:text-white">
                Explore Collection
              </span>
              <motion.div
                className="absolute inset-0 bg-gold"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <span className="relative z-10 text-obsidian block absolute inset-0 flex items-center justify-center font-semibold">
                Explore Collection
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-gold/50" />
      </motion.div>
    </section>
  );
};

export default Hero;
