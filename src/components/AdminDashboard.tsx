import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Award,
  MessageCircle,
  Settings,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Eye,
  UserCheck,
  Building,
  Globe,
  Zap,
  Target,
  Shield,
  Database
} from "lucide-react";
import Header from "@/components/Header";

const AdminDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");

  // Mock analytics data
  const stats = {
    totalAlumni: 2847,
    activeUsers: 1923,
    jobPosts: 156,
    connections: 4521,
    mentoringSessions: 342,
    revenue: 89750,
    growthRate: 23.5,
    engagement: 87.3
  };

  const recentActivities = [
    {
      id: 1,
      type: "new_alumni",
      message: "Priya Sharma joined the network",
      timestamp: "2 minutes ago",
      icon: UserCheck,
      color: "text-success"
    },
    {
      id: 2,
      type: "job_post",
      message: "New job posted: Senior Developer at TechCorp",
      timestamp: "5 minutes ago",
      icon: Briefcase,
      color: "text-accent"
    },
    {
      id: 3,
      type: "mentoring",
      message: "Mentoring session completed: Aditya & Vishwam",
      timestamp: "12 minutes ago",
      icon: Award,
      color: "text-premium"
    },
    {
      id: 4,
      type: "connection",
      message: "New connection: Krishna Chandak  & Ayush Tiwari",
      timestamp: "18 minutes ago",
      icon: MessageCircle,
      color: "text-primary"
    }
  ];

  const topPerformingContent = [
    {
      title: "Senior Software Engineer",
      company: "Google",
      applications: 89,
      views: 1247,
      type: "job"
    },
    {
      title: "AI/ML Workshop Series",
      organizer: "Tech Alumni Club",
      attendees: 156,
      rating: 4.9,
      type: "event"
    },
    {
      title: "Rohit Sharma - Product Strategy",
      department: "Technology",
      connections: 234,
      mentees: 12,
      type: "profile"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Admin Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-premium rounded-xl flex items-center justify-center">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-muted-foreground">Manage and monitor your alumni network</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button className="bg-gradient-accent text-white hover:opacity-90">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in">
            <Card className="card-professional border-l-4 border-l-accent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Alumni</p>
                    <p className="text-3xl font-bold text-primary">{stats.totalAlumni.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-success mr-1" />
                      <span className="text-sm text-success font-medium">+{stats.growthRate}%</span>
                      <span className="text-sm text-muted-foreground ml-1">this month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional border-l-4 border-l-success">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                    <p className="text-3xl font-bold text-primary">{stats.activeUsers.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <Eye className="h-4 w-4 text-success mr-1" />
                      <span className="text-sm text-success font-medium">{stats.engagement}%</span>
                      <span className="text-sm text-muted-foreground ml-1">engagement</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional border-l-4 border-l-premium">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Job Opportunities</p>
                    <p className="text-3xl font-bold text-primary">{stats.jobPosts}</p>
                    <div className="flex items-center mt-2">
                      <Target className="h-4 w-4 text-premium mr-1" />
                      <span className="text-sm text-premium font-medium">89%</span>
                      <span className="text-sm text-muted-foreground ml-1">success rate</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-premium/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-premium" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-primary">${stats.revenue.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <DollarSign className="h-4 w-4 text-success mr-1" />
                      <span className="text-sm text-success font-medium">+12.3%</span>
                      <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="analytics" className="space-y-8 animate-fade-in">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>Content</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center space-x-2">
                <PieChart className="h-4 w-4" />
                <span>Reports</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Analytics Chart */}
                <Card className="lg:col-span-2 card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Network Growth Analytics</span>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Filter className="h-3 w-3 mr-1" />
                          Filter
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-gradient-to-br from-accent/5 to-premium/5 rounded-lg border border-border/50 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-16 w-16 text-accent mx-auto mb-4" />
                        <p className="text-lg font-semibold text-primary">Interactive Analytics Chart</p>
                        <p className="text-muted-foreground">Real-time network growth visualization</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`w-8 h-8 rounded-full bg-background flex items-center justify-center ${activity.color}`}>
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="text-lg">Top Performing Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topPerformingContent.map((content, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{content.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {content.type === 'job' && content.company}
                            {content.type === 'event' && content.organizer}
                            {content.type === 'profile' && content.department}
                          </p>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">
                          {content.type === 'job' && `${content.applications} apps`}
                          {content.type === 'event' && `${content.attendees} attendees`}
                          {content.type === 'profile' && `${content.connections} connections`}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="text-lg">Engagement Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Profile Views</span>
                        <span className="font-medium">+34.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Messages Sent</span>
                        <span className="font-medium">+28.7%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Job Applications</span>
                        <span className="font-medium">+42.1%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Event Attendance</span>
                        <span className="font-medium">+19.8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-professional bg-gradient-premium text-white">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Premium Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4" />
                        <span className="text-sm">AI-Powered Matching</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <span className="text-sm">Global Network Access</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span className="text-sm">Premium Mentoring</span>
                      </div>
                      <Button variant="secondary" size="sm" className="w-full mt-4 bg-white text-premium hover:bg-white/90">
                        Upgrade Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Additional tabs content would go here */}
            <TabsContent value="users">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">User management interface coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Content management interface coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle>Reports & Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Advanced reporting interface coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">System settings interface coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;