"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Простая секция с плавным появлением
export const ScrollSection: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = "" }) => {
  const ref = useRef(null);
  // Анимация отключена для оптимизации
  // const isInView = useInView(ref, { 
  //   once: true,
  //   amount: 0.1
  // });

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
};

// Контактная секция
export const ContactSection: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = "" }) => {
  const ref = useRef(null);
  // Анимация отключена для оптимизации
  // const isInView = useInView(ref, { 
  //   once: true,
  //   amount: 0.1
  // });

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
};

// Текст героя без анимации скролла
export const HeroText: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};