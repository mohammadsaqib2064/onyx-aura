import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const BrandStory = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const computedStyle = window.getComputedStyle(containerRef.current);
      if (computedStyle.position === 'static') {
        containerRef.current.style.position = 'relative';
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="craftsmanship"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden bg-cover bg-center"
      style={{
        position: 'relative',
        backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80)',
      }}
    >
      <div className="absolute inset-0 bg-obsidian/85" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(https://www.transparenttextures.com/patterns/brushed-alum.png)',
        }}
      />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <motion.p
          className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white leading-relaxed font-light px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Crafted for those who
          <br />
          <span className="text-gold italic">own their time.</span>
        </motion.p>
        
        <motion.div
          className="mt-8 sm:mt-12 w-24 sm:w-32 h-px bg-gold mx-auto"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    </section>
  );
};

export default BrandStory;
