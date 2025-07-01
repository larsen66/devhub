"use client";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

// Smooth page transitions
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const StaggeredContainer: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredItem: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

// Parallax scroll effect
export const ParallaxContainer: React.FC<{ 
  children: React.ReactNode; 
  speed?: number;
  className?: string;
}> = ({ children, speed = 0.5, className = "" }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);

  return (
    <motion.div 
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic hover effect
export const MagneticButton: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  strength?: number;
}> = ({ children, className = "", strength = 0.4 }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        e.currentTarget.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0px, 0px) scale(1)";
      }}
    >
      {children}
    </motion.div>
  );
};

// Reveal text animation
export const RevealText: React.FC<{ 
  text: string; 
  className?: string;
  delay?: number;
}> = ({ text, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: [0.25, 0.1, 0.25, 1] 
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

// Smooth morphing shapes
export const MorphingShape: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <motion.div
      className={className}
      animate={{
        borderRadius: [
          "20% 80% 80% 20%",
          "80% 20% 20% 80%", 
          "20% 80% 80% 20%"
        ],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 8,
        ease: "linear",
        repeat: Infinity
      }}
    />
  );
};

// Advanced scroll-triggered animations
export const ScrollReveal: React.FC<{ 
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: number;
  className?: string;
}> = ({ children, direction = 'up', distance = 100, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10%",
    amount: 0.3
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -distance, y: 0 };
      case 'right': return { x: distance, y: 0 };
      case 'down': return { x: 0, y: -distance };
      default: return { x: 0, y: distance };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ ...getInitialPosition(), opacity: 0 }}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: 0.6 }
      }}
    >
      {children}
    </motion.div>
  );
};