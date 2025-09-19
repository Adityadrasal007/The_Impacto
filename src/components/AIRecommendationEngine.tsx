import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Star,
  Target,
  Zap,
  ChevronRight,
  Award,
  BookOpen,
  MessageSquare
} from "lucide-react";

interface Recommendation {
  id: string;
  type: 'connection' | 'job' | 'skill' | 'event' | 'mentor';
  title: string;
  description: string;
  matchScore: number;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  data: any;
}

interface AIInsight {
  category: string;
  insight: string;
  actionable: boolean;
  confidence: number;
}

const AIRecommendationEngine = () => {
  const [activeTab, setActiveTab] = useState("recommendations");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [processingTime, setProcessingTime] = useState(0);

  useEffect(() => {
    // Simulate AI processing
    const timer = setInterval(() => {
      setProcessingTime(prev => prev < 100 ? prev + 2 : 100);
    }, 50);

    // Mock AI recommendations
    setTimeout(() => {
      setRecommendations([
        {
          id: "1",
          type: "connection",
          title: "Connect with Dr. Sarah Chen",
          description: "CTO at TechCorp with 15+ years in AI/ML",
          matchScore: 95,
          reason: "Shared interests in Machine Learning and similar career trajectory",
          priority: "high",
          data: { name: "Dr. Sarah Chen", company: "TechCorp", commonConnections: 12 }
        },
        {
          id: "2", 
          type: "job",
          title: "Senior AI Engineer at InnovateTech",
          description: "Remote position matching your skillset perfectly",
          matchScore: 88,
          reason: "Skills match: Python, TensorFlow, Cloud Architecture",
          priority: "high",
          data: { salary: "$120k-$150k", location: "Remote", skills: ["Python", "ML", "AWS"] }
        },
        {
          id: "3",
          type: "skill",
          title: "Learn Kubernetes",
          description: "High demand skill in your field",
          matchScore: 82,
          reason: "90% of recommended jobs require this skill",
          priority: "medium",
          data: { difficulty: "Intermediate", timeToLearn: "2-3 months", demand: "High" }
        },
        {
          id: "4",
          type: "mentor",
          title: "Mentorship with Prof. Michael Zhang",
          description: "Startup founder and AI research expert",
          matchScore: 91,
          reason: "Aligns with your entrepreneurial interests and technical background",
          priority: "high",
          data: { experience: "20+ years", specialization: "AI Startups", rating: 4.9 }
        },
        {
          id: "5",
          type: "event",
          title: "AI Summit 2024",
          description: "Leading AI conference with top industry speakers",
          matchScore: 79,
          reason: "Perfect for networking and staying updated with latest trends",
          priority: "medium",
          data: { date: "Dec 15-17, 2024", location: "San Francisco", speakers: "50+" }
        }
      ]);

      setInsights([
        {
          category: "Career Growth",
          insight: "Your profile views increased 340% after adding AI/ML skills",
          actionable: true,
          confidence: 94
        },
        {
          category: "Network Analysis", 
          insight: "You're 2 connections away from 85% of top AI companies",
          actionable: true,
          confidence: 87
        },
        {
          category: "Skill Gap",
          insight: "Adding cloud certifications could increase job matches by 60%",
          actionable: true,
          confidence: 91
        },
        {
          category: "Market Trends",
          insight: "AI Engineer roles in your area increased by 45% this quarter",
          actionable: false,
          confidence: 98
        }
      ]);
      
      clearInterval(timer);
      setProcessingTime(100);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'connection': return Users;
      case 'job': return Briefcase;
      case 'skill': return BookOpen;
      case 'mentor': return Award;
      case 'event': return MessageSquare;
      default: return Target;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* AI Processing Header */}
      <div className="card-professional p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-accent rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Recommendation Engine</h2>
              <p className="text-muted-foreground">Personalized insights powered by machine learning</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">AI Processing</span>
            </div>
            <Progress value={processingTime} className="w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">95%</div>
            <div className="text-sm text-muted-foreground">Match Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">24</div>
            <div className="text-sm text-muted-foreground">Recommendations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-premium">8</div>
            <div className="text-sm text-muted-foreground">AI Insights</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">2.3s</div>
            <div className="text-sm text-muted-foreground">Processing Time</div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          {recommendations.map((rec) => {
            const IconComponent = getTypeIcon(rec.type);
            return (
              <Card key={rec.id} className="hover-lift cursor-pointer border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{rec.title}</h3>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(rec.priority)}`} />
                            <Badge variant="secondary" className="text-xs">
                              {rec.matchScore}% Match
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 rounded-lg p-3 mb-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Target className="h-4 w-4 text-accent" />
                          <span className="font-medium">Why this matches:</span>
                          <span className="text-muted-foreground">{rec.reason}</span>
                        </div>
                      </div>

                      {/* Type-specific data */}
                      {rec.type === 'connection' && (
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{rec.data.commonConnections} mutual connections</span>
                          <span>•</span>
                          <span>{rec.data.company}</span>
                        </div>
                      )}
                      
                      {rec.type === 'job' && (
                        <div className="flex flex-wrap gap-2">
                          {rec.data.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4 flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(rec.matchScore / 20) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Button size="sm" className="bg-accent hover:bg-accent-hover">
                        Take Action
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          {insights.map((insight, index) => (
            <Card key={index} className="card-professional">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge className="bg-gradient-accent">{insight.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium text-success">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    <p className="text-foreground font-medium mb-2">{insight.insight}</p>
                    {insight.actionable && (
                      <Button variant="outline" size="sm">
                        View Recommendations
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="card-professional">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Profile Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent mb-2">+340%</div>
                <div className="text-sm text-muted-foreground">Profile views this month</div>
                <Progress value={85} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Network Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success mb-2">+127</div>
                <div className="text-sm text-muted-foreground">New connections</div>
                <Progress value={67} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Skill Endorsements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-premium mb-2">+89</div>
                <div className="text-sm text-muted-foreground">New endorsements</div>
                <Progress value={92} className="mt-3" />
              </CardContent>
            </Card>
          </div>

          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Career Trajectory Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg">
                <div>
                  <h4 className="font-medium">Current Position Strength</h4>
                  <p className="text-sm text-muted-foreground">Based on market analysis and skill assessment</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-accent">8.7/10</div>
                  <div className="text-xs text-muted-foreground">Market Value</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h5 className="font-medium mb-2">Strengths</h5>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>High-demand technical skills</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Strong network connections</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Leadership experience</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <h5 className="font-medium mb-2">Growth Opportunities</h5>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Cloud certifications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Public speaking</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Industry publications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIRecommendationEngine;