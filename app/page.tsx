"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Particles from "./components/particles";
import { Carousel } from "./components/carousel";
import { ContactForm } from "./components/contact-form";
import { ScrollAnimations, ScrollSection, ContactSection, HeroText } from "./components/scroll-animations";
import dynamic from "next/dynamic";
import { SmoothScroll } from "./components/smooth-scroll";
import { Sparkles } from "./components/sparkles";
import { Demo } from "./components/demo";
import { Testimonials } from "./components/testimonials";

const SparklesDynamic = dynamic(() => import("./components/sparkles-dynamic"), {
  ssr: false,
});

const navigation = [
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(true);

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
      <SmoothScroll />
      <ScrollAnimations />
      <SparklesDynamic
        className="absolute inset-0 -z-10"
        size={40}
        color="var(--sparkles-color)"
        background="transparent"
      />
      <div className="hero-section flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
        <HeroText delay={0} className="my-20">
          <nav>
            <ul className="flex items-center justify-center gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
                >
                  {item.name}
                </Link>
              ))}
            </ul>
          </nav>
        </HeroText>
        
        <div className="hero-line hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        
        <HeroText delay={0.1} className="py-3.5 px-0.5 z-10">
          <h1 className="text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text transition-all ease-out">
            DevHub
          </h1>
        </HeroText>

        <div className="hero-line hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        
        <HeroText delay={0.2} className="hero-subtext my-20 text-center">
          <h2 className="text-sm text-zinc-500">
            Full-stack development, mobile apps, AI automation & cloud solutions.{" "}
            <Link
              target="_blank"
              href="https://devhub.io"
              className="underline duration-500 hover:text-zinc-300"
            >
              DevHub
            </Link>{" "}
            transforms your ideas into reality.
          </h2>
        </HeroText>
      </div>
      <div className="py-16 md:py-24">
        <Demo />
      </div>
      <ScrollSection id="projects" className="relative z-10 -mt-32 w-full flex flex-col items-center justify-center pb-40">
        <h2 className="pb-20 pt-0 z-10 text-3xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-4xl md:text-5xl whitespace-nowrap bg-clip-text">
          Projects
        </h2>
        <Carousel autoplay loop baseWidth={600} baseHeight={400} />
      </ScrollSection>

      <Testimonials />

      <ContactSection id="contact" className="py-32 pb-40">
        <ContactForm />
      </ContactSection>
    </div>
  );
}
