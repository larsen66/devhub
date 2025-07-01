"use client";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

// Smooth page transitions
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
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
  // Анимация отключена для оптимизации
  // const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
};

export const StaggeredItem: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// Magnetic hover effect
export const MagneticButton: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  strength?: number;
}> = ({ children, className = "", strength = 0.4 }) => {
  return (
    <div
      className={className}
    >
      {children}
    </div>
  );
};

// Reveal text animation
export const RevealText: React.FC<{ 
  text: string; 
  className?: string;
  delay?: number;
}> = ({ text, className = "", delay = 0 }) => {
  const ref = useRef(null);
  // Анимация отключена для оптимизации
  // const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <div>
        {text}
      </div>
    </div>
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
  // Анимация отключена для оптимизации
  // const isInView = useInView(ref, { 
  //   once: true, 
  //   margin: "-10%",
  //   amount: 0.3
  // });

  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -distance, y: 0 };
      case 'right': return { x: distance, y: 0 };
      case 'down': return { x: 0, y: -distance };
      default: return { x: 0, y: distance };
    }
  };

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
};