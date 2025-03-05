
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import MainNav from "./components/MainNav";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Diagnosis from "./pages/Diagnosis";
import Calculator from "./pages/Calculator";
import Emergency from "./pages/Emergency";
import Resources from "./pages/Resources";
import JournalClub from "./pages/JournalClub";
import CaseMentor from "./pages/CaseMentor";
import PediatricChat from "./pages/PediatricChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="pediatricia-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainNav />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/diagnosis" element={<Diagnosis />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/journal-club" element={<JournalClub />} />
              <Route path="/case-mentor" element={<CaseMentor />} />
              <Route path="/pediatric-chat" element={<PediatricChat />} />
            </Routes>
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
