import Header from "@/components/Header";
import EventManagement from "@/components/EventManagement";

const EventsHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Events & Networking
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover events, connect with peers, and expand your professional network
            </p>
          </div>
          
          <EventManagement />
        </div>
      </main>
    </div>
  );
};

export default EventsHub;