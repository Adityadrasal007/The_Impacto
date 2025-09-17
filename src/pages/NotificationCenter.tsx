import Header from "@/components/Header";
import NotificationCenter from "@/components/NotificationCenter";

const NotificationCenterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="pt-20 pb-12">
        <NotificationCenter />
      </main>
    </div>
  );
};

export default NotificationCenterPage;