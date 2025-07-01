"use client";
import { useEffect, useState } from "react";

export const SmoothScroll: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsDesktop(!hasTouch);
    };
    checkIsDesktop();
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let rafId: number;
    let currentScrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let isScrolling = false;

    // Smooth scroll configuration
    const scrollSpeed = 0.15; // Increased speed for better responsiveness
    const threshold = 1; // Slightly higher threshold for quicker stops

    const smoothScrollStep = () => {
      const diff = targetScrollY - currentScrollY;
      
      if (Math.abs(diff) > threshold) {
        // Use easing function for better feel - starts fast, slows down near target
        const easedSpeed = Math.abs(diff) > 100 ? scrollSpeed * 1.5 : scrollSpeed;
        currentScrollY += diff * easedSpeed;
        window.scrollTo(0, currentScrollY);
        rafId = requestAnimationFrame(smoothScrollStep);
      } else {
        currentScrollY = targetScrollY;
        window.scrollTo(0, currentScrollY);
        isScrolling = false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Calculate new target position
      const delta = e.deltaY;
      const scrollAmount = delta * 3.5; // Increased sensitivity for faster scrolling
      targetScrollY = Math.max(0, Math.min(
        document.documentElement.scrollHeight - window.innerHeight,
        targetScrollY + scrollAmount
      ));

      // Start smooth scroll if not already running
      if (!isScrolling) {
        isScrolling = true;
        rafId = requestAnimationFrame(smoothScrollStep);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollAmount = window.innerHeight * 1.0; // Increased from 0.8 to 1.0 for faster keyboard scrolling
      
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // Spacebar
          e.preventDefault();
          targetScrollY = Math.min(
            document.documentElement.scrollHeight - window.innerHeight,
            targetScrollY + scrollAmount
          );
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          targetScrollY = Math.max(0, targetScrollY - scrollAmount);
          break;
        case 'Home':
          e.preventDefault();
          targetScrollY = 0;
          break;
        case 'End':
          e.preventDefault();
          targetScrollY = document.documentElement.scrollHeight - window.innerHeight;
          break;
        default:
          return;
      }

      if (!isScrolling) {
        isScrolling = true;
        rafId = requestAnimationFrame(smoothScrollStep);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      // Update current position for touch events
      currentScrollY = window.scrollY;
      targetScrollY = window.scrollY;
    };

    const handleResize = () => {
      currentScrollY = window.scrollY;
      targetScrollY = window.scrollY;
    };

    const handleScrollEnd = () => {
      // Sync positions when user stops scrolling manually
      currentScrollY = window.scrollY;
      targetScrollY = window.scrollY;
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('scrollend', handleScrollEnd);

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scrollend', handleScrollEnd);
      
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isDesktop]);

  return null;
};