import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Menu, 
  X,
  Users,
  Briefcase,
  Calendar,
  Bell,
  User
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Alumni Directory", href: "/alumni", icon: Users },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "News", href: "/news", icon: Bell },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-lift">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient-primary">
              AlumniNet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="font-medium">
                Sign In
              </Button>
            </Link>
            <Link to="/login">
              <Button className="btn-professional">
                Join Network
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
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
          <div className="md:hidden py-4 animate-fade-in">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <div className="px-4 pt-4 space-y-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="btn-professional w-full">
                    Join Network
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;