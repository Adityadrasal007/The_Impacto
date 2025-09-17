import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ThumbsUp, 
  Star, 
  TrendingUp, 
  Plus,
  Search,
  Award,
  Target,
  BookOpen,
  Brain,
  Code,
  Users,
  MessageSquare,
  Trophy,
  Zap,
  ChevronRight,
  CheckCircle,
  Clock
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  endorsements: number;
  endorsers: Endorser[];
  verified: boolean;
  trending: boolean;
  progress: number;
  maxProgress: number;
  lastUsed: string;
}

interface Endorser {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  credibility: number;
}

interface SkillAssessment {
  id: string;
  skillName: string;
  score: number;
  maxScore: number;
  completedAt: string;
  certificate: boolean;
  badgeUrl?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  verified: boolean;
  badgeUrl: string;
}

const SkillsEndorsementSystem = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    {
      id: "1",
      name: "Machine Learning",
      category: "AI/ML",
      level: "Expert",
      endorsements: 127,
      endorsers: [
        {
          id: "1", 
          name: "Dr. Sarah Chen",
          avatar: "/placeholder-user.jpg",
          title: "CTO",
          company: "TechCorp",
          credibility: 95
        },
        {
          id: "2",
          name: "Alex Rodriguez", 
          avatar: "/placeholder-user.jpg",
          title: "ML Engineer",
          company: "AI Innovations",
          credibility: 88
        }
      ],
      verified: true,
      trending: true,
      progress: 95,
      maxProgress: 100,
      lastUsed: "2 days ago"
    },
    {
      id: "2",
      name: "React Development", 
      category: "Frontend",
      level: "Advanced",
      endorsements: 89,
      endorsers: [
        {
          id: "3",
          name: "Michael Zhang",
          avatar: "/placeholder-user.jpg", 
          title: "Senior Developer",
          company: "WebTech",
          credibility: 92
        }
      ],
      verified: true,
      trending: false,
      progress: 85,
      maxProgress: 100,
      lastUsed: "1 week ago"
    },
    {
      id: "3",
      name: "Leadership",
      category: "Soft Skills", 
      level: "Advanced",
      endorsements: 156,
      endorsers: [
        {
          id: "4",
          name: "Emily Johnson",
          avatar: "/placeholder-user.jpg",
          title: "VP Engineering", 
          company: "StartupXYZ",
          credibility: 97
        }
      ],
      verified: false,
      trending: true,
      progress: 78,
      maxProgress: 100,
      lastUsed: "Yesterday"
    },
    {
      id: "4",
      name: "Cloud Architecture",
      category: "DevOps",
      level: "Intermediate", 
      endorsements: 64,
      endorsers: [],
      verified: true,
      trending: false,
      progress: 60,
      maxProgress: 100,
      lastUsed: "3 days ago"
    },
    {
      id: "5",
      name: "Product Strategy",
      category: "Business",
      level: "Advanced",
      endorsements: 98,
      endorsers: [],
      verified: false,
      trending: true,
      progress: 82,
      maxProgress: 100,
      lastUsed: "5 days ago"
    }
  ];

  const assessments: SkillAssessment[] = [
    {
      id: "1",
      skillName: "Machine Learning",
      score: 95,
      maxScore: 100,
      completedAt: "2024-01-15",
      certificate: true,
      badgeUrl: "/ml-badge.png"
    },
    {
      id: "2",
      skillName: "React Development",
      score: 88,
      maxScore: 100, 
      completedAt: "2024-01-10",
      certificate: true,
      badgeUrl: "/react-badge.png"
    },
    {
      id: "3",
      skillName: "Cloud Architecture",
      score: 72,
      maxScore: 100,
      completedAt: "2024-01-08",
      certificate: false
    }
  ];

  const certifications: Certification[] = [
    {
      id: "1",
      name: "AWS Solutions Architect Professional",
      issuer: "Amazon Web Services", 
      issueDate: "2023-12-01",
      expiryDate: "2026-12-01",
      credentialId: "AWS-SAP-2023-001234",
      verified: true,
      badgeUrl: "/aws-badge.png"
    },
    {
      id: "2", 
      name: "Google Cloud Professional ML Engineer",
      issuer: "Google Cloud",
      issueDate: "2023-11-15",
      expiryDate: "2025-11-15", 
      credentialId: "GCP-MLE-2023-005678",
      verified: true,
      badgeUrl: "/gcp-badge.png"
    },
    {
      id: "3",
      name: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      issueDate: "2023-10-20",
      expiryDate: "2025-10-20",
      credentialId: "CSM-2023-009876",
      verified: true,
      badgeUrl: "/scrum-badge.png"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-gray-100 text-gray-700';
      case 'Intermediate': return 'bg-blue-100 text-blue-700';
      case 'Advanced': return 'bg-purple-100 text-purple-700';
      case 'Expert': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI/ML': return Brain;
      case 'Frontend': return Code;
      case 'Soft Skills': return Users;
      case 'DevOps': return Target;
      case 'Business': return TrendingUp;
      default: return BookOpen;
    }
  };

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header with Stats */}
      <div className="card-hero p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Skills & Endorsements</h1>
            <p className="text-muted-foreground">Track your expertise and get recognition from peers</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-professional">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Skill</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Skill name..." />
                <Input placeholder="Category..." />
                <Button className="w-full">Add Skill</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <Award className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{skills.length}</div>
            <div className="text-sm text-muted-foreground">Skills Tracked</div>
          </Card>
          <Card className="text-center p-4">
            <ThumbsUp className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{skills.reduce((sum, skill) => sum + skill.endorsements, 0)}</div>
            <div className="text-sm text-muted-foreground">Total Endorsements</div>
          </Card>
          <Card className="text-center p-4">
            <Trophy className="h-8 w-8 text-premium mx-auto mb-2" />
            <div className="text-2xl font-bold">{certifications.length}</div>
            <div className="text-sm text-muted-foreground">Certifications</div>
          </Card>
          <Card className="text-center p-4">
            <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-muted-foreground">Skill Match Rate</div>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="skills">My Skills</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Filter by Level
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => {
              const IconComponent = getCategoryIcon(skill.category);
              return (
                <Card key={skill.id} className="card-professional hover-lift cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <IconComponent className="h-5 w-5 text-accent" />
                          <h3 className="font-bold">{skill.name}</h3>
                          {skill.verified && (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                          {skill.trending && (
                            <Badge className="bg-orange-100 text-orange-700 text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge className={getLevelColor(skill.level)}>{skill.level}</Badge>
                          <Badge variant="outline">{skill.category}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4 text-success" />
                          <span>{skill.endorsements} endorsements</span>
                        </span>
                        <span className="flex items-center space-x-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Used {skill.lastUsed}</span>
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Skill Level</span>
                          <span>{skill.progress}%</span>
                        </div>
                        <Progress value={skill.progress} className="h-2" />
                      </div>

                      {skill.endorsers.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Endorsed by:</span>
                          <div className="flex -space-x-2">
                            {skill.endorsers.slice(0, 3).map((endorser) => (
                              <Avatar key={endorser.id} className="h-6 w-6 border-2 border-background">
                                <AvatarImage src={endorser.avatar} />
                                <AvatarFallback className="text-xs">
                                  {endorser.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <Button size="sm" variant="outline">
                          <Users className="h-3 w-3 mr-1" />
                          Request Endorsement
                        </Button>
                        <Button size="sm" className="bg-accent hover:bg-accent-hover">
                          View Details
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="card-professional">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    {assessment.badgeUrl && (
                      <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                    )}
                    <h3 className="font-bold mb-2">{assessment.skillName}</h3>
                    <div className="text-2xl font-bold text-accent mb-1">
                      {assessment.score}/{assessment.maxScore}
                    </div>
                    <p className="text-sm text-muted-foreground">Assessment Score</p>
                  </div>

                  <div className="space-y-3">
                    <Progress value={(assessment.score / assessment.maxScore) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Completed: {new Date(assessment.completedAt).toLocaleDateString()}</span>
                      {assessment.certificate && (
                        <Badge className="bg-success text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Certified
                        </Badge>
                      )}
                    </div>

                    <Button size="sm" className="w-full" variant="outline">
                      {assessment.certificate ? 'View Certificate' : 'Retake Assessment'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add Assessment Card */}
            <Card className="card-professional border-dashed border-2 hover:border-accent transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">Take New Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Validate your skills with industry-standard assessments
                </p>
                <Button size="sm" className="btn-professional">
                  Browse Assessments
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <Card key={cert.id} className="card-professional">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold">{cert.name}</h3>
                        {cert.verified && (
                          <CheckCircle className="h-4 w-4 text-success" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Issued by {cert.issuer}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Issue Date:</span>
                          <span>{new Date(cert.issueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Expiry Date:</span>
                          <span>{new Date(cert.expiryDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Credential ID:</span>
                          <span className="font-mono text-xs">{cert.credentialId}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-4">
                        <Button size="sm" variant="outline">
                          View Certificate
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-accent" />
                <span>AI-Powered Skill Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg">
                  <h4 className="font-medium mb-2">High Priority</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Kubernetes</span>
                      <Badge className="bg-success">90% Job Match</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">GraphQL</span>
                      <Badge className="bg-success">85% Job Match</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">TypeScript</span>
                      <Badge className="bg-success">82% Job Match</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-premium/10 to-premium/5 rounded-lg">
                  <h4 className="font-medium mb-2">Trending Skills</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Prompt Engineering</span>
                      <Badge className="bg-orange-100 text-orange-700">+45% Demand</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Vector Databases</span>
                      <Badge className="bg-orange-100 text-orange-700">+38% Demand</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Edge Computing</span>
                      <Badge className="bg-orange-100 text-orange-700">+33% Demand</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full btn-hero">
                <Zap className="h-4 w-4 mr-2" />
                Get Personalized Learning Path
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillsEndorsementSystem;