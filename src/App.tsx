import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Alumni from "./pages/Alumni";
import EnhancedAlumniDirectory from "./components/EnhancedAlumniDirectory";
import Jobs from "./pages/Jobs";
import EnhancedJobBoard from "./components/EnhancedJobBoard";
import Events from "./pages/Events";
import News from "./pages/News";
import Messages from "./pages/Messages";
import Mentorship from "./pages/Mentorship";
import CareerHub from "./pages/CareerHub";
import EventsHub from "./pages/EventsHub";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alumni" element={<EnhancedAlumniDirectory />} />
          <Route path="/jobs" element={<EnhancedJobBoard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/career-hub" element={<CareerHub />} />
          <Route path="/events-hub" element={<EventsHub />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
