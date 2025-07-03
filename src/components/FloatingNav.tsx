import React, { useState, useEffect } from 'react';
import { Home, User, Star, Package, Mail, Menu, X, Rocket } from 'lucide-react';

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [showNav, setShowNav] = useState(true);

  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'why-choose', icon: Star, label: 'Why Us' },
    { id: 'new-launch', icon: Rocket, label: 'New Launch' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'contact', icon: Mail, label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id) || document.querySelector(`[data-section="${item.id}"]`));
      const scrollPos = window.scrollY + 100;
      let found = false;

      sections.forEach((section, index) => {
        if (section) {
          const htmlElement = section as HTMLElement;
          const offsetTop = htmlElement.offsetTop;
          const offsetBottom = offsetTop + htmlElement.offsetHeight;

          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            setActiveSection(navItems[index].id);
            found = true;
          }
        }
      });

      // Fix: If at the very top, always set to 'hero'
      if (window.scrollY === 0) {
        setActiveSection('hero');
      } else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
        // If at the very bottom, set to 'contact'
        setActiveSection('contact');
      } else if (!found) {
        // Optionally, set to null or keep previous
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId) || document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed right-4 bottom-4 z-50 bg-pureWhite rounded-full shadow p-2"
        onClick={() => setShowNav((prev) => !prev)}
        aria-label={showNav ? 'Hide navigation' : 'Show navigation'}
      >
        {showNav ? <X className="w-6 h-6 text-primaryBrown" /> : <Menu className="w-6 h-6 text-primaryBrown" />}
      </button>
      {/* Floating Nav */}
      <nav
        className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-40 ${!showNav ? 'hidden' : ''}`}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative block p-3 rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-goldenBronze text-pureWhite'
                  : 'text-gray-600 hover:bg-lightGray hover:text-charcoalBlack'
              }`}
              title={item.label}
            >
              <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-pureWhite' : ''}`} />
              {/* Tooltip */}
              <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default FloatingNav;
