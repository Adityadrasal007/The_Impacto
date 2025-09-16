import Header from "@/components/Header";
import RealTimeChat from "@/components/RealTimeChat";

const Messages = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Messages & Communication
            </h1>
            <p className="text-muted-foreground text-lg">
              Connect with alumni, mentors, and peers through our advanced messaging platform
            </p>
          </div>
          
          <RealTimeChat />
        </div>
      </main>
    </div>
  );
};

export default Messages;