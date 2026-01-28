/** @jsxImportSource react */
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Download, X, Phone, Search, ChevronDown, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

// EmailJS config (replace with your actual IDs)
const EMAILJS_SERVICE_ID = 'service_q04xjhj';
const EMAILJS_TEMPLATE_ID = 'template_vsqunkg';
const EMAILJS_PUBLIC_KEY = 'PA4ouZXrSJ0WNTVlH';

function DownloadModal({ open, onClose, onDownload }: { open: boolean; onClose: () => void; onDownload: () => void }) {
  const [countryCode, setCountryCode] = useState('+91');
  const [selectedCountry, setSelectedCountry] = useState<{ name: string, code: string, flag: string } | null>(null);
  const [countryOptions, setCountryOptions] = useState<{ name: string, code: string, flag: string }[]>([]);
  const [countryLoading, setCountryLoading] = useState(false);
  const [countryError, setCountryError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [success, setSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      setCountryLoading(true);
      setCountryError('');
      fetch('https://restcountries.com/v3.1/all?fields=name,idd,flags')
        .then(res => res.json())
        .then(data => {
          // Flatten and sort country codes
          const options = data
            .map((c: any) => {
              const code = c.idd?.root && c.idd?.suffixes && c.idd.suffixes.length > 0
                ? c.idd.root + c.idd.suffixes[0]
                : null;
              return code ? { name: c.name.common, code, flag: c.flags?.png || c.flags?.svg || '' } : null;
            })
            .filter((o: any) => o && o.flag)
            .sort((a: any, b: any) => a.name.localeCompare(b.name));
          setCountryOptions(options);
          // Default to +91 if available, else first
          const defaultOption = options.find((o: any) => o.code === '+91' && o.name === 'India') || options.find((o: any) => o.code === '+91') || options[0];
          setCountryCode(defaultOption?.code || '');
          setSelectedCountry(defaultOption || null);
          setCountryLoading(false);
        })
        .catch(() => {
          setCountryError('Failed to load country codes');
          setCountryLoading(false);
        });
    }
  }, [open]);

  const validatePhone = (num: string) => {
    if (!num) return "Contact number is required";

    // Global length check (supports various international standards)
    if (num.length < 6 || num.length > 15) return "Enter a valid number (6-15 digits)";

    // Country Specific: India (+91) - Strict 10-digit validation
    if (countryCode === '+91') {
      if (num.length !== 10) return "Indian numbers must be exactly 10 digits";
      if (!/^[6-9]/.test(num)) return "Indian numbers must start with 6, 7, 8, or 9";
    }

    // Heuristic for all countries: Block simple repetitive/sequential patterns
    if (/^(\d)\1+$/.test(num)) return "Please enter a valid, non-repetitive number";

    const sequential = "01234567890 09876543210 123456789";
    if (num.length >= 6 && (sequential.includes(num) || sequential.split('').reverse().join('').includes(num))) {
      return "Please enter a valid, non-sequential number";
    }

    // Pattern check: Block sub-pattern repeats (e.g., 121212)
    if (num.length >= 6) {
      for (let len = 2; len <= Math.floor(num.length / 2); len++) {
        const sub = num.slice(0, len);
        if (num.split(sub).join('').length === 0) return "Please enter a valid personal number";
      }
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const validationError = validatePhone(contact);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          contact_number: `${countryCode} ${contact}`,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        onDownload();
      }, 1200);
    } catch (err) {
      setError("Failed to send. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoalBlack/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-md relative border border-white/20 flex flex-col items-center">
        {/* Isolated Background Decoration (Clipping handled here) */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <button
          className="absolute top-4 right-4 text-charcoalBlack/30 hover:text-cyan-600 transition-all bg-lightGray/50 hover:bg-lightGray rounded-full w-10 h-10 flex items-center justify-center font-medium shadow-sm active:scale-95"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-cyan-600" />
          </div>
          <h2 className="text-2xl font-bold text-charcoalBlack tracking-tight">Download Our Catalogue</h2>
          <p className="text-sm text-charcoalBlack/60 mt-2">Get our latest collection directly to your device</p>
        </div>
        {success ? (
          <div className="text-center py-8">
            <div className="text-green-600 font-bold text-lg mb-2">Success!</div>
            <p className="text-charcoalBlack/80 text-sm mb-4">
              Catalogue requested for:<br />
              <span className="font-bold text-primary">{countryCode} {contact}</span>
            </p>
            <div className="text-xs text-gray-500">Starting download...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 w-full relative z-10">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-charcoalBlack/70 ml-1">Contact Number</label>
              <div className="flex gap-2 items-start relative">
                {/* Custom Searchable Dropdown */}
                <div className="relative" style={{ width: '40%', minWidth: '120px' }} ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    disabled={countryLoading || !!countryError}
                    className="w-full flex items-center justify-between border border-charcoalBlack/10 rounded-xl px-3 py-3.5 bg-white text-charcoalBlack focus:outline-none focus:ring-2 focus:ring-cyan-500/20 appearance-none cursor-pointer text-xs sm:text-sm font-semibold transition-all shadow-sm disabled:opacity-50"
                  >
                    <span className="flex items-center gap-2 overflow-hidden truncate">
                      {selectedCountry ? (
                        <>
                          <img
                            src={selectedCountry.flag}
                            alt=""
                            className="w-5 h-3.5 object-cover rounded-[2px] bg-gray-100 shadow-sm"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://flagcdn.com/w20/un.png";
                            }}
                          />
                          <span className="truncate">{selectedCountry.code}</span>
                        </>
                      ) : (
                        "Select"
                      )}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-charcoalBlack/40 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[220px] sm:w-[260px] bg-white rounded-2xl shadow-2xl border border-charcoalBlack/5 overflow-hidden z-[60] animate-in zoom-in-95 fade-in duration-200 backdrop-blur-xl bg-white/95">
                      <div className="p-2 border-b border-charcoalBlack/5 bg-lightGray/30">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoalBlack/40" />
                          <input
                            type="text"
                            placeholder="Search country..."
                            className="w-full bg-white border-none rounded-lg py-2 pl-8 pr-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/10 text-charcoalBlack placeholder:text-charcoalBlack/30"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="max-h-[200px] overflow-y-auto custom-scrollbar p-1">
                        {countryOptions
                          .filter(opt =>
                            opt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            opt.code.includes(searchQuery)
                          )
                          .map((opt, idx) => (
                            <div
                              key={`${opt.name}-${opt.code}-${idx}`}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-xs font-medium group hover:bg-cyan-50 ${countryCode === opt.code && selectedCountry?.name === opt.name ? 'bg-cyan-50/50 text-cyan-700' : 'text-charcoalBlack/80'
                                }`}
                              onClick={() => {
                                setCountryCode(opt.code);
                                setSelectedCountry(opt);
                                setIsDropdownOpen(false);
                                setSearchQuery('');
                              }}
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <img
                                  src={opt.flag}
                                  alt={opt.name}
                                  loading="lazy"
                                  className="w-5 h-3.5 object-cover rounded-[2px] shrink-0 bg-gray-100 shadow-sm"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://flagcdn.com/w20/un.png";
                                  }}
                                />
                                <span className="truncate">{opt.name}</span>
                                <span className="text-charcoalBlack/40 group-hover:text-cyan-600/60 font-normal shrink-0">({opt.code})</span>
                              </div>
                              {countryCode === opt.code && selectedCountry?.name === opt.name && (
                                <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                              )}
                            </div>
                          ))}
                        {countryOptions.filter(opt =>
                          opt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opt.code.includes(searchQuery)
                        ).length === 0 && (
                            <div className="px-3 py-8 text-center text-xs text-charcoalBlack/40">
                              No countries found
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative flex-1 group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <Phone className={`w-3.5 h-3.5 ${touched && validatePhone(contact) ? 'text-red-400' : 'text-cyan-600'}`} />
                  </div>
                  <input
                    type="tel"
                    value={contact}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val.length <= 15) {
                        setContact(val);
                        if (error) setError("");
                      }
                    }}
                    required
                    placeholder="Number"
                    className={`w-full border rounded-xl pl-9 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-charcoalBlack bg-white text-xs sm:text-sm font-semibold transition-all shadow-sm ${touched && validatePhone(contact) ? "border-red-400 ring-2 ring-red-500/10" : "border-charcoalBlack/10 focus:border-cyan-500/50"
                      }`}
                  />
                </div>
              </div>
              {touched && validatePhone(contact) && (
                <span className="text-[11px] text-red-500 mt-2 block font-medium ml-1">
                  {validatePhone(contact)}
                </span>
              )}
            </div>
            {error && <div className="text-red-500 text-xs font-medium text-center bg-red-50 py-2 rounded-lg border border-red-100">{error}</div>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform active:scale-[0.98] disabled:opacity-50 mt-2 text-sm tracking-wide shadow-md"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Download Now"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

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
  const [modalOpen, setModalOpen] = useState(false);

  const handleDownload = () => {
    // Trigger file download after modal submit
    const link = document.createElement("a");
    link.href = "/pdfs/novo.pdf";
    link.download = "AVRO-Catalogue.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      {/* Main Content Centered */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-6 mt-2 md:mt-0">
        {/* Logo Centered and Large with Top Margin */}
        <img
          ref={logoRef}
          src="/AVRO LOGO WHITE.png"
          alt="AVRO Logo"
          className="h-20 sm:h-28 md:h-32 lg:h-40 w-auto mt-8 mb-2 drop-shadow-2xl mx-auto"
        />
        {/* Hero Image Full Width and Responsive */}
        <img
          ref={rightImageRef}
          src="/images/ProductHeroSection.png"
          alt="Hero Section Visual"
          className="w-screen max-w-none h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] object-contain rounded-2xl drop-shadow-2xl"
        />
        {/* Download Product Catalogue Button Small */}
        <button
          ref={ctaRef}
          className="bg-pureWhite text-black font-semibold px-4 py-2 text-sm rounded-full shadow border border-cyan-600 transition-all duration-300 hover:border-cyan-900 hover:bg-cyan-800 hover:text-white hover:shadow-lg flex items-center gap-2 mb-4 animate-bounce mt-2 mx-auto"
          onClick={() => setModalOpen(true)}
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-100 mr-2">
            <Download className="w-4 h-4 text-cyan-600" />
          </span>
          Download Product Catalogue
        </button>
      </div>
      <DownloadModal open={modalOpen} onClose={() => setModalOpen(false)} onDownload={handleDownload} />
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919501311070?text=Hello%2C%20I%20am%20interested%20in%20your%20products%21"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 top-3 right-3 sm:top-5 sm:right-5 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-2 sm:p-4 flex items-center justify-center transition-colors duration-300 group animate-fadeInOut"
        aria-label="WhatsApp"
        title="Contact us on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.58 2.236 6.37L4 29l7.824-2.05A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.77 0-3.468-.46-4.94-1.33l-.352-.207-4.646 1.217 1.24-4.527-.23-.36A9.94 9.94 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.29-7.71c-.29-.145-1.71-.844-1.974-.94-.264-.096-.456-.145-.648.146-.192.29-.744.94-.912 1.134-.168.193-.336.217-.624.072-.288-.145-1.216-.448-2.318-1.428-.857-.764-1.436-1.705-1.606-1.994-.168-.29-.018-.447.127-.592.13-.13.288-.336.432-.504.144-.168.192-.29.288-.483.096-.193.048-.362-.024-.507-.072-.145-.648-1.566-.888-2.146-.234-.563-.474-.486-.648-.495-.168-.007-.36-.009-.552-.009-.192 0-.504.072-.768.362-.264.29-1.008.984-1.008 2.396 0 1.412 1.032 2.773 1.176 2.965.144.193 2.032 3.104 4.928 4.23.688.297 1.224.474 1.642.606.69.22 1.32.189 1.818.115.555-.082 1.71-.698 1.953-1.372.24-.674.24-1.252.168-1.372-.072-.12-.264-.193-.552-.338z" />
        </svg>
      </a>
    </section>
  );
};

export default HeroSection;
