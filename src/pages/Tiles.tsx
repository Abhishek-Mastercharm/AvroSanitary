import React, { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { tileCategories, TileCategory, marbleCategories, MarbleCategory } from '@/data/TileData';
import TileImage from '../components/TileImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import LuxuryBackground from '../components/LuxuryBackground';
import WhatsAppButton from '../components/WhatsAppButton';
import LanguageSelector from '../components/LanguageSelector';

gsap.registerPlugin(ScrollTrigger);

const Tiles = () => {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState<'tiles' | 'marble'>('tiles');
    const [activeCategoryId, setActiveCategoryId] = useState<string>(tileCategories[0].id);
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rightContentRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    // Translation key mapping for categories
    const getCategoryTranslationKey = (categoryId: string): { name: string; desc: string } => {
        const keyMap: Record<string, { name: string; desc: string }> = {
            'small-tiles': { name: 'tiles.categories.smallTiles', desc: 'tiles.categories.smallTilesDesc' },
            'medium-tiles': { name: 'tiles.categories.mediumTiles', desc: 'tiles.categories.mediumTilesDesc' },
            'large-tiles': { name: 'tiles.categories.largeTiles', desc: 'tiles.categories.largeTilesDesc' },
            'extra-large-tiles': { name: 'tiles.categories.extraLargeTiles', desc: 'tiles.categories.extraLargeTilesDesc' },
            'full-body-tiles': { name: 'tiles.categories.fullBodyTiles', desc: 'tiles.categories.fullBodyTilesDesc' },
            'marble-collection': { name: 'tiles.categories.marble', desc: 'tiles.categories.marbleDesc' },
            'granite-collection': { name: 'tiles.categories.granite', desc: 'tiles.categories.graniteDesc' },
            'quartz-collection': { name: 'tiles.categories.quartz', desc: 'tiles.categories.quartzDesc' },
        };
        return keyMap[categoryId] || { name: categoryId, desc: categoryId };
    };

    // Optimized Data Access: Memoized to prevent re-calculations
    const activeCategories = useMemo(() =>
        activeSection === 'tiles' ? tileCategories : marbleCategories
        , [activeSection]);

    const activeCategoryData = useMemo(() => {
        if (activeSection === 'tiles') {
            return tileCategories.find((cat) => cat.id === activeCategoryId) || tileCategories[0];
        } else {
            return marbleCategories.find((cat) => cat.id === activeCategoryId) || marbleCategories[0];
        }
    }, [activeSection, activeCategoryId]);

    // 0. Update page title for SEO
    useEffect(() => {
        document.title = "Avro Original | Premium Tile Collection & Luxury Surfaces";
    }, []);

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

    // Optimized effect for Modal lifecycle and Keyboard navigation
    useEffect(() => {
        if (enlargedImage) {
            document.body.style.overflow = 'hidden';

            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setEnlargedImage(null);
            };
            window.addEventListener('keydown', handleEsc);
            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('keydown', handleEsc);
            };
        }
    }, [enlargedImage]);

    const handleCategoryClick = (categoryId: string) => {
        if (categoryId !== activeCategoryId) {
            setActiveCategoryId(categoryId);
        }
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

        // Mobile staircase sizes - refined for better visibility
        const mobileSizes = [
            'w-[65px] h-[65px] sm:w-[75px] sm:h-[75px]',
            'w-[75px] h-[75px] sm:w-[85px] sm:h-[85px]',
            'w-[85px] h-[85px] sm:w-[95px] sm:h-[95px]',
            'w-[95px] h-[95px] sm:w-[105px] sm:h-[105px]',
            'w-[105px] h-[105px] sm:w-[115px] sm:h-[115px]'
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
                role="tab"
                aria-selected={isActive}
                aria-label={`${category.name} collection`}
                className="relative cursor-pointer group/category transition-all duration-300 flex items-center justify-center"
                onClick={() => handleCategoryClick(category.id)}
            >
                <div
                    className="transition-all duration-500 flex items-center justify-center"
                    style={{
                        perspective: isMobile ? 'none' : '1200px',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <div className="relative shrink-0 group/image transform-gpu flex flex-col items-center">
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
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/image:scale-[1.05]"
                                />
                            </div>
                        </div>

                        {/* Category Label - Small Text */}
                        <div className={`mt-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-center whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#d4af37]' : 'text-[#555] group-hover/category:text-[#1a1a1c]'}`}>
                            {t(getCategoryTranslationKey(category.id).name)}
                        </div>

                        {/* Dotted connector line - Positioned to clear container boundaries */}
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
                                    className="w-3 h-3 rotate-45 border-b-2 border-r-2"
                                    style={{ borderColor: '#d4af37', marginTop: '-4px' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <main className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
            <LuxuryBackground isMobile={isMobile} />
            
            {/* Fixed Language Selector - Stays on scroll */}
            <LanguageSelector className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50" />
            
            {/* Hero Section - GPU Accelerated */}
            <section
                ref={heroRef}
                className="relative w-full will-change-transform"
                style={{ contentVisibility: 'visible' }}
            >
                <div className="relative w-full">
                    {/* Back Button - Inside hero section only, not sticky */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-[100]">
                        <a
                            href="/"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = '/';
                            }}
                            aria-label="Back to sanitary homepage"
                            className="group inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold tracking-wide cursor-pointer"
                            style={{ color: '#d4af37', pointerEvents: 'auto' }}
                        >
                            <ChevronLeft
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:-translate-x-0.5"
                                style={{ color: '#d4af37' }}
                            />
                            <span className="border-b border-transparent transition-colors duration-200" style={{ color: '#d4af37' }}>
                                {t('tiles.backToSanitary')}
                            </span>
                        </a>
                    </div>
                    <div
                        className={`relative overflow-hidden rounded-b-[2rem] sm:rounded-b-[2.5rem] ${isMobile ? 'h-[35vh]' : 'h-[45vh] sm:h-[50vh] lg:h-[55vh]'}`}
                        style={{ borderColor: '#d4af37', backgroundColor: '#222224', borderWidth: '3px', borderStyle: 'solid', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                    >
                        <div className="absolute inset-0 opacity-20 sm:opacity-30">
                            <TileImage
                                img={{
                                    src: '/TilesImages/tileHeroImg.webp',
                                    fallback: '/TilesImages/tileHeroImg.webp',
                                    alt: 'Premium tiles hero wallpaper',
                                }}
                                priority={true}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
                            <img
                                src="/AVRO LOGO GOLDEN.png"
                                alt="AVRO Tiles"
                                className="h-16 sm:h-20 md:h-24 lg:h-28 mb-4 w-auto object-contain drop-shadow-xl"
                            />
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-3xl leading-relaxed px-2" style={{ color: '#dbdcd7' }}>
                                {t('tiles.heroSubtitle')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Main Tiles Showcase Section - Performance Optimized */}
            <section
                className="relative z-10 pt-2 sm:pt-2 lg:pt-3 pb-3 sm:pb-4 lg:pb-6 px-3 sm:px-4 md:px-5 bg-transparent"
                style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1000px' } as any}
            >
                <div className="max-w-8xl mx-auto">
                    <div className="mb-4 sm:mb-5 lg:mb-7 text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 tracking-tight" style={{ color: '#d4af37' }}>
                            {t('tiles.ourCollection')}
                        </h2>
                        {/* Removed the line below the heading */}
                    </div>

                    {/* 1. Stylish Breadcrumb Navbar - Accessible TabList */}
                    <div className="flex justify-center mb-4 sm:mb-5">
                        <div
                            className="inline-flex rounded-xl overflow-hidden border"
                            style={{ borderColor: '#d4af37' }}
                            role="tablist"
                            aria-label="Product Categories"
                        >
                            <button
                                onClick={() => {
                                    setActiveSection('tiles');
                                    setActiveCategoryId(tileCategories[0].id);
                                }}
                                aria-selected={activeSection === 'tiles'}
                                role="tab"
                                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold transition-all duration-300 ${activeSection === 'tiles'
                                    ? 'text-[#1a1a1c]'
                                    : 'text-[#333333] hover:text-[#d4af37]'
                                    }`}
                                style={{
                                    backgroundColor: activeSection === 'tiles' ? '#d4af37' : 'white'
                                }}
                            >
                                {t('tiles.tilesTab')}
                            </button>
                            <button
                                onClick={() => {
                                    setActiveSection('marble');
                                    setActiveCategoryId(marbleCategories[0].id);
                                }}
                                aria-selected={activeSection === 'marble'}
                                role="tab"
                                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold transition-all duration-300 ${activeSection === 'marble'
                                    ? 'text-[#1a1a1c]'
                                    : 'text-[#333333] hover:text-[#d4af37]'
                                    }`}
                                style={{
                                    backgroundColor: activeSection === 'marble' ? '#d4af37' : 'white'
                                }}
                            >
                                {t('tiles.marbleTab')}
                            </button>
                        </div>
                    </div>

                    {/* ROW 1: HORIZONTAL STAIRCASE - Swiper for mobile, Flex for desktop */}
                    <div className="pt-2 sm:pt-3 mb-6 sm:mb-8 lg:mb-10">
                        {isMobile ? (
                            /* Mobile: Swiper with Navigation and Active Indicator Support */
                            <div className="relative px-8 sm:px-10">
                                <Swiper
                                    modules={[FreeMode, Pagination, Navigation]}
                                    spaceBetween={8}
                                    slidesPerView={3}
                                    breakpoints={{
                                        480: { slidesPerView: 3.5, spaceBetween: 10 },
                                        640: { slidesPerView: 4, spaceBetween: 12 },
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
                                    className="tiles-swiper swiper-staircase !overflow-visible"
                                    style={{ paddingBottom: '50px' }}
                                >
                                    {activeCategories.map((category, index) => (
                                        <SwiperSlide key={category.id} className="!flex !items-end !justify-center pb-2">
                                            {renderCategoryTile(category, index)}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Custom Navigation Arrows - High Visibility & Premium Style */}
                                <button
                                    type="button"
                                    onClick={() => swiperRef.current?.slidePrev()}
                                    className="absolute left-2 top-[35%] -translate-y-1/2 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                                    style={{ backgroundColor: '#d4af37', color: '#ffffff' }}
                                    aria-label="Previous Category"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => swiperRef.current?.slideNext()}
                                    className="absolute right-2 top-[35%] -translate-y-1/2 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                                    style={{ backgroundColor: '#d4af37', color: '#ffffff' }}
                                    aria-label="Next Category"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        ) : (
                            /* Desktop: Simple flex layout showing all categories */
                            <div className="flex items-end justify-center gap-2 lg:gap-3 xl:gap-4 px-2 lg:px-4">
                                {activeCategories.map((category, index) => (
                                    <div key={category.id}>
                                        {renderCategoryTile(category, index)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ROW 2: ACTIVE CATEGORY DETAILS */}
                    <div className="relative max-w-4xl mx-auto px-2 sm:px-0">
                        <div
                            ref={rightContentRef}
                            className="rounded-lg sm:rounded-xl border p-3 sm:p-4 lg:p-5 max-h-[80vh] sm:max-h-[75vh] lg:max-h-[90vh] overflow-y-auto custom-scrollbar relative"
                            style={{
                                borderColor: '#d4af37',
                                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 254, 243, 0.9))',
                                borderWidth: '1px'
                            }}
                        >
                            {/* Active Category Header */}
                            <div className="mb-3 sm:mb-4 lg:mb-5">
                                <div className="inline-block mb-2 sm:mb-3">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 tracking-tight uppercase" style={{ color: '#d4af37' }}>
                                        {t(getCategoryTranslationKey(activeCategoryId).name)}
                                    </h3>
                                    <div className="w-full h-0.5 bg-[#d4af37] rounded-full opacity-60"></div>
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-5 sm:h-6 bg-[#d4af37]"></div>
                                        <p className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: '#1a1a1c' }}>
                                            {activeCategoryData.sizeRange}
                                        </p>
                                    </div>
                                    <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium text-[#1a1a1c]/80">
                                        {t(getCategoryTranslationKey(activeCategoryId).desc)}
                                    </p>
                                </div>
                            </div>

                            {/* Size Variations - 2 sizes per row for compact view */}
                            <div key={activeCategoryId} className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 pb-4 sm:pb-5 lg:pb-6">
                                {activeCategoryData.sizes.map((size, sizeIdx) => (
                                    <div key={`${activeCategoryId}-${size.name}-${sizeIdx}`} className="group relative">
                                        {/* Single image for this size with Anchored Badge */}
                                        {size.images[0] && (
                                            <div
                                                className="aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group relative border-2 border-transparent hover:border-[#d4af37]/30 transition-all duration-500 shadow-sm hover:shadow-xl"
                                                onClick={() => setEnlargedImage(size.images[0].src)}
                                            >
                                                {/* Anchored Size Badge - Unmistakable Relation */}
                                                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20">
                                                    <div className="bg-[#1a1a1c]/80 backdrop-blur-md border border-[#d4af37]/40 px-2 sm:px-3 py-1 sm:py-1.5 rounded shadow-2xl flex items-center gap-1.5 sm:gap-2">
                                                        <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-[#d4af37]"></div>
                                                        <span className="text-[9px] sm:text-[11px] font-bold text-white tracking-widest uppercase">
                                                            {size.name} <span className="text-[#d4af37]">MM</span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <TileImage
                                                    key={`${activeCategoryId}-${size.name}-img`}
                                                    img={size.images[0]}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                    <div className="text-[9px] sm:text-[10px] text-center text-white font-bold tracking-[0.1em] uppercase">
                                                        {t('tiles.clickToEnlarge')}
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

            {/* Contact Section - Deferred Rendering */}
            <section
                className="py-3 sm:py-4 lg:py-6 px-2 sm:px-3 md:px-4"
                style={{
                    backgroundColor: 'transparent',
                    contentVisibility: 'auto',
                    containIntrinsicSize: '0 300px'
                } as any}
            >
                <div className="max-w-4xl lg:max-w-6xl mx-auto">
                    <div
                        className="rounded-lg sm:rounded-xl px-2 sm:px-3 md:px-4 lg:px-6 py-3 sm:py-4 md:py-5"
                        style={{
                            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 254, 243, 0.9))',
                            border: '1px solid #d4af37',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            boxShadow: '0 8px 32px rgba(212, 175, 55, 0.1)'
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6 md:gap-8 items-center">
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                                <div
                                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 group"
                                    style={{
                                        backgroundColor: 'rgba(212, 175, 55, 0.15)',
                                        border: '1px solid rgba(212, 175, 55, 0.4)',
                                        boxShadow: '0 4px 12px rgba(212, 175, 55, 0.15)'
                                    }}
                                >
                                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" style={{ color: '#d4af37' }} />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-xs font-bold tracking-wider mb-0.5 sm:mb-1 uppercase" style={{ color: '#8a8a8a' }}>
                                        Email
                                    </div>
                                    <div className="text-xs sm:text-sm md:text-base break-words font-semibold" style={{ color: '#1a1a1c' }}>
                                        marsexim@gmail.com
                                    </div>
                                </div>
                            </div>

                            <div
                                className="hidden md:block w-px h-10 sm:h-12 md:h-16 justify-self-center"
                                style={{
                                    background: 'linear-gradient(to bottom, transparent, #d4af37, transparent)',
                                    opacity: 1
                                }}
                            />

                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                                <div
                                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 group"
                                    style={{
                                        backgroundColor: 'rgba(212, 175, 55, 0.15)',
                                        border: '1px solid rgba(212, 175, 55, 0.4)',
                                        boxShadow: '0 4px 12px rgba(212, 175, 55, 0.15)'
                                    }}
                                >
                                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" style={{ color: '#d4af37' }} />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-xs font-bold tracking-wider mb-0.5 sm:mb-1 uppercase" style={{ color: '#8a8a8a' }}>
                                        Phone
                                    </div>
                                    <div className="text-xs sm:text-sm md:text-base break-words mb-0.5 sm:mb-1 font-semibold" style={{ color: '#1a1a1c' }}>
                                        +91 9501311070 | +91 8847418317 | +91 9779568485
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-3 sm:mt-4 lg:mt-5">
                        <div className="text-xs font-medium tracking-wider" style={{ color: '#1a1a1c', opacity: 0.6 }}>
                            © 2026 Avro Original | All Rights Reserved.
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Luxury CTA */}
            {/* Floating Luxury CTA Replaced with WhatsApp Button */}
            <WhatsAppButton phoneNumber="919501311070" position="bottom-right" />


            {/* Enlarged Image Overlay */}
            {enlargedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg overflow-auto flex items-center justify-center p-4"
                    onClick={() => setEnlargedImage(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Enlarged product view"
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
        </main>
    );
};

export default Tiles;
