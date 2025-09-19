import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, Calendar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const stats = [
    { label: "Alumni Members", value: "10K+", icon: Users },
    { label: "Job Opportunities", value: "500+", icon: Briefcase },
    { label: "Events Monthly", value: "50+", icon: Calendar },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.15)_1px,_transparent_0)] bg-[length:20px_20px]" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Connect with
            <span className="text-gradient-primary block mt-2">
              Alumni Excellence
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Join the most prestigious alumni network. Connect with industry leaders, 
            discover career opportunities, and build relationships that last a lifetime.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/login">
              <Button className="btn-hero px-8 py-6 text-lg group">
                Join the Network
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/alumni">
              <Button variant="outline" className="btn-outline-pro px-8 py-6 text-lg">
                Browse Alumni
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="card-professional p-6 text-center hover-lift group"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <div className="text-3xl font-bold text-gradient-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-8 bg-gradient-to-b from-accent to-transparent rounded-full" />
      </div>
    </section>
  );
};

export default HeroSection;