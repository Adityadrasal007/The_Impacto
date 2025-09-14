import { 
  Users, 
  Briefcase, 
  Calendar, 
  MessageCircle, 
  Award, 
  TrendingUp,
  Shield,
  Globe,
  Zap
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "Alumni Directory",
      description: "Connect with thousands of alumni across industries and graduation years. Advanced search and filtering capabilities.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Briefcase,
      title: "Career Hub",
      description: "Access exclusive job opportunities, mentorship programs, and career guidance from industry leaders.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Calendar,
      title: "Networking Events",
      description: "Join professional meetups, webinars, and exclusive alumni gatherings in your area and virtually.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageCircle,
      title: "Smart Messaging",
      description: "Professional networking made easy with intelligent matching and conversation starters.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Award,
      title: "Achievement Tracking",
      description: "Showcase your professional milestones and celebrate fellow alumni success stories.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Industry Insights",
      description: "Access market trends, salary benchmarks, and industry reports curated by alumni experts.",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is protected with enterprise-grade security and privacy controls you can trust.",
      gradient: "from-slate-500 to-gray-500"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with alumni worldwide across 50+ countries and major metropolitan areas.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description: "Smart algorithms connect you with the most relevant alumni based on your goals and interests.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="text-gradient-primary block mt-2">
              Advance Your Career
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and connections you need 
            to accelerate your professional growth and build meaningful relationships.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-professional p-8 hover-lift group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="card-hero p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to unlock your potential?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of successful alumni who are already advancing their careers 
              through meaningful connections.
            </p>
            <button className="btn-hero px-8 py-3 font-semibold">
              Start Networking Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;