import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { 
  Users, 
  Star, 
  Calendar as CalendarIcon,
  Clock,
  Award,
  Target,
  BookOpen,
  MessageCircle,
  Video,
  TrendingUp,
  CheckCircle,
  UserPlus,
  Heart
} from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  expertise: string[];
  rating: number;
  totalMentees: number;
  yearsExperience: number;
  matchScore: number;
  availability: 'available' | 'busy' | 'booked';
  bio: string;
}

interface MentorshipGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: 'in-progress' | 'completed' | 'pending';
}

const MentorshipProgram = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeView, setActiveView] = useState('find-mentor');

  const mentors: Mentor[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      avatar: "/placeholder-user.jpg",
      title: "Senior Engineering Manager",
      company: "Google",
      expertise: ["Leadership", "Software Architecture", "Career Growth"],
      rating: 4.9,
      totalMentees: 45,
      yearsExperience: 12,
      matchScore: 95,
      availability: "available",
      bio: "Passionate about helping engineers grow into leadership roles. 12+ years at top tech companies."
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      avatar: "/placeholder-user.jpg", 
      title: "Product Director",
      company: "Microsoft",
      expertise: ["Product Strategy", "User Experience", "Team Building"],
      rating: 4.8,
      totalMentees: 32,
      yearsExperience: 10,
      matchScore: 88,
      availability: "busy",
      bio: "Expert in scaling products from 0 to millions of users. Former startup founder turned big tech leader."
    },
    {
      id: "3",
      name: "Emily Johnson", 
      avatar: "/placeholder-user.jpg",
      title: "Chief Technology Officer", 
      company: "Stripe",
      expertise: ["Engineering Management", "Scaling Teams", "Technical Strategy"],
      rating: 5.0,
      totalMentees: 28,
      yearsExperience: 15,
      matchScore: 92,
      availability: "available",
      bio: "CTO with experience scaling engineering teams from 10 to 500+. Focus on building inclusive tech cultures."
    }
  ];

  const myGoals: MentorshipGoal[] = [
    {
      id: "1",
      title: "Master System Design",
      description: "Learn to design scalable distributed systems",
      progress: 65,
      dueDate: "2024-12-15",
      status: "in-progress"
    },
    {
      id: "2", 
      title: "Leadership Skills",
      description: "Develop team leadership and management capabilities",
      progress: 40,
      dueDate: "2024-11-30",
      status: "in-progress"
    },
    {
      id: "3",
      title: "Technical Interviews",
      description: "Prepare for senior engineer interviews",
      progress: 100,
      dueDate: "2024-10-15", 
      status: "completed"
    }
  ];

  const upcomingSessions = [
    {
      mentor: "Dr. Sarah Chen",
      date: "Oct 25, 2024",
      time: "2:00 PM",
      topic: "Career Planning Strategy",
      type: "video"
    },
    {
      mentor: "Emily Johnson",
      date: "Oct 28, 2024", 
      time: "4:30 PM",
      topic: "System Design Review",
      type: "chat"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Program Header */}
      <Card className="card-professional">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">AlumniNet Mentorship</CardTitle>
                <p className="text-muted-foreground">Connect with industry leaders and accelerate your career</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">4.9</p>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">1.2k+</p>
                <p className="text-xs text-muted-foreground">Mentors</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="find-mentor" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="find-mentor" className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Find Mentor</span>
          </TabsTrigger>
          <TabsTrigger value="my-mentors" className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>My Mentors</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Goals</span>
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>Sessions</span>
          </TabsTrigger>
        </TabsList>

        {/* Find Mentor Tab */}
        <TabsContent value="find-mentor" className="space-y-4">
          <div className="grid gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="card-professional hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={mentor.avatar} />
                      <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold">{mentor.name}</h3>
                          <p className="text-muted-foreground">{mentor.title} at {mentor.company}</p>
                        </div>
                        <Badge 
                          className={`${
                            mentor.availability === 'available' ? 'bg-green-100 text-green-800' :
                            mentor.availability === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {mentor.availability}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{mentor.bio}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.expertise.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-semibold">{mentor.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">{mentor.totalMentees}</p>
                          <p className="text-xs text-muted-foreground">Mentees</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">{mentor.yearsExperience}y</p>
                          <p className="text-xs text-muted-foreground">Experience</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-accent">{mentor.matchScore}%</p>
                          <p className="text-xs text-muted-foreground">Match</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button 
                          className="bg-accent hover:bg-accent-hover"
                          disabled={mentor.availability === 'booked'}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                        <Button variant="outline">
                          <Video className="h-4 w-4 mr-2" />
                          Schedule Call
                        </Button>
                        <Button variant="ghost">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Mentors Tab */}
        <TabsContent value="my-mentors" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-accent" />
                  <span>Active Mentorships</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mentors.slice(0, 2).map((mentor) => (
                  <div key={mentor.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mentor.avatar} />
                      <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{mentor.name}</h4>
                      <p className="text-sm text-muted-foreground">{mentor.company}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{session.mentor}</h4>
                      <Badge className="bg-accent text-accent-foreground">
                        {session.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{session.topic}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{session.date}</span>
                      <Clock className="h-3 w-3 ml-2" />
                      <span>{session.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-accent" />
                  <span>My Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {myGoals.map((goal) => (
                  <div key={goal.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{goal.title}</h4>
                      <Badge 
                        className={`${
                          goal.status === 'completed' ? 'bg-green-100 text-green-800' :
                          goal.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {goal.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {goal.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Due: {goal.dueDate}</p>
                  </div>
                ))}
                <Button className="w-full bg-accent hover:bg-accent-hover">
                  <Target className="h-4 w-4 mr-2" />
                  Add New Goal
                </Button>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader>
                <CardTitle>Goal Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
                    <TrendingUp className="h-12 w-12 text-accent mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Great Progress!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You're 68% ahead of your timeline
                    </p>
                    <Button size="sm" className="bg-accent hover:bg-accent-hover">
                      View Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-accent">3</p>
                      <p className="text-xs text-muted-foreground">Active Goals</p>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">1</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sessions Tab */}
        <TabsContent value="sessions" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-professional">
              <CardHeader>
                <CardTitle>Schedule Session</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader>
                <CardTitle>Session History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">System Design Deep Dive</h4>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Dr. Sarah Chen • Oct 20, 2024</p>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Career Path Planning</h4>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Emily Johnson • Oct 15, 2024</p>
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

export default MentorshipProgram;