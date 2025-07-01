"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ContactForm } from "./components/contact-form";
import { ScrollSection, ContactSection, HeroText } from "./components/scroll-animations";
import dynamic from "next/dynamic";
import { Sparkles } from "./components/sparkles";
import { Demo } from "./components/demo";
import DecryptedText from "./components/DecryptedText";
const Testimonials = dynamic(() => import("./components/testimonials").then(mod => mod.Testimonials), { ssr: false });
const InteractiveSelector = dynamic(() => import("./components/interactive-selector").then(mod => mod.default), { ssr: false });

const SparklesDynamic = dynamic(
  () => import("./components/sparkles-dynamic"),
  {
    ssr: false,
  },
);

const navigation = [
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000); // 3-second delay to match the animation duration

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAnimating) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isAnimating]);

  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Mobile-friendly sparkles - отключено для мобильных устройств в Hero секции */}
      {/* <SparklesDynamic
        className="absolute inset-0 -z-10 md:hidden"
        size={20}
        density={100}
        color="var(--sparkles-color)"
        background="transparent"
      /> */}
      {/* Desktop sparkles - отключено для оптимизации */}
      {/*
      <SparklesDynamic
        className="absolute inset-0 -z-10 hidden md:block"
        size={20}
        density={80}
        color="var(--sparkles-color)"
        background="transparent"
      />
      */}
      <div className="hero-section flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
        <HeroText delay={0} className="my-20">
          <nav>
            <ul className="flex items-center justify-center gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm duration-500 text-zinc-500 hover:text-zinc-300 group"
                >
                  <DecryptedText
                    text={item.name}
                    animateOn={isDesktop ? 'hover' : 'view'}
                    sequential={true}
                    className="duration-500 text-zinc-500 group-hover:text-zinc-300"
                  />
                </Link>
              ))}
            </ul>
          </nav>
        </HeroText>
        
        <div className="hero-line hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        
        <HeroText delay={0.1} className="py-3.5 px-0.5 z-10">
          <h1 className="text-5xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl bg-clip-text transition-all ease-out">
            DevHub
          </h1>
        </HeroText>

        <div className="hero-line hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        
        <HeroText delay={0.2} className="hero-subtext my-20 text-center">
          <h2 className="text-lg text-zinc-500 whitespace-pre-wrap">
            Full-stack development, mobile apps, AI automation & cloud solutions.
            {"\n"}
            DevHub transforms your ideas into reality.
          </h2>
        </HeroText>
      </div>
      <div className="py-10 md:py-24">
        <Demo isDesktop={isDesktop} />
      </div>
      <div id="projects">
        <ScrollSection className="relative z-10 -mt-32 w-full flex flex-col items-center justify-center pb-40">
          <h2 className="pb-20 pt-0 z-10 text-3xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-4xl md:text-5xl whitespace-nowrap bg-clip-text">
            Projects
          </h2>
          <InteractiveSelector isDesktop={isDesktop} />
        </ScrollSection>
      </div>

      <Testimonials />

      <div id="contact">
        <ContactSection className="pt-0 pb-4">
          <ContactForm />
        </ContactSection>
      </div>
    </div>
  );
}
