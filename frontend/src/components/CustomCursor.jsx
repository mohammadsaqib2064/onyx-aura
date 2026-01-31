import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isTouchDevice = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        navigator.msMaxTouchPoints > 0;
      
      const isMobileWidth = window.innerWidth <= 768;
      
      return !isTouchDevice && !isMobileWidth;
    };

    if (!checkDevice()) {
      return;
    }

    setIsVisible(true);

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleResize = () => {
      if (!checkDevice()) {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('resize', handleResize);
    
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], [data-cursor-hover]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    addHoverListeners();

    const interval = setInterval(addHoverListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', handleResize);
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], [data-cursor-hover]');
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      <motion.div
        className={`w-10 h-10 rounded-full border-2 border-gold ${
          isHovering ? 'bg-gold/20' : 'bg-transparent'
        }`}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          duration: 0.2,
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;
