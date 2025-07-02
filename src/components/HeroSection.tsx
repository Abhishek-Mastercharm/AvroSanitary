import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

const HeroSection = () => {
  const logoRef = useRef(null);
  const headlineRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightImageRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const welcomeTextRef = useRef(null);

  const mobileImages = [
    { src: "/images/WC/1 (45).png", alt: "Product Left" },
    { src: "/images/WC/1 (22).png", alt: "Product Right" }
  ];

  useEffect(() => {
    // Welcome To animation
    const tl = gsap.timeline();
    tl.fromTo(leftLineRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.5 })
      .fromTo(rightLineRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '<')
      .fromTo(welcomeTextRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.3');

    gsap.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: 'back.out(1.7)' }
    );
    gsap.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo(
      taglineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power2.out' }
    );
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: 'power2.out' }
    );
    gsap.to(leftImgRef.current, {
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: leftImgRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    gsap.to(rightImageRef.current, {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: rightImageRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    gsap.fromTo(
      rightImageRef.current,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: 'back.out(1.7)' }
    );
  }, []);

  const handleScrollToProducts = () => {
    const section = document.getElementById('products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen h-screen flex flex-col justify-center items-center overflow-hidden px-2 py-2 pt-8 md:pt-0"
      style={{
        background: "linear-gradient(to bottom, #362977 0%, #29aae3 40%, #29aae3 70%, #fff 95%, #fff 100%)"
      }}
    >
      
      {/* Glassmorphism Effect Layer */}
      <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-2xl rounded-none pointer-events-none">

        {/* Bubble Animation Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <span className="absolute left-8 bottom-0 w-12 h-12 bg-red-400/40 rounded-full blur animate-bubble-float" />
          <span className="absolute left-1/3 bottom-0 w-10 h-10 bg-orange-400/40 rounded-full blur-md animate-bubble-float-slow" />
          <span className="absolute left-2/3 bottom-0 w-16 h-16 bg-yellow-300/40 rounded-full blur-lg animate-bubble-float-fast" />
          <span className="absolute left-3/4 bottom-0 w-8 h-8 bg-green-400/40 rounded-full blur-sm animate-bubble-float" />
          <span className="absolute left-1/4 bottom-0 w-12 h-12 bg-blue-400/40 rounded-full blur animate-bubble-float-slow" />
          <span className="absolute left-1/2 bottom-0 w-14 h-14 bg-indigo-400/40 rounded-full blur animate-bubble-float" />
          <span className="absolute left-[85%] bottom-0 w-10 h-10 bg-violet-400/40 rounded-full blur animate-bubble-float-fast" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 opacity-35">
          <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="heroNoiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="5" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#heroNoiseFilter)" />
          </svg>
        </div>
      </div>
      
      {/* Main Grid Content */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between md:gap-8 mt-2 md:mt-0">
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2">
          {/* Welcome to and Logo aligned */}
          <div className="flex flex-col items-center text-center mb-2">
            <div className="flex items-center justify-center mb-1">
              <span ref={leftLineRef} className="h-px w-12 bg-pureWhite opacity-60"></span>
              <span ref={welcomeTextRef} className="uppercase text-xs tracking-widest text-pureWhite font-semibold mx-3">Welcome to</span>
              <span ref={rightLineRef} className="h-px w-12 bg-pureWhite opacity-60"></span>
            </div>
            <img
              ref={logoRef}
              src="/AVRO LOGO WHITE.png"
              alt="AVRO Logo"
              className="h-20 md:h-32 lg:h-40 w-auto mb-2 drop-shadow-2xl"
            />
          </div>
          {/* Headline */}
          <div ref={headlineRef} className="mb-2 w-full text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-pureWhite">
              Elevating Spaces with
            </h1>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-cyan-950">
              Precision &amp; Elegance
            </h1>
          </div>
          <p ref={taglineRef} className="text-base md:text-lg text-cyan-950 mb-6 max-w-md mx-auto md:mx-0 text-center md:text-left">
            Explore our curated sanitaryware range with an immersive visual experience
          </p>
          <button
            ref={ctaRef}
            onClick={handleScrollToProducts}
            className="bg-pureWhite text-black font-semibold px-8 py-3 rounded-full shadow border-2 border-cyan-600 transition-all duration-300 hover:border-cyan-900 hover:bg-cyan-800 hover:text-white hover:shadow-lg flex items-center gap-2 mb-4 animate-bounce mt-2"
          >
            Discover Products <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex justify-center items-center w-full md:w-1/2 mt-2 md:mt-0 mb-4 md:mb-0">
          <img
            ref={rightImageRef}
            src="/images/Hero Section Img.jpg"
            alt="Hero Section Visual"
            className="w-full max-w-2xl h-auto max-h-[40vh] md:max-h-[60vh] object-contain rounded-xl mb-4 md:mb-0"
          />
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-goldenBronze rounded-full flex justify-center">
          <div className="w-1 h-3 bg-goldenBronze rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919501311070?text=Hello%2C%20I%20am%20interested%20in%20your%20products%21"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors duration-300 group animate-fadeInOut"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.58 2.236 6.37L4 29l7.824-2.05A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.77 0-3.468-.46-4.94-1.33l-.352-.207-4.646 1.217 1.24-4.527-.23-.36A9.94 9.94 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.29-7.71c-.29-.145-1.71-.844-1.974-.94-.264-.096-.456-.145-.648.146-.192.29-.744.94-.912 1.134-.168.193-.336.217-.624.072-.288-.145-1.216-.448-2.318-1.428-.857-.764-1.436-1.705-1.606-1.994-.168-.29-.018-.447.127-.592.13-.13.288-.336.432-.504.144-.168.192-.29.288-.483.096-.193.048-.362-.024-.507-.072-.145-.648-1.566-.888-2.146-.234-.563-.474-.486-.648-.495-.168-.007-.36-.009-.552-.009-.192 0-.504.072-.768.362-.264.29-1.008.984-1.008 2.396 0 1.412 1.032 2.773 1.176 2.965.144.193 2.032 3.104 4.928 4.23.688.297 1.224.474 1.642.606.69.22 1.32.189 1.818.115.555-.082 1.71-.698 1.953-1.372.24-.674.24-1.252.168-1.372-.072-.12-.264-.193-.552-.338z"/>
        </svg>
      </a>
    </section>
  );
};

export default HeroSection;
