import Header from "@/components/Header";
import AICareerMatcher from "@/components/AICareerMatcher";

const CareerHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              AI Career Hub
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover your next career opportunity with AI-powered matching and insights
            </p>
          </div>
          
          <AICareerMatcher />
        </div>
      </main>
    </div>
  );
};

export default CareerHub;