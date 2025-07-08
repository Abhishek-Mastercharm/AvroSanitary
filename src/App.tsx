import Index from "./pages/Index";
import DevError from "./pages/DevError";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LanguageSwitcher from './components/LanguageSwitcher';

const queryClient = new QueryClient();

const App = () => {
  if (window.location.pathname === "/deverror") {
    return <DevError />;
  }
  if (window.location.pathname !== "/" && window.location.pathname !== "/index") {
    return <NotFound />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageSwitcher />
        <Index />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
