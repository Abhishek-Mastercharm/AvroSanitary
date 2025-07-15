import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import ContactSection from '@/components/ContactSection';
import NewLaunchSection from '@/components/NewLaunchSection';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.fade-in-row').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-white">
      <HeroSection />
      <NewLaunchSection />
      <ProductSection />
      <ContactSection />
    </div>
  );
};

export default Index;
