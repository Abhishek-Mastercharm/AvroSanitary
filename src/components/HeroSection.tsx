import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Download } from 'lucide-react';
import emailjs from '@emailjs/browser';

// EmailJS config (replace with your actual IDs)
const EMAILJS_SERVICE_ID = 'CritcalMG';
const EMAILJS_TEMPLATE_ID = 'template_linh9hh';
const EMAILJS_PUBLIC_KEY = 'uAvpFcwPFU12wahTg';

function DownloadModal({ open, onClose, onDownload }: { open: boolean; onClose: () => void; onDownload: () => void }) {
  const [countryCode, setCountryCode] = useState('+91');
  const [countryOptions, setCountryOptions] = useState<{name: string, code: string}[]>([]);
  const [countryLoading, setCountryLoading] = useState(false);
  const [countryError, setCountryError] = useState('');
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setCountryLoading(true);
      setCountryError('');
      fetch('https://restcountries.com/v3.1/all?fields=name,idd')
        .then(res => res.json())
        .then(data => {
          // Flatten and sort country codes
          const options = data
            .map((c: any) => {
              const code = c.idd?.root && c.idd?.suffixes && c.idd.suffixes.length > 0
                ? c.idd.root + c.idd.suffixes[0]
                : null;
              return code ? { name: c.name.common, code } : null;
            })
            .filter(Boolean)
            .sort((a: any, b: any) => a.name.localeCompare(b.name));
          setCountryOptions(options);
          // Default to +91 if available, else first
          const defaultOption = options.find((o: any) => o.code === '+91') || options[0];
          setCountryCode(defaultOption?.code || '');
          setCountryLoading(false);
        })
        .catch(() => {
          setCountryError('Failed to load country codes');
          setCountryLoading(false);
        });
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!/^[0-9]{8,15}$/.test(contact)) {
      setError("Please enter a valid contact number");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-pureWhite rounded-2xl shadow-2xl p-8 w-full max-w-sm relative border-2 border-primary flex flex-col items-center">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-primary text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-primary">Download Catalogue</h2>
        {success ? (
          <div className="text-green-600 font-semibold text-center py-8">Thank you! Your request has been submitted.<br/>Download will start shortly.</div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label className="block text-sm font-medium mb-1 text-primary">Contact Number</label>
            <div className="flex gap-2">
              <select
                className="border border-accent rounded-lg px-2 py-2 bg-lightGray text-charcoalBlack focus:outline-none"
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                required
                style={{ maxWidth: 120 }}
                disabled={countryLoading || !!countryError}
              >
                {countryLoading && <option>Loading...</option>}
                {countryError && <option>{countryError}</option>}
                {!countryLoading && !countryError && countryOptions.map(opt => (
                  <option key={opt.code + opt.name} value={opt.code}>
                    {opt.name} ({opt.code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                className="flex-1 border border-accent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-charcoalBlack bg-lightGray"
                value={contact}
                onChange={e => setContact(e.target.value)}
                required
                pattern="[0-9]{8,15}"
                placeholder="Enter your contact number"
              />
            </div>
            {touched && !/^[0-9]{8,15}$/.test(contact) && (
              <span className="text-xs text-destructive">Enter a valid number (8-15 digits)</span>
            )}
          </div>
          {error && <div className="text-destructive text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-primary text-pureWhite py-2 rounded-lg font-semibold hover:bg-accent transition disabled:opacity-50 mt-2"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit & Download"}
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
          className="bg-pureWhite text-black font-semibold px-4 py-2 text-sm rounded-full shadow border border-cyan-600 transition-all duration-300 hover:border-cyan-900 hover:bg-cyan-800 hover:text-white hover:shadow-lg flex items-center gap-2 mb-8 animate-bounce mt-2 mx-auto"
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
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.58 2.236 6.37L4 29l7.824-2.05A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.77 0-3.468-.46-4.94-1.33l-.352-.207-4.646 1.217 1.24-4.527-.23-.36A9.94 9.94 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.29-7.71c-.29-.145-1.71-.844-1.974-.94-.264-.096-.456-.145-.648.146-.192.29-.744.94-.912 1.134-.168.193-.336.217-.624.072-.288-.145-1.216-.448-2.318-1.428-.857-.764-1.436-1.705-1.606-1.994-.168-.29-.018-.447.127-.592.13-.13.288-.336.432-.504.144-.168.192-.29.288-.483.096-.193.048-.362-.024-.507-.072-.145-.648-1.566-.888-2.146-.234-.563-.474-.486-.648-.495-.168-.007-.36-.009-.552-.009-.192 0-.504.072-.768.362-.264.29-1.008.984-1.008 2.396 0 1.412 1.032 2.773 1.176 2.965.144.193 2.032 3.104 4.928 4.23.688.297 1.224.474 1.642.606.69.22 1.32.189 1.818.115.555-.082 1.71-.698 1.953-1.372.24-.674.24-1.252.168-1.372-.072-.12-.264-.193-.552-.338z"/>
        </svg>
      </a>
    </section>
  );
};

export default HeroSection;
