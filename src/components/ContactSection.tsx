import React, { useState } from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    
    // Show success message (you could use a toast here)
    alert('Thank you for your inquiry! We will get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section
      id="contact"
      className="fade-in-row py-5 px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #fff 20%, #29aae3 30%, #29aae3 60%, #362977 100%)"
      }}
    >
      {/* Glassmorphism Effect Layer */}
      <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-2xl pointer-events-none">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
          <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="contactNoiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="5" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#contactNoiseFilter)" />
          </svg>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative bg-white/80 backdrop-blur-lg border border-white/40 p-8 rounded-lg shadow-xl w-full max-w-7xl animate-fade-in overflow-hidden">
        
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
          {/* Glass Texture Overlay */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
            <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </div>
          {/* Decorative Accent */}
          <h3 className="text-2xl font-bold text-black mb-1 text-center">Get In Touch</h3>
          <div className="flex justify-center mb-2">
            <span className="inline-block w-16 h-1 rounded-full bg-goldenBronze/80"></span>
          </div>
          <p className="text-sm font-normal text-black mb-6 text-center">
          Ready to transform your space? Contact us for premium sanitaryware solutions
        </p>
          <div className="flex flex-row gap-8 md:gap-12 justify-center items-stretch flex-wrap md:divide-x md:divide-goldenBronze/20">
            {/* Email */}
            <div className="flex flex-row items-center gap-4 flex-1 min-w-[200px] group px-2 md:px-6">
              <div className="w-12 h-12 bg-goldenBronze/10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <Mail className="w-6 h-6 text-goldenBronze transition-colors duration-300 group-hover:text-primaryBrown" />
              </div>
              <div>
                <p className="font-semibold text-black">Email</p>
                <p className="text-black">info@meoverseas.com</p>
              </div>
            </div>
            {/* Phone */}
            <div className="flex flex-row items-center gap-4 flex-1 min-w-[200px] group px-2 md:px-6">
              <div className="w-12 h-12 bg-goldenBronze/10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <Phone className="w-6 h-6 text-goldenBronze transition-colors duration-300 group-hover:text-primaryBrown" />
              </div>
              <div>
                <p className="font-semibold text-black">Phone</p>
                <p className="text-black">+91 9501311070</p>
              </div>
            </div>
            {/* WhatsApp */}
            <div className="flex flex-row items-center gap-4 flex-1 min-w-[200px] group px-2 md:px-6">
              <div className="w-12 h-12 bg-goldenBronze/10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <MessageCircle className="w-6 h-6 text-goldenBronze transition-colors duration-300 group-hover:text-primaryBrown" />
              </div>
              <div>
                <p className="font-semibold text-black">WhatsApp</p>
                <p className="text-black">+91 9501311070</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full flex justify-center mt-4 z-10 relative">
        <p className="text-sm text-white/80 text-center w-full">
          © {new Date().getFullYear()} Avro Original | All Rights Reserved.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
