import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Calendar,
  MessageCircle,
  Award,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Globe,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MousePointer,
  Clock,
  CheckCircle
} from "lucide-react";

const AnalyticsInsights = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const networkMetrics = {
    totalConnections: 4521,
    activeMembers: 1923,
    engagementRate: 87.3,
    responseRate: 92.1,
    mentoringSessions: 342,
    jobPlacements: 89,
    eventAttendance: 2156,
    networkGrowth: 23.5
  };

  const industryBreakdown = [
    { industry: "Technology", count: 1247, percentage: 43.8, growth: +15.2 },
    { industry: "Finance", count: 568, percentage: 19.9, growth: +8.7 },
    { industry: "Healthcare", count: 423, percentage: 14.8, growth: +12.3 },
    { industry: "Education", count: 289, percentage: 10.1, growth: +5.9 },
    { industry: "Consulting", count: 187, percentage: 6.6, growth: +18.4 },
    { industry: "Other", count: 133, percentage: 4.8, growth: +3.2 }
  ];

  const topPerformers = [
    {
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      connections: 847,
      mentees: 23,
      jobReferrals: 12,
      rating: 4.9,
      specialty: "Technical Leadership"
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager",
      connections: 1203,
      mentees: 18,
      jobReferrals: 28,
      rating: 4.8,
      specialty: "Product Strategy"
    },
    {
      name: "Dr. Emily Johnson",
      role: "Chief Medical Officer",
      connections: 654,
      mentees: 15,
      jobReferrals: 8,
      rating: 4.9,
      specialty: "Healthcare Innovation"
    }
  ];

  const engagementTrends = [
    { metric: "Profile Views", current: 12847, previous: 9634, change: +33.4 },
    { metric: "Messages Sent", current: 3421, previous: 2987, change: +14.5 },
    { metric: "Job Applications", current: 1289, previous: 967, change: +33.3 },
    { metric: "Event RSVPs", current: 2156, previous: 1834, change: +17.6 },
    { metric: "Mentoring Requests", current: 567, previous: 423, change: +34.0 },
    { metric: "Network Invites", current: 889, previous: 712, change: +24.9 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Network Analytics & Insights
          </h2>
          <p className="text-muted-foreground">Comprehensive analytics for your alumni network</p>
        </div>
        <div className="flex items-center space-x-3">
          {["week", "month", "quarter", "year"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={selectedPeriod === period ? "bg-accent text-accent-foreground" : ""}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-professional border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Network Size</p>
                <p className="text-2xl font-bold text-primary">{networkMetrics.totalConnections.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-success mr-1" />
                  <span className="text-xs text-success">+{networkMetrics.networkGrowth}%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-professional border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold text-primary">{networkMetrics.engagementRate}%</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-success mr-1" />
                  <span className="text-xs text-success">+5.2%</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-professional border-l-4 border-l-premium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Job Placements</p>
                <p className="text-2xl font-bold text-primary">{networkMetrics.jobPlacements}</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-success mr-1" />
                  <span className="text-xs text-success">+12%</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-premium" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-professional border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold text-primary">{networkMetrics.responseRate}%</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-success mr-1" />
                  <span className="text-xs text-success">+3.1%</span>
                </div>
              </div>
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagement" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        {/* Engagement Analytics */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Engagement Trends */}
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span>Engagement Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {engagementTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{trend.metric}</p>
                        <p className="text-2xl font-bold text-primary">{trend.current.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center ${trend.change > 0 ? 'text-success' : 'text-destructive'}`}>
                          {trend.change > 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          <span className="font-semibold">{Math.abs(trend.change)}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">vs previous period</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Heatmap */}
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-accent" />
                  <span>Activity Heatmap</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-accent/5 to-premium/5 rounded-lg border border-border/50 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-accent mx-auto mb-3" />
                    <p className="font-semibold text-primary">Interactive Activity Map</p>
                    <p className="text-sm text-muted-foreground">Visual representation of network activity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Demographics */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Industry Breakdown */}
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-accent" />
                  <span>Industry Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {industryBreakdown.map((industry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{industry.industry}</span>
                          <span className="text-sm text-muted-foreground">{industry.count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-accent h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${industry.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-sm font-medium">{industry.percentage}%</div>
                        <div className={`text-xs flex items-center ${industry.growth > 0 ? 'text-success' : 'text-destructive'}`}>
                          {industry.growth > 0 ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(industry.growth)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Geographic Distribution */}
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-accent" />
                  <span>Geographic Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-accent/5 to-success/5 rounded-lg border border-border/50 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-accent mx-auto mb-3" />
                    <p className="font-semibold text-primary">Global Network Map</p>
                    <p className="text-sm text-muted-foreground">Alumni distribution worldwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-accent" />
                <span>Top Performers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-card to-accent/5 rounded-lg border border-border/50">
                    <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary">{performer.name}</h4>
                      <p className="text-sm text-muted-foreground">{performer.role}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {performer.connections} connections
                        </span>
                        <span className="flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          {performer.mentees} mentees
                        </span>
                        <span className="flex items-center">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {performer.jobReferrals} referrals
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-bold text-primary">{performer.rating}</span>
                      </div>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {performer.specialty}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Predictions */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-professional bg-gradient-to-br from-premium/10 to-accent/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-premium" />
                  <span>AI-Powered Predictions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-background/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Network Growth Forecast</span>
                      <Badge className="bg-success text-success-foreground">+28% projected</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Based on current engagement trends</p>
                  </div>
                  
                  <div className="p-3 bg-background/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Job Placement Success</span>
                      <Badge className="bg-accent text-accent-foreground">92% success rate</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Predicted for next quarter</p>
                  </div>
                  
                  <div className="p-3 bg-background/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Mentoring Demand</span>
                      <Badge className="bg-premium text-premium-foreground">High demand</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Tech & Healthcare sectors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-accent" />
                  <span>Optimization Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Increase mentor incentives</p>
                      <p className="text-xs text-muted-foreground">Could boost mentoring by 34%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Focus on Finance sector</p>
                      <p className="text-xs text-muted-foreground">Underrepresented with high potential</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Mobile app engagement</p>
                      <p className="text-xs text-muted-foreground">Could increase activity by 45%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsInsights;