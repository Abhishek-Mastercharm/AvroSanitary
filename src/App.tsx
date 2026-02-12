import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChevronUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Lazy load pages for better performance
const Index = lazy(() => import('./pages/Index'));
const Tiles = lazy(() => import('./pages/Tiles'));
const DevError = lazy(() => import('./pages/DevError'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-goldenBronze"></div>
  </div>
);

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
    return (
      <Suspense fallback={<PageLoader />}>
        <DevError />
      </Suspense>
    );
  }
  if (window.location.pathname === "/tiles") {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<PageLoader />}>
            <Tiles />
          </Suspense>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }
  if (window.location.pathname !== "/" && window.location.pathname !== "/index") {
    return (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    );
  }
  return (
    <>
      {/* Main App Content */}
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<PageLoader />}>
            <Index />
          </Suspense>
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
