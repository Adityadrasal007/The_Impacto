import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Briefcase, 
  Calendar,
  MessageCircle,
  TrendingUp,
  Star,
  Award,
  Target,
  Zap,
  Bell,
  Settings,
  BookOpen,
  Network,
  Eye,
  Heart,
  Coffee,
  Video
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import AnalyticsInsights from "@/components/AnalyticsInsights";
import AdminDashboard from "@/components/AdminDashboard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [userRole] = useState("alumni"); // Could be "student", "alumni", "admin"
  const [activeTab, setActiveTab] = useState("overview");

  // Use real user data with fallbacks
  const currentUser = {
    name: user?.name || "User",
    role: user?.role || "Alumni",
    company: user?.company || "Not specified",
    graduationYear: user?.graduationYear || new Date().getFullYear(),
    connections: 847,
    profileViews: 234,
    messagesReceived: 18,
    menteeCount: 12,
    jobReferrals: 8,
    rating: 4.9,
    skills: user?.skills || [],
    bio: user?.bio || ""
  };

  const recentActivities = [
    {
      id: 1,
      type: "connection",
      message: "Michael Rodriguez wants to connect with you",
      timestamp: "2 hours ago",
      action: "Accept",
      priority: "high"
    },
    {
      id: 2,
      type: "job",
      message: "New job match: Senior Developer at Tesla",
      timestamp: "4 hours ago",
      action: "View Job",
      priority: "medium"
    },
    {
      id: 3,
      type: "mentoring",
      message: "Alex Kim requested a mentoring session",
      timestamp: "1 day ago",
      action: "Schedule",
      priority: "high"
    },
    {
      id: 4,
      type: "event",
      message: "Tech Alumni Meetup - San Francisco",
      timestamp: "2 days ago",
      action: "RSVP",
      priority: "low"
    }
  ];

  const quickActions = [
    { icon: Users, label: "Find Alumni", count: "2,847", color: "text-accent" },
    { icon: Briefcase, label: "Browse Jobs", count: "156", color: "text-success" },
    { icon: Calendar, label: "Upcoming Events", count: "12", color: "text-premium" },
    { icon: MessageCircle, label: "Messages", count: "8", color: "text-primary" }
  ];

  const recommendedConnections = [
    {
      name: "Dr. Emily Johnson",
      role: "Chief Medical Officer",
      company: "Johns Hopkins",
      mutualConnections: 23,
      matchScore: 95
    },
    {
      name: "David Kim",
      role: "Investment Analyst",
      company: "Goldman Sachs",
      mutualConnections: 15,
      matchScore: 88
    },
    {
      name: "Lisa Wang",
      role: "Marketing Director",
      company: "Tesla",
      mutualConnections: 31,
      matchScore: 92
    }
  ];

  // Role-based dashboard rendering
  if (userRole === "admin") {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Welcome back, {currentUser.name.split(' ')[0]}!
                </h1>
                <p className="text-muted-foreground mt-2">
                  {currentUser.role} at {currentUser.company} • Class of {currentUser.graduationYear}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Link to="/profile-settings">
                  <Button className="bg-gradient-accent text-white hover:opacity-90">
                    <Settings className="h-4 w-4 mr-2" />
                    Profile Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Personal Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8 animate-fade-in">
            <Card className="card-professional border-l-4 border-l-accent">
              <CardContent className="p-4">
                <div className="text-center">
                  <Network className="h-6 w-6 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{currentUser.connections}</p>
                  <p className="text-xs text-muted-foreground">Connections</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional border-l-4 border-l-success">
              <CardContent className="p-4">
                <div className="text-center">
                  <Eye className="h-6 w-6 text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{currentUser.profileViews}</p>
                  <p className="text-xs text-muted-foreground">Profile Views</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional border-l-4 border-l-premium">
              <CardContent className="p-4">
                <div className="text-center">
                  <Award className="h-6 w-6 text-premium mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{currentUser.menteeCount}</p>
                  <p className="text-xs text-muted-foreground">Mentees</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="text-center">
                  <MessageCircle className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{currentUser.messagesReceived}</p>
                  <p className="text-xs text-muted-foreground">New Messages</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional border-l-4 border-l-accent">
              <CardContent className="p-4">
                <div className="text-center">
                  <Target className="h-6 w-6 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{currentUser.jobReferrals}</p>
                  <p className="text-xs text-muted-foreground">Job Referrals</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional border-l-4 border-l-success bg-gradient-to-r from-card to-success/5">
              <CardContent className="p-4">
                <div className="text-center">
                  <Star className="h-6 w-6 text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{currentUser.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 animate-fade-in">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="network" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>My Network</span>
              </TabsTrigger>
              <TabsTrigger value="opportunities" className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>Opportunities</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-accent" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickActions.map((action, index) => (
                      <Button 
                        key={index} 
                        variant="ghost" 
                        className="w-full justify-between p-4 h-auto hover:bg-muted/50"
                      >
                        <div className="flex items-center space-x-3">
                          <action.icon className={`h-5 w-5 ${action.color}`} />
                          <span>{action.label}</span>
                        </div>
                        <Badge variant="secondary">{action.count}</Badge>
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card className="lg:col-span-2 card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-accent" />
                      <span>Recent Activities & Notifications</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div 
                        key={activity.id} 
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={activity.priority === 'high' ? 'default' : 'outline'}
                            className={activity.priority === 'high' ? 'bg-accent text-accent-foreground' : ''}
                          >
                            {activity.priority}
                          </Badge>
                          <Button size="sm" variant="outline">
                            {activity.action}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recommended Connections */}
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-accent" />
                    <span>Recommended Connections</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {recommendedConnections.map((connection, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-card to-accent/5 rounded-lg border border-border/50">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-primary">{connection.name}</h4>
                            <p className="text-sm text-muted-foreground">{connection.role}</p>
                            <p className="text-xs text-muted-foreground">{connection.company}</p>
                          </div>
                          <Badge className="bg-accent text-accent-foreground">
                            {connection.matchScore}% match
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          {connection.mutualConnections} mutual connections
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 bg-accent hover:bg-accent-hover text-accent-foreground">
                            <Users className="h-3 w-3 mr-1" />
                            Connect
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Network Tab */}
            <TabsContent value="network" className="space-y-6">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle>Network Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Network className="h-16 w-16 text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Network Tools Coming Soon</h3>
                    <p className="text-muted-foreground mb-4">
                      Advanced networking features including connection analytics, relationship mapping, and more.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button className="bg-accent hover:bg-accent-hover text-accent-foreground">
                        <Coffee className="h-4 w-4 mr-2" />
                        Schedule Coffee Chat
                      </Button>
                      <Button variant="outline">
                        <Video className="h-4 w-4 mr-2" />
                        Video Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Opportunities Tab */}
            <TabsContent value="opportunities" className="space-y-6">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle>Personalized Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Target className="h-16 w-16 text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">AI-Powered Matching</h3>
                    <p className="text-muted-foreground mb-4">
                      Get personalized job recommendations, mentoring opportunities, and career insights.
                    </p>
                    <Button className="bg-gradient-premium text-white hover:opacity-90">
                      <Zap className="h-4 w-4 mr-2" />
                      Enable Smart Matching
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <AnalyticsInsights />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;