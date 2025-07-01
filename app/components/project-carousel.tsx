"use client";
import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

// Project interfaces
export interface ProjectItem {
  title: string;
  description: string;
  id: number;
  image: string;
  tech: string[];
  link?: string;
}

export interface ProjectCarouselProps {
  projects?: ProjectItem[];
  baseWidth?: number;
  baseHeight?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}

// Project data
const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    title: "DeliverySetup",
    description: "Landing page for launching food delivery services in the hospitality industry",
    id: 1,
    image: "/deliverysetup.png",
    tech: ["React", "TypeScript", "JavaScript"],
    link: "https://deliverysetup.com"
  },
  {
    title: "Muqta",
    description: "Mobile and web system for tracking discounts and deals across multiple platforms",
    id: 2,
    image: "/muqta.png",
    tech: ["Django", "Vue.js", "Docker", "Telegram Bot"],
    link: "https://muqta.app"
  },
  {
    title: "DevHub Portfolio",
    description: "Modern developer portfolio with animations and responsive design",
    id: 3,
    image: "/devhub.png",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    link: "#"
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export const ProjectCarousel = ({
  projects = DEFAULT_PROJECTS,
  baseWidth = 400,
  baseHeight = 300,
  autoplay = false,
  autoplayDelay = 4000,
  pauseOnHover = true,
  loop = true,
}: ProjectCarouselProps): JSX.Element => {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...projects, projects[0]] : projects;
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
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === projects.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, projects.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === projects.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(projects.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden p-4 rounded-[24px] border border-zinc-800"
      style={{
        width: `${baseWidth}px`,
        height: `${baseHeight}px`,
      }}
    >
      <motion.div
        className="flex h-full"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((project, index) => (
          <motion.div
            key={index}
            className="relative shrink-0 flex flex-col bg-zinc-900 border border-zinc-800 rounded-[12px] overflow-hidden cursor-grab active:cursor-grabbing"
            style={{
              width: itemWidth,
              height: "100%",
            }}
            transition={effectiveTransition}
          >
            <div className="relative h-2/3 w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-white mb-2">{project.title}</h3>
                <p className="text-sm text-zinc-400 mb-3">{project.description}</p>
              </div>
              
              <div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {project.link && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Project →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex w-full justify-center">
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {projects.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % projects.length === index
                  ? "bg-zinc-400"
                  : "bg-zinc-700"
              }`}
              animate={{
                scale: currentIndex % projects.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};