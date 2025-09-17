import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Award, 
  Crown, 
  Fire,
  TrendingUp,
  Users,
  MessageSquare,
  Handshake,
  BookOpen,
  Calendar,
  Share2,
  ChevronRight,
  Gift,
  Sparkles
} from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  category: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  deadline: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: string;
  progress: number;
  maxProgress: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  level: number;
  streak: number;
  badge: string;
  avatar: string;
}

const GamificationSystem = () => {
  const [userLevel, setUserLevel] = useState(12);
  const [userPoints, setUserPoints] = useState(8450);
  const [userStreak, setUserStreak] = useState(15);
  const [activeTab, setActiveTab] = useState("overview");

  const achievements: Achievement[] = [
    {
      id: "1",
      name: "Network Builder",
      description: "Connect with 50+ professionals",
      icon: "🤝",
      rarity: "rare",
      points: 500,
      progress: 47,
      maxProgress: 50,
      unlocked: false,
      category: "Networking"
    },
    {
      id: "2", 
      name: "Knowledge Seeker",
      description: "Complete 10 skill assessments",
      icon: "📚",
      rarity: "common",
      points: 200,
      progress: 10,
      maxProgress: 10,
      unlocked: true,
      category: "Learning"
    },
    {
      id: "3",
      name: "Mentor Master",
      description: "Mentor 5 junior professionals",
      icon: "🎓",
      rarity: "epic", 
      points: 1000,
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      category: "Mentoring"
    },
    {
      id: "4",
      name: "Event Enthusiast", 
      description: "Attend 20 networking events",
      icon: "🎪",
      rarity: "rare",
      points: 750,
      progress: 18,
      maxProgress: 20,
      unlocked: false,
      category: "Events"
    },
    {
      id: "5",
      name: "AI Pioneer",
      description: "Early adopter of AI features",
      icon: "🚀",
      rarity: "legendary",
      points: 2000,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      category: "Innovation"
    }
  ];

  const challenges: Challenge[] = [
    {
      id: "1",
      title: "Weekly Connector",
      description: "Make 5 new connections this week",
      reward: 250,
      deadline: "3 days left",
      difficulty: "medium",
      type: "weekly",
      progress: 3,
      maxProgress: 5
    },
    {
      id: "2",
      title: "Profile Perfectionist", 
      description: "Complete your profile 100%",
      reward: 100,
      deadline: "No deadline",
      difficulty: "easy",
      type: "onetime",
      progress: 85,
      maxProgress: 100
    },
    {
      id: "3",
      title: "Event Master",
      description: "Organize a successful networking event",
      reward: 500,
      deadline: "2 weeks left", 
      difficulty: "hard",
      type: "monthly",
      progress: 0,
      maxProgress: 1
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      name: "Alex Chen",
      points: 15420,
      level: 18,
      streak: 45,
      badge: "🏆",
      avatar: "/placeholder-user.jpg"
    },
    {
      rank: 2,
      name: "Sarah Johnson", 
      points: 12850,
      level: 16,
      streak: 32,
      badge: "🥈",
      avatar: "/placeholder-user.jpg"
    },
    {
      rank: 3,
      name: "Michael Zhang",
      points: 11200,
      level: 15,
      streak: 28,
      badge: "🥉",
      avatar: "/placeholder-user.jpg"
    },
    {
      rank: 4,
      name: "You",
      points: userPoints,
      level: userLevel,
      streak: userStreak,
      badge: "⭐",
      avatar: "/placeholder-user.jpg"
    },
    {
      rank: 5,
      name: "Emily Rodriguez",
      points: 7890,
      level: 11,
      streak: 12,
      badge: "🎯",
      avatar: "/placeholder-user.jpg"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getXPForNextLevel = () => {
    return (userLevel * 1000) - (userPoints % 1000);
  };

  const getLevelProgress = () => {
    return ((userPoints % 1000) / 1000) * 100;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* User Level & Stats Header */}
      <div className="card-hero p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-accent">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>YU</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                  LV{userLevel}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Level {userLevel} Professional</h2>
                <p className="text-muted-foreground">Alumni Network Champion</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-accent" />
                    <span className="font-medium">{userPoints.toLocaleString()} XP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Fire className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{userStreak} day streak</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Next Level Progress</span>
                <span className="text-sm text-muted-foreground">
                  {getXPForNextLevel()} XP needed
                </span>
              </div>
              <Progress value={getLevelProgress()} className="h-3" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
            <Card className="text-center p-4">
              <Trophy className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </Card>
            <Card className="text-center p-4">
              <Target className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-muted-foreground">Active Goals</div>
            </Card>
            <Card className="text-center p-4">
              <Crown className="h-8 w-8 text-premium mx-auto mb-2" />
              <div className="text-2xl font-bold">#4</div>
              <div className="text-sm text-muted-foreground">Leaderboard</div>
            </Card>
            <Card className="text-center p-4">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">4.9</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Daily Streak & Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Fire className="h-5 w-5 text-orange-500" />
                  <span>Daily Streak</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-orange-500 mb-2">{userStreak} Days</div>
                  <p className="text-sm text-muted-foreground">Keep it up! You're on fire! 🔥</p>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                        i < 6 ? 'bg-orange-500 text-white' : 'bg-muted'
                      }`}
                    >
                      {i < 6 ? '✓' : '?'}
                    </div>
                  ))}
                </div>
                <Button className="w-full btn-hero">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Claim Daily Bonus (+50 XP)
                </Button>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-accent" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Make a New Connection
                  <Badge className="ml-auto bg-success">+25 XP</Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send a Message
                  <Badge className="ml-auto bg-success">+10 XP</Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Knowledge
                  <Badge className="ml-auto bg-success">+15 XP</Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Attend Event
                  <Badge className="ml-auto bg-success">+50 XP</Badge>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Achievements */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  <span>Recent Achievements</span>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-medium">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">+{achievement.points} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`card-professional ${achievement.unlocked ? 'border-accent' : 'opacity-75'}`}>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-bold">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity.toUpperCase()}
                      </Badge>
                      <span className="font-medium">{achievement.points} XP</span>
                    </div>
                    
                    {!achievement.unlocked && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    {achievement.unlocked && (
                      <div className="flex items-center justify-center text-success font-medium text-sm">
                        <Award className="h-4 w-4 mr-1" />
                        Unlocked!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="card-professional">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold">{challenge.title}</h3>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-accent">
                        {challenge.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{challenge.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}/{challenge.maxProgress}</span>
                      </div>
                      <Progress 
                        value={(challenge.progress / challenge.maxProgress) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                  
                  <div className="ml-6 text-right">
                    <div className="flex items-center space-x-1 mb-2">
                      <Gift className="h-4 w-4 text-accent" />
                      <span className="font-bold text-accent">{challenge.reward} XP</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{challenge.deadline}</p>
                    <Button size="sm" className="btn-professional">
                      Start Challenge
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-premium" />
                <span>Global Leaderboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaderboard.map((entry) => (
                <div 
                  key={entry.rank}
                  className={`flex items-center space-x-4 p-4 rounded-lg ${
                    entry.name === 'You' ? 'bg-accent/10 border border-accent/20' : 'bg-muted/30'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="text-2xl font-bold text-muted-foreground w-8">
                      #{entry.rank}
                    </div>
                    <div className="text-2xl">{entry.badge}</div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={entry.avatar} />
                      <AvatarFallback>{entry.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium truncate">
                        {entry.name}
                        {entry.name === 'You' && <span className="text-accent ml-2">(You)</span>}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Level {entry.level}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Fire className="h-3 w-3 text-orange-500" />
                          <span>{entry.streak} days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{entry.points.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">XP</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamificationSystem;