import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  GraduationCap, 
  Menu, 
  X,
  Users,
  Briefcase,
  Calendar,
  Bell,
  User,
  LogOut
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navigation = [
    { name: "Alumni", href: "/alumni", icon: Users },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "AI Career Hub", href: "/career-hub", icon: Briefcase },
    { name: "Mentorship", href: "/mentorship", icon: Users },
    { name: "Events", href: "/events-hub", icon: Calendar },
    { name: "Messages", href: "/messages", icon: Bell },
    { name: "Dashboard", href: "/dashboard", icon: User },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-lift">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src="/alumni-logo.jpg" 
                alt="AlumniNet Logo" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <span className="text-xl font-bold text-gradient-primary">
              AlumniNet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                <item.icon className="h-4 w-4 group-hover:scale-105 transition-transform" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 bg-accent rounded-full flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-accent-foreground" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-foreground">{user?.name}</div>
                    <div className="text-muted-foreground">{user?.role}</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-muted-foreground hover:text-foreground text-xs"
                >
                  <LogOut className="h-3.5 w-3.5 mr-1.5" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="btn-professional text-sm">
                  Join Network
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 animate-fade-in">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <div className="px-4 pt-4 space-y-3">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-2.5 bg-muted rounded-lg">
                      <div className="w-7 h-7 bg-accent rounded-full flex items-center justify-center">
                        <User className="h-3.5 w-3.5 text-accent-foreground" />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-muted-foreground text-xs">{user?.role}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button className="btn-professional w-full text-sm">
                      Join Network
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;