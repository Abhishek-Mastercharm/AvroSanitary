// pages/Tiles.tsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { tileCategories, TileCategory, marbleCategories, MarbleCategory } from '@/data/TileData';
import TileImage from '../components/TileImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

gsap.registerPlugin(ScrollTrigger);

const Tiles = () => {
    const [activeSection, setActiveSection] = useState<'tiles' | 'marble'>('tiles');
    const [activeCategoryId, setActiveCategoryId] = useState<string>(tileCategories[0].id);
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rightContentRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    // Get active data based on section
    const getActiveData = () => {
        if (activeSection === 'tiles') {
            return tileCategories.find((cat) => cat.id === activeCategoryId) || tileCategories[0];
        } else {
            return marbleCategories.find((cat) => cat.id === activeCategoryId) || marbleCategories[0];
        }
    };

    const activeCategories = activeSection === 'tiles' ? tileCategories : marbleCategories;
    const activeCategoryData = getActiveData();

    // 1. Update the mobile check to use tablet breakpoint too
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // Changed to show more on tablet
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
            );
        }

        categoryRefs.current.forEach((ref, index) => {
            if (ref) {
                gsap.fromTo(
                    ref,
                    {
                        opacity: 0,
                        x: isMobile ? 40 : 80,
                        scale: 0.95,
                        rotateY: isMobile ? 0 : -15
                    },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        rotateY: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: ref,
                            start: isMobile ? 'top 90%' : 'top 85%',
                            toggleActions: 'play none none none',
                            once: true
                        }
                    }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [activeCategoryId, isMobile, activeSection]);

    // Fix for category change not updating description
    useEffect(() => {
        // Force GSAP animations to update when category changes
        categoryRefs.current = [];
    }, [activeCategoryId]);

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategoryId(categoryId);
    };

    const renderCategoryTile = (category: TileCategory | MarbleCategory, index: number) => {
        // Staircase effect with increasing sizes aligned from bottom - SAME for desktop and mobile
        
        // Staircase sizes - increasing from left to right
        const desktopSizes = [
            'w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32',
            'w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36',
            'w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40',
            'w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44',
            'w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48'
        ];

        // Mobile staircase sizes - same staircase effect but smaller
        const mobileSizes = [
            'w-[55px] h-[55px]',
            'w-[65px] h-[65px]',
            'w-[75px] h-[75px]',
            'w-[85px] h-[85px]',
            'w-[95px] h-[95px]'
        ];

        // Use staircase effect for both mobile and desktop
        const stepImg = isMobile 
            ? (mobileSizes[index] || mobileSizes[0])
            : (desktopSizes[index] || desktopSizes[0]);
        const isActive = category.id === activeCategoryId;

        return (
            <div
                key={category.id}
                ref={(el) => (categoryRefs.current[index] = el)}
                className="relative cursor-pointer group/category transition-all duration-300 flex items-center justify-center"
                onClick={() => handleCategoryClick(category.id)}
            >
                <div
                    className="transition-all duration-500 flex items-center justify-center"
                    style={{
                        backgroundColor: 'transparent',
                        perspective: isMobile ? 'none' : '1000px'
                    }}
                >
                    <div className="relative shrink-0 group/image transform-gpu">
                        <div
                            className={`rounded-xl overflow-hidden ${stepImg} transition-all duration-500 transform-gpu ${isActive
                                    ? 'ring-4 ring-offset-2 ring-offset-[#ffffff] ring-[#d4af37]'
                                    : 'ring-1 ring-transparent'
                                }`}
                            style={{
                                backgroundColor: '#f5f5f5',
                                border: `${isActive ? '3px' : '2px'} solid ${isActive ? '#d4af37' : '#e0e0e0'}`,
                                transformStyle: isMobile ? 'flat' : 'preserve-3d'
                            }}
                        >
                            <div className="w-full h-full overflow-hidden">
                                <TileImage
                                    img={category.images[0]}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-[1.1]"
                                />
                            </div>
                        </div>
                        {/* Dotted connector line for active state */}
                        {isActive && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full flex flex-col items-center pt-1 z-50 pointer-events-none">
                                <div 
                                    className="w-2 h-2 rounded-full" 
                                    style={{ backgroundColor: '#d4af37' }}
                                />
                                <div 
                                    className="w-0.5 h-5 sm:h-6 lg:h-8" 
                                    style={{ 
                                        backgroundImage: 'linear-gradient(to bottom, #d4af37 50%, transparent 50%)',
                                        backgroundSize: '2px 6px'
                                    }}
                                />
                                <div 
                                    className="w-2.5 h-2.5 rotate-45 border-b-2 border-r-2" 
                                    style={{ borderColor: '#d4af37', marginTop: '-5px' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
            {/* Hero Section - Reduced height to show Collection section */}
            <section
                ref={heroRef}
                className="relative min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] lg:min-h-[50vh] flex items-cente   r justify-center pt-4 sm:pt-6 lg:pt-8"
                
            >
                <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                                        <div className="absolute top-4 left-8 md:top-6 md:left-12 z-20">
                                                <a
                                                    href="/"
                                                    aria-label="Back to sanitary homepage"
                                                    className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold tracking-wide"
                                                    style={{ color: '#d4af37' }}
                                                >
                                                    <ChevronLeft
                                                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:-translate-x-0.5"
                                                        style={{ color: '#d4af37' }}
                                                    />
                                                    <span className="border-b border-transparent transition-colors duration-200" style={{
                                                        borderBottomColor: 'transparent'
                                                    }}>
                                                        Back to Sanitary
                                                    </span>
                                                </a>
                                        </div>
                    <div
                        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl ${isMobile ? 'h-[30vh]' : 'h-[45vh] sm:h-[50vh] lg:h-[55vh]'}`}
                        style={{ borderColor: '#d4af37', backgroundColor: '#222224', borderWidth: '3px', borderStyle: 'solid' }}
                    >
                        <div className="absolute inset-0 opacity-20 sm:opacity-30">
                            <TileImage
                                img={{
                                    src: '/TilesImages/tileHeroImg.png',
                                    fallback: '/TilesImages/tileHeroImg.png',
                                    alt: 'Premium tiles hero wallpaper',
                                }}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 tracking-tight" style={{ color: '#d4af37' }}>
                                AVRO Tiles
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-3xl leading-relaxed px-2" style={{ color: '#dbdcd7' }}>
                                Premium Tile Collection & Luxury Surfaces
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Tiles Showcase Section */}
            <section className="py-6 sm:py-8 lg:py-10 px-3 sm:px-4 md:px-6" style={{ backgroundColor: '#ffffff' }}>
                <div className="max-w-8xl mx-auto">
                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight" style={{ color: '#d4af37' }}>
                            Our Collection
                        </h2>
                        {/* Removed the line below the heading */}
                    </div>

                    {/* 1. Stylish Breadcrumb Navbar - Removed numbers */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                        <div className="inline-flex rounded-xl overflow-hidden border" style={{ borderColor: '#d4af37' }}>
                            <button
                                onClick={() => {
                                    setActiveSection('tiles');
                                    setActiveCategoryId(tileCategories[0].id);
                                }}
                                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-300 ${
                                    activeSection === 'tiles'
                                        ? 'text-[#ffffff]'
                                        : 'text-[#333333] hover:text-[#d4af37]'
                                }`}
                                style={{
                                    backgroundColor: activeSection === 'tiles' ? '#d4af37' : 'transparent'
                                }}
                            >
                                Tiles
                            </button>
                            <button
                                onClick={() => {
                                    setActiveSection('marble');
                                    setActiveCategoryId(marbleCategories[0].id);
                                }}
                                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-300 ${
                                    activeSection === 'marble'
                                        ? 'text-[#ffffff]'
                                        : 'text-[#333333] hover:text-[#d4af37]'
                                }`}
                                style={{
                                    backgroundColor: activeSection === 'marble' ? '#d4af37' : 'transparent'
                                }}
                            >
                                Marble & Stones
                            </button>
                        </div>
                    </div>

                    {/* ROW 1: HORIZONTAL STAIRCASE - Swiper for mobile, Flex for desktop */}
                    <div className="pt-2 sm:pt-4 mb-8 sm:mb-10 lg:mb-14">
                        {isMobile ? (
                            /* Mobile: Swiper with navigation */
                            <div className="relative px-8 sm:px-10 overflow-hidden">
                                <Swiper
                                    modules={[FreeMode, Pagination, Navigation]}
                                    spaceBetween={8}
                                    slidesPerView={3.5}
                                    breakpoints={{
                                        480: { slidesPerView: 4, spaceBetween: 8 },
                                        640: { slidesPerView: 4.5, spaceBetween: 10 },
                                    }}
                                    centeredSlides={false}
                                    loop={false}
                                    navigation={false}
                                    onSwiper={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                    }}
                                    onSlideChange={(swiper) => {
                                        const realIndex = swiper.realIndex;
                                        if (activeCategories[realIndex]) {
                                            setActiveCategoryId(activeCategories[realIndex].id);
                                        }
                                    }}
                                    className="tiles-swiper swiper-staircase"
                                    style={{ paddingBottom: '30px' }}
                                >
                                    {activeCategories.map((category, index) => (
                                        <SwiperSlide key={category.id} className="!flex !items-center !justify-center">
                                            {renderCategoryTile(category, index)}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                {/* Custom Navigation Arrows for Mobile */}
                                <button
                                    type="button"
                                    onClick={() => swiperRef.current?.slidePrev()}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                                    style={{
                                        backgroundColor: '#d4af37',
                                        color: '#ffffff'
                                    }}
                                >
                                    <ChevronLeft size={14} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => swiperRef.current?.slideNext()}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                                    style={{
                                        backgroundColor: '#d4af37',
                                        color: '#ffffff'
                                    }}
                                >
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        ) : (
                            /* Desktop: Simple flex layout showing all categories */
                            <div className="flex items-end justify-center gap-4 lg:gap-6 xl:gap-8 px-4 lg:px-8">
                                {activeCategories.map((category, index) => (
                                    <div key={category.id}>
                                        {renderCategoryTile(category, index)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ROW 2: ACTIVE CATEGORY DETAILS */}
                    <div className="relative max-w-4xl mx-auto px-3 sm:px-0">
                        <div
                            ref={rightContentRef}
                            className="rounded-xl sm:rounded-2xl border p-4 sm:p-5 lg:p-6 max-h-[80vh] sm:max-h-[75vh] lg:max-h-[90vh] overflow-y-auto custom-scrollbar relative"
                            style={{
                                borderColor: '#d4af37',
                                backgroundColor: 'rgba(245, 245, 245, 0.98)',
                                borderWidth: '1px'
                            }}
                        >
                            {/* Active Category Header */}
                            <div className="mb-4 sm:mb-5 lg:mb-6">
                                <div className="inline-block mb-3 sm:mb-4">
                                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 tracking-tight" style={{ color: '#d4af37' }}>
                                        {activeCategoryData.name}
                                    </h3>
                                    <div className="w-12 sm:w-16 lg:w-20 h-1" style={{ backgroundColor: '#d4af37' }}></div>
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-1.5 h-4 sm:h-5 md:h-6 rounded-full" style={{ backgroundColor: '#d4af37' }}></div>
                                        <p className="text-base sm:text-lg md:text-xl font-semibold" style={{ color: '#333333' }}>
                                            {activeCategoryData.sizeRange}
                                        </p>
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ color: '#333333', opacity: 0.9 }}>
                                        {activeCategoryData.description}
                                    </p>
                                </div>
                            </div>

                            {/* Size Variations - 2 sizes per row for compact view */}
                            <div key={activeCategoryId} className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6 pb-8 sm:pb-10 lg:pb-12">
                                {activeCategoryData.sizes.map((size, sizeIdx) => (
                                    <div key={`${activeCategoryId}-${size.name}-${sizeIdx}`} className="space-y-2 sm:space-y-3">
                                        {/* Size label */}
                                        <h4 className="text-xs sm:text-sm md:text-base font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg inline-block" style={{
                                            color: '#d4af37',
                                            backgroundColor: 'rgba(212, 175, 55, 0.08)',
                                            border: '1px solid rgba(212, 175, 55, 0.15)'
                                        }}>
                                            {size.name}
                                        </h4>
                                        
                                        {/* Single image for this size */}
                                        {size.images[0] && (
                                            <div
                                                className="aspect-square rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group relative"
                                                style={{
                                                    backgroundColor: '#f5f5f5',
                                                    border: '1px solid rgba(212, 175, 55, 0.1)'
                                                }}
                                                onClick={() => setEnlargedImage(size.images[0].src)}
                                            >
                                                <TileImage
                                                    key={`${activeCategoryId}-${size.name}-img`}
                                                    img={size.images[0]}
                                                    className="w-full h-full object-cover transition-all duration-400 group-hover:scale-[1.05]"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                                                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                                                    <div className="text-xs sm:text-sm text-center text-white font-medium tracking-wide">
                                                        Click to enlarge
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <style>{`
                            .custom-scrollbar::-webkit-scrollbar {
                                width: 6px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-track {
                                background: rgba(240, 240, 240, 0.3);
                                border-radius: 8px;
                                margin: 2px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb {
                                background: linear-gradient(to bottom, 
                                    rgba(212, 175, 55, 0.6), 
                                    rgba(212, 175, 55, 0.8)
                                );
                                border-radius: 8px;
                                border: 1px solid rgba(245, 245, 245, 0.3);
                                background-clip: padding-box;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: linear-gradient(to bottom, 
                                    rgba(212, 175, 55, 0.8), 
                                    rgba(212, 175, 55, 1)
                                );
                            }
                            .custom-scrollbar::-webkit-scrollbar-corner {
                                background: transparent;
                            }
                            
                            /* Firefox */
                            .custom-scrollbar {
                                scrollbar-width: thin;
                                scrollbar-color: rgba(212, 175, 55, 0.8) rgba(240, 240, 240, 0.3);
                            }
                            
                            /* Smooth scrolling */
                            .custom-scrollbar {
                                scroll-behavior: smooth;
                            }
                            
                            /* Swiper pagination bullets */
                            .tiles-swiper .swiper-pagination-bullet {
                                background-color: rgba(212, 175, 55, 0.3);
                                opacity: 1;
                            }
                            .tiles-swiper .swiper-pagination-bullet-active {
                                background-color: #d4af37;
                            }
                            
                            /* Swiper overflow visible for connector */
                            .tiles-swiper,
                            .tiles-swiper .swiper-wrapper,
                            .tiles-swiper .swiper-slide {
                                overflow: visible !important;
                            }
                        `}</style>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-6 sm:py-8 lg:py-10 px-3 sm:px-4 md:px-6" style={{ backgroundColor: '#ffffff' }}>
                <div className="max-w-4xl lg:max-w-6xl mx-auto">
                    <div
                        className="rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6"
                        style={{
                            backgroundColor: 'rgba(245, 245, 245, 0.95)',
                            border: '1px solid rgba(212, 175, 55, 0.4)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)'
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6 md:gap-8 items-center">
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                                <div
                                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                                    style={{
                                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                        border: '1px solid rgba(212, 175, 55, 0.4)',
                                        boxShadow: '0 4px 12px rgba(212, 175, 55, 0.1)'
                                    }}
                                >
                                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: '#d4af37' }} />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-xs font-bold tracking-wider mb-0.5 sm:mb-1" style={{ color: '#333333' }}>
                                        EMAIL
                                    </div>
                                    <div className="text-xs sm:text-sm md:text-base break-words" style={{ color: '#333333', opacity: 0.95 }}>
                                        marsexim@gmail.com
                                    </div>
                                </div>
                            </div>

                            <div
                                className="hidden md:block w-px h-10 sm:h-12 md:h-16 justify-self-center"
                                style={{
                                    backgroundColor: 'rgba(212, 175, 55, 0.25)',
                                    boxShadow: '0 0 4px rgba(212, 175, 55, 0.3)'
                                }}
                            />

                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                                <div
                                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                                    style={{
                                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                        border: '1px solid rgba(212, 175, 55, 0.4)',
                                        boxShadow: '0 4px 12px rgba(212, 175, 55, 0.1)'
                                    }}
                                >
                                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: '#d4af37' }} />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-xs font-bold tracking-wider mb-0.5 sm:mb-1" style={{ color: '#333333' }}>
                                        PHONE
                                    </div>
                                    <div className="text-xs sm:text-sm md:text-base break-words mb-0.5 sm:mb-1" style={{ color: '#333333', opacity: 0.95 }}>
                                        +91 9779568485 | +91 7087255317
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-4 sm:mt-5 lg:mt-6">
                        <div className="text-xs font-medium tracking-wider" style={{ color: '#333333', opacity: 0.7 }}>
                            © 2026 Avro Original | All Rights Reserved.
                        </div>
                    </div>
                </div>
            </section>

            {/* Enlarged Image Overlay */}
            {enlargedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg overflow-auto"
                    onClick={() => setEnlargedImage(null)}
                >
                    <button
                        className="fixed top-2 sm:top-4 md:top-6 right-2 sm:right-4 md:right-8 z-50 text-white hover:text-gray-300 transition-all duration-300 hover:scale-110 bg-black/30 backdrop-blur-sm rounded-full p-1 sm:p-2"
                        onClick={() => setEnlargedImage(null)}
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9" />
                    </button>

                    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
                        <div
                            className="relative max-w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={enlargedImage}
                                alt="Enlarged tile"
                                className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-lg sm:rounded-xl shadow-2xl"
                            />
                            <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 lg:-inset-12 bg-gradient-to-r from-transparent via-transparent to-transparent blur-xl opacity-20 -z-10"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tiles;
