'use client';

import { useState, useEffect } from 'react';

export const DesktopOnly = ({ children }: { children: React.ReactNode }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      // Simple check: assume non-touch devices are desktops
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsDesktop(!hasTouch);
    };

    checkIsDesktop();
  }, []);

  if (!isDesktop) {
    return null;
  }

  return <>{children}</>;
}; 