import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import NotificationCenter from "./components/NotificationCenter";
import SkillsEndorsementSystem from "./components/SkillsEndorsementSystem";
import GamificationSystem from "./components/GamificationSystem";
import AIRecommendationEngine from "./components/AIRecommendationEngine";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfileSettings from "./pages/ProfileSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/alumni" element={<ProtectedRoute><EnhancedAlumniDirectory /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute><EnhancedJobBoard /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
          <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          <Route path="/mentorship" element={<ProtectedRoute><Mentorship /></ProtectedRoute>} />
          <Route path="/career-hub" element={<ProtectedRoute><CareerHub /></ProtectedRoute>} />
          <Route path="/events-hub" element={<ProtectedRoute><EventsHub /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationCenter /></ProtectedRoute>} />
          <Route path="/skills" element={<ProtectedRoute><SkillsEndorsementSystem /></ProtectedRoute>} />
          <Route path="/gamification" element={<ProtectedRoute><GamificationSystem /></ProtectedRoute>} />
          <Route path="/ai-recommendations" element={<ProtectedRoute><AIRecommendationEngine /></ProtectedRoute>} />
          <Route path="/profile-settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
