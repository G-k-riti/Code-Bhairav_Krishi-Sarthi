import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;

    gsap.fromTo(
      hero,
      { scale: 1.05 },
      {
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          toggleActions: "play none none reverse", // No scrub for better perf
        },
      }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center px-4 md:px-16"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560493676-04071c5f467b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8fDA%3D')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-40" />

      {/* Hero Content */}
      <div className="relative z-10 text-white text-center md:text-left max-w-2xl">
        <h1
          ref={textRef}
          className="text-2xl md:text-6xl font-extrabold leading-tight"
        >
          <span className="text-yellow-200 block">Agriculture Matter</span>
          <span className="text-white block mt-2">Good Production</span>
        </h1>

        <p className="mt-4 text-base md:text-lg text-gray-100">
          Dissuade ecstatic and properly saw entirely six why laughter endeavor.
          In on my jointure horrible margaret suitable he speedily.
        </p>

        <button
          ref={buttonRef}
          className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition-transform transform hover:scale-105"
        >
          Discover More
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
