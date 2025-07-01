"use client";

import React, { useState, useEffect } from 'react';
import { FaReact, FaMobileAlt, FaPalette } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  icon: React.ReactNode;
}

// This data is imported from the old carousel component to maintain consistency
const DEFAULT_PROJECTS = [
  {
    title: "DeliverySetup",
    description: "Landing page for launching food delivery services in the hospitality industry",
    id: 1,
    image: "/deliverysetup.png",
    tech: ["React", "TypeScript", "JavaScript"],
    link: "https://deliverysetup.ge"
  },
  {
    title: "Muqta",
    description: "Mobile and web system for tracking discounts and deals across multiple platforms",
    id: 2,
    image: "/muqta.png",
    tech: ["Django", "Vue.js", "Docker", "Telegram Bot"],
    link: "https://muqtad.ge"
  },
  {
    title: "Nexus",
    description: "Collaborative customer support platform for Slack, Teams, and Discord.",
    id: 4,
    image: "/nexus.png",
    tech: ["Next.js", "Node.js", "GraphQL"],
    link: "#"
  },
  {
    title: "Planetfall",
    description: "Global latency monitoring for APIs from around the world.",
    id: 5,
    image: "/planetfall.png",
    tech: ["React", "Go", "WebSockets"],
    link: "#"
  },
  {
    title: "Indima",
    description: "Fast-track credential evaluation for individuals and organizations.",
    id: 6,
    image: "/indima.png",
    tech: ["Vue.js", "Python", "AWS"],
    link: "#"
  },
];

// Map project data to the structure required by this component
const options: Project[] = DEFAULT_PROJECTS.map((project, index) => {
  const icons = [
    <FaReact size={24} className="text-white" />,
    <FaMobileAlt size={24} className="text-white" />,
    <FaPalette size={24} className="text-white" />
  ];
  return {
    ...project,
    icon: icons[index % icons.length] // Assign icons cyclically
  };
});

const ProjectCard = ({ project }: { project: Project }) => (
    <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full max-w-sm mx-auto">
        <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-700 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-cyan-500/50 hover:border-cyan-500/50">
            <div className="relative w-full h-48">
                <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="text-zinc-300 mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((t: string) => (
                        <span key={t} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    </Link>
);

const InteractiveSelector = ({ isDesktop }: { isDesktop: boolean }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  if (!isDesktop) {
    return (
        <div className="w-full px-4">
            <div className="flex flex-col items-center gap-8">
                {options.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-transparent font-sans text-white"> 
      {/* Header Section - Removed for seamless integration */}

      <div className="h-12"></div>

      {/* Options Container */}
      <div className="options flex w-full max-w-[900px] h-[400px] mx-auto items-stretch overflow-hidden relative gap-2">
        {options.map((option, index) => (
          <div
            key={index}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-[flex,opacity,transform,border,box-shadow] duration-700 ease-in-out
              ${activeIndex === index ? 'active' : ''}
            `}
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
              flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
              borderRadius: '16px',
              border: `1px solid ${activeIndex === index ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
              cursor: 'pointer',
              boxShadow: activeIndex === index 
                ? '0 0 25px rgba(131, 80, 232, 0.4), 0 20px 50px rgba(0,0,0,0.7), inset 0 0 15px rgba(255,255,255,0.1)' 
                : '0 10px 30px rgba(0,0,0,0.5)',
            }}
            onClick={() => handleOptionClick(index)}
          >
            <Image
                src={option.image}
                alt={option.title}
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 -z-10"
            />
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(10, 10, 10, 0.9) 10%, transparent 50%)'
              }}
            ></div>
            
            {/* Label with icon and info */}
            <div className="relative z-10 p-4 flex items-center gap-4 w-full">
              <div className="flex-shrink-0 icon min-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-zinc-900/50 backdrop-blur-md border border-zinc-700 transition-all duration-200">
                {option.icon}
              </div>
              <div className="info text-white whitespace-pre relative overflow-hidden">
                <div 
                  className="font-bold text-lg transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  {option.title}
                </div>
                <div 
                  className="text-sm text-zinc-300 transition-all duration-700 ease-in-out delay-100"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        /* Анимации отключены для оптимизации */
        /*
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
        */
      `}</style>
    </div>
  );
};

export default InteractiveSelector; 