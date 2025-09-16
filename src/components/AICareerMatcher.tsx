import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain,
  Target,
  TrendingUp,
  Users,
  Briefcase,
  Star,
  ChevronRight,
  Zap,
  Award,
  BookOpen,
  Code,
  PieChart
} from "lucide-react";

const AICareerMatcher = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const skillsData = [
    { skill: "JavaScript", level: 92, trend: "+15%" },
    { skill: "React", level: 88, trend: "+12%" },
    { skill: "TypeScript", level: 85, trend: "+20%" },
    { skill: "Node.js", level: 80, trend: "+8%" },
    { skill: "Python", level: 75, trend: "+25%" },
    { skill: "Machine Learning", level: 65, trend: "+35%" }
  ];

  const careerMatches = [
    {
      title: "Senior Full Stack Developer",
      company: "Google",
      match: 95,
      salary: "$150k - $200k",
      location: "San Francisco, CA",
      skills: ["React", "TypeScript", "Node.js"],
      type: "Full-time",
      remote: true
    },
    {
      title: "AI/ML Engineer",
      company: "OpenAI",
      match: 88,
      salary: "$180k - $250k", 
      location: "San Francisco, CA",
      skills: ["Python", "Machine Learning", "TensorFlow"],
      type: "Full-time",
      remote: false
    },
    {
      title: "Tech Lead - Frontend",
      company: "Meta",
      match: 92,
      salary: "$160k - $220k",
      location: "Menlo Park, CA",
      skills: ["React", "JavaScript", "Leadership"],
      type: "Full-time",
      remote: true
    }
  ];

  const learningRecommendations = [
    {
      title: "Advanced Machine Learning",
      provider: "Stanford Online",
      duration: "12 weeks",
      difficulty: "Advanced",
      impact: "High",
      relevance: 95
    },
    {
      title: "System Design Interview Prep",
      provider: "AlgoExpert",
      duration: "8 weeks", 
      difficulty: "Intermediate",
      impact: "High",
      relevance: 90
    },
    {
      title: "Cloud Architecture (AWS)",
      provider: "AWS Training",
      duration: "6 weeks",
      difficulty: "Intermediate", 
      impact: "Medium",
      relevance: 85
    }
  ];

  const handleAnalyzeProfile = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <Card className="card-professional">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">AI Career Intelligence</CardTitle>
                <p className="text-muted-foreground">Powered by advanced matching algorithms</p>
              </div>
            </div>
            <Button 
              onClick={handleAnalyzeProfile}
              disabled={isAnalyzing}
              className="bg-gradient-primary hover:opacity-90"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Profile
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        {isAnalyzing && (
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Analyzing your profile...</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Processing skills, experience, and market trends
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      <Tabs defaultValue="matches" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="matches" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Career Matches</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Skills Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Learning Path</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center space-x-2">
            <PieChart className="h-4 w-4" />
            <span>Market Insights</span>
          </TabsTrigger>
        </TabsList>

        {/* Career Matches Tab */}
        <TabsContent value="matches" className="space-y-4">
          <div className="grid gap-4">
            {careerMatches.map((job, index) => (
              <Card key={index} className="card-professional hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <Badge className="bg-accent text-accent-foreground">
                          {job.match}% match
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{job.company} • {job.location}</p>
                      <p className="font-medium text-accent mb-3">{job.salary}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.remote && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Remote
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-4">
                        <Button className="bg-accent hover:bg-accent-hover">
                          Apply Now
                        </Button>
                        <Button variant="outline">
                          Learn More
                        </Button>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          12 alumni connections
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-accent">{job.match}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Match Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Skills Analysis Tab */}
        <TabsContent value="skills" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-accent" />
                  <span>Skill Proficiency</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillsData.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.skill}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600">
                          {skill.trend}
                        </Badge>
                        <span className="text-sm font-medium">{skill.level}%</span>
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span>Skill Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
                    <h4 className="font-medium mb-2">Top Priority</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Cloud Computing skills are in high demand and align with your career goals.
                    </p>
                    <Button size="sm" className="bg-accent hover:bg-accent-hover">
                      Start Learning
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">DevOps</span>
                      <Badge>High Impact</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">GraphQL</span>
                      <Badge variant="outline">Medium Impact</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Learning Path Tab */}
        <TabsContent value="learning" className="space-y-4">
          <div className="grid gap-4">
            {learningRecommendations.map((course, index) => (
              <Card key={index} className="card-professional">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                      <p className="text-muted-foreground mb-3">{course.provider}</p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-muted-foreground">Duration:</span>
                          <span className="text-sm font-medium">{course.duration}</span>
                        </div>
                        <Badge variant={course.difficulty === 'Advanced' ? 'default' : 'outline'}>
                          {course.difficulty}
                        </Badge>
                        <Badge className="bg-accent text-accent-foreground">
                          {course.impact} Impact
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Button className="bg-accent hover:bg-accent-hover">
                          Enroll Now
                        </Button>
                        <Button variant="outline">
                          View Curriculum
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mb-2">
                        <span className="text-lg font-bold text-accent">{course.relevance}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Relevance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Market Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-professional">
              <CardHeader>
                <CardTitle>Market Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <p className="font-medium">AI/ML Engineers</p>
                      <p className="text-sm text-muted-foreground">Demand Growth</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">+45%</p>
                      <p className="text-xs text-muted-foreground">YoY</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div>
                      <p className="font-medium">Full Stack Developers</p>
                      <p className="text-sm text-muted-foreground">Salary Growth</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">+12%</p>
                      <p className="text-xs text-muted-foreground">Avg.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader>
                <CardTitle>Your Market Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Top 15%</h3>
                  <p className="text-muted-foreground mb-4">
                    You rank in the top 15% of candidates in your field
                  </p>
                  <Button className="bg-accent hover:bg-accent-hover">
                    Boost Your Ranking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AICareerMatcher;