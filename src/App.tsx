import Index from "./pages/Index";
import DevError from "./pages/DevError";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChevronUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const queryClient = new QueryClient();

const App = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (window.location.pathname === "/deverror") {
    return <DevError />;
  }
  if (window.location.pathname !== "/" && window.location.pathname !== "/index") {
    return <NotFound />;
  }
  return (
    <>
      {/* Main App Content */}
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Index />
        </TooltipProvider>
      </QueryClientProvider>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-6 right-6 z-50 bg-goldenBronze text-white p-3 rounded-full shadow-lg hover:bg-primaryBrown transition-all flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default App;
