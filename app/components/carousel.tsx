"use client";
import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

import {
  FiCircle,
  FiCode,
  FiFileText,
  FiLayers,
  FiLayout,
  FiBriefcase,
  FiBarChart2,
  FiLock,
  FiTruck,
  FiShoppingCart,
  FiKey,
  FiTarget,
} from "react-icons/fi";

// Interfaces
export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: JSX.Element;
  imageUrl?: string;
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  baseHeight?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

// Constants and Default Items
const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: "DeliverySetup",
    description: "A landing page for launching food delivery services for restaurants and the HoReCa industry.",
    id: 1,
    icon: <FiTruck className="h-[16px] w-[16px] text-white" />,
    imageUrl: "/deliverysetup.png",
  },
  {
    title: "Muqta",
    description: "A system for tracking discounts, available as a website and mobile apps.",
    id: 2,
    icon: <FiShoppingCart className="h-[16px] w-[16px] text-white" />,
    imageUrl: "/muqta.png",
  },
  {
    title: "Planetfall",
    description: "A real-time strategy game built with modern web technologies, hosted on Vercel.",
    id: 3,
    icon: <FiTarget className="h-[16px] w-[16px] text-white" />,
    imageUrl: "/planetfall.png",
  },
  {
    title: "Indima",
    description: "A comprehensive platform for credential evaluation and professional services.",
    id: 4,
    icon: <FiBriefcase className="h-[16px] w-[16px] text-white" />,
    imageUrl: "/indima.png",
  },
  {
    title: "Nexus",
    description: "A collaborative customer support platform for modern teams.",
    id: 5,
    icon: <FiBriefcase className="h-[16px] w-[16px] text-white" />,
    imageUrl: "/nexus.png",
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

// Component definition
export const Carousel = ({ // Changed from export default function Carousel
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  baseHeight,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps): JSX.Element => {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  // If loop is true, a clone of the first item is added to the end for seamless transition.
  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      // Автопроигрывание отключено для оптимизации
      return;
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  // Handles the instant jump when the animation completes on the cloned item.
  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) { // If animated to the clone (which is at `items.length` index)
      setIsResetting(true); // Disable transition for the jump
      x.set(0); // Immediately set x position back to the first item
      setCurrentIndex(0); // Immediately set index back to the first item
      setTimeout(() => setIsResetting(false), 50); // Re-enable transitions after a brief moment
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) { // Drag left (swipe to next item)
      if (loop && currentIndex === items.length - 1) { // If currently on the last original item, go to the clone
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1)); // Move to next, but not past the last
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) { // Drag right (swipe to previous item)
      if (loop && currentIndex === 0) { // If currently on the first item, loop to the last original item
        // Note: This animation will appear to go "backwards" through all items to reach the last.
        // For a perfectly seamless loop, a two-clone setup and more complex x.set jumps are needed.
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0)); // Move to previous, but not before the first
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${
        round
          ? "rounded-full border border-white"
          : "rounded-[24px] border border-[#222]"
      }`}
      style={{
        width: `${baseWidth}px`,
        height: round
          ? `${baseWidth}px`
          : baseHeight
            ? `${baseHeight}px`
            : undefined,
      }}
    >
      <motion.div
        className="flex h-full"
        style={{
          gap: `${GAP}px`,
          x,
        }}
        drag="x"
        dragConstraints={{
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        }}
        onDragEnd={handleDragEnd}
        animate={{
          x: -currentIndex * trackItemOffset,
        }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <CarouselItemCard
            key={item.id + "-" + index}
            item={item}
            width={itemWidth}
            round={round}
          />
        ))}
      </motion.div>
      <div
        className={`flex w-full justify-center ${
          round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
        }`}
      >
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {/* Render dots for the original number of items, mapping current index to original item index */}
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index // Use modulo for looping dot highlight
                  ? round
                    ? "bg-white"
                    : "bg-[#333333]"
                  : round
                    ? "bg-[#555]"
                    : "bg-[rgba(51,51,51,0.4)]"
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)} // Set current index to the clicked dot's item
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CarouselItemCardProps {
  item: CarouselItem;
  width: number;
  round?: boolean;
}

const CarouselItemCard = ({
  item,
  width,
  round,
}: CarouselItemCardProps) => {
  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden text-white ${
        round ? "rounded-full" : "rounded-[18px]"
      } flex flex-col justify-end p-6`}
      style={{
        width,
        height: "100%",
        backgroundImage: item.imageUrl
          ? `url(${item.imageUrl})`
          : "linear-gradient(to bottom, #222, #111)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="relative z-10">
        <div className="mb-2 flex items-center gap-2">
          {!item.imageUrl && (
            <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white/10">
              {item.icon}
            </span>
          )}
          <h3 className="text-lg font-semibold">{item.title}</h3>
        </div>
        <p className="text-sm text-zinc-300">{item.description}</p>
      </div>
      {item.imageUrl && (
        <Image src={item.imageUrl} alt={item.title} layout="fill" objectFit="cover" loading="lazy" />
      )}
    </div>
  );
}; 