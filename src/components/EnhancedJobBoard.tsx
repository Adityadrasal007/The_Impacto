import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock,
  DollarSign,
  Building,
  Users,
  ExternalLink,
  Bookmark,
  Filter,
  TrendingUp,
  ChevronDown,
  Grid,
  List,
  SortAsc,
  Star,
  Eye,
  Send,
  Heart,
  Share2,
  BookmarkPlus,
  Calendar,
  Award,
  Zap,
  Target,
  Globe
} from "lucide-react";
import Header from "@/components/Header";

const EnhancedJobBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortBy, setSortBy] = useState("posted");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedSalaryRange, setSelectedSalaryRange] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  // Enhanced job data
  const jobListings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Infosys",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      experienceLevel: "Senior",
      salary: "₹25L - ₹45L",
      salaryMin: 2500000,
      salaryMax: 4500000,
      postedBy: "Priya Sharma",
      postedDate: "2024-01-10",
      appliedCount: 23,
      viewCount: 156,
      description: "We're looking for a senior frontend developer to join our growing team and lead the development of our next-generation SaaS platform...",
      requirements: ["React", "TypeScript", "5+ years experience", "Team Leadership"],
      responsibilities: ["Lead frontend architecture decisions", "Mentor junior developers", "Collaborate with design team", "Optimize performance"],
      benefits: ["Health Insurance", "Provident Fund (PF)", "Remote Work", "Learning Budget"],
      remote: true,
      featured: true,
      urgent: false,
      companyLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      industry: "Technology",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      applicationDeadline: "2024-02-15",
      jobScore: 95,
      matchPercentage: 92
    },
    {
      id: 2,
      title: "Product Manager",
      company: "TCS",
      location: "Mumbai, Maharashtra", 
      type: "Full-time",
      experienceLevel: "Mid-Level",
      salary: "₹20L - ₹35L",
      salaryMin: 2000000,
      salaryMax: 3500000,
      postedBy: "Arjun Patel",
      postedDate: "2024-01-08",
      appliedCount: 47,
      viewCount: 289,
      description: "Lead product development for our flagship SaaS platform serving over 10,000 customers worldwide...",
      requirements: ["Product Strategy", "Analytics", "Leadership", "B2B SaaS Experience"],
      responsibilities: ["Define product roadmap", "Analyze user metrics", "Coordinate with engineering", "Stakeholder management"],
      benefits: ["Equity Package", "Health Insurance", "Flexible PTO", "Professional Development"],
      remote: false,
      featured: false,
      urgent: true,
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      industry: "Technology",
      skills: ["Product Management", "Analytics", "SQL", "Figma"],
      applicationDeadline: "2024-01-25",
      jobScore: 87,
      matchPercentage: 78
    },
    {
      id: 3,
      title: "Data Scientist Intern",
      company: "Swiggy",
      location: "Remote",
      type: "Internship",
      experienceLevel: "Entry Level",
      salary: "₹40k - ₹60k/month",
      salaryMin: 480000,
      salaryMax: 720000,
      postedBy: "Dr. Meera Gupta",
      postedDate: "2024-01-05",
      appliedCount: 156,
      viewCount: 445,
      description: "Summer internship opportunity for aspiring data scientists to work on real-world ML projects...",
      requirements: ["Python", "Machine Learning", "Statistics", "Currently Enrolled"],
      responsibilities: ["Build ML models", "Data analysis", "Research projects", "Present findings"],
      benefits: ["Mentorship Program", "Learning Stipend", "Remote Work", "Full-time Offer Potential"],
      remote: true,
      featured: false,
      urgent: false,
      companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
      industry: "Technology",
      skills: ["Python", "Pandas", "Scikit-learn", "TensorFlow"],
      applicationDeadline: "2024-02-01",
      jobScore: 82,
      matchPercentage: 89
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "Wipro",
      location: "Hyderabad, Telangana",
      type: "Full-time", 
      experienceLevel: "Entry Level",
      salary: "₹15L - ₹25L",
      salaryMin: 1500000,
      salaryMax: 2500000,
      postedBy: "Rajesh Kumar",
      postedDate: "2024-01-03",
      appliedCount: 89,
      viewCount: 567,
      description: "Join our investment banking division as an analyst and work on high-profile M&A transactions...",
      requirements: ["Financial Modeling", "Excel", "CFA preferred", "Strong Analytics"],
      responsibilities: ["Financial analysis", "Client presentations", "Market research", "Deal execution"],
      benefits: ["Performance Bonus", "Health Insurance", "Relocation Assistance", "Career Development"],
      remote: false,
      featured: true,
      urgent: true,
      companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
      industry: "Finance",
      skills: ["Excel", "Financial Modeling", "PowerPoint", "Bloomberg"],
      applicationDeadline: "2024-01-20",
      jobScore: 91,
      matchPercentage: 76
    }
  ];

  const industries = [...new Set(jobListings.map(j => j.industry))];
  const experienceLevels = [...new Set(jobListings.map(j => j.experienceLevel))];
  const salaryRanges = ["₹0 - ₹10L", "₹10L - ₹20L", "₹20L - ₹30L", "₹30L+"];

  const jobTypes = [
    { id: "all", label: "All Jobs", count: jobListings.length, icon: Briefcase },
    { id: "full-time", label: "Full-time", count: jobListings.filter(j => j.type === "Full-time").length, icon: Clock },
    { id: "part-time", label: "Part-time", count: jobListings.filter(j => j.type === "Part-time").length, icon: Clock },
    { id: "internship", label: "Internships", count: jobListings.filter(j => j.type === "Internship").length, icon: BookmarkPlus },
    { id: "remote", label: "Remote", count: jobListings.filter(j => j.remote).length, icon: Globe },
    { id: "featured", label: "Featured", count: jobListings.filter(j => j.featured).length, icon: Star },
    { id: "urgent", label: "Urgent", count: jobListings.filter(j => j.urgent).length, icon: Zap }
  ];

  const filteredJobs = useMemo(() => {
    return jobListings.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.requirements.some(req => req.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = selectedType === "all" ||
                         (selectedType === "full-time" && job.type === "Full-time") ||
                         (selectedType === "part-time" && job.type === "Part-time") ||
                         (selectedType === "internship" && job.type === "Internship") ||
                         (selectedType === "remote" && job.remote) ||
                         (selectedType === "featured" && job.featured) ||
                         (selectedType === "urgent" && job.urgent);

      const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(job.industry);
      const matchesExperience = selectedExperience.length === 0 || selectedExperience.includes(job.experienceLevel);
      
      const matchesSalary = selectedSalaryRange.length === 0 || selectedSalaryRange.some(range => {
        if (range === "₹0 - ₹10L") return job.salaryMax <= 1000000;
        if (range === "₹10L - ₹20L") return job.salaryMin >= 1000000 && job.salaryMax <= 2000000;
        if (range === "₹20L - ₹30L") return job.salaryMin >= 2000000 && job.salaryMax <= 3000000;
        if (range === "₹30L+") return job.salaryMin >= 3000000;
        return true;
      });
      
      return matchesSearch && matchesType && matchesIndustry && matchesExperience && matchesSalary;
    }).sort((a, b) => {
      switch (sortBy) {
        case "posted":
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        case "salary":
          return b.salaryMax - a.salaryMax;
        case "match":
          return b.matchPercentage - a.matchPercentage;
        case "applications":
          return a.appliedCount - b.appliedCount;
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedType, selectedIndustries, selectedExperience, selectedSalaryRange, sortBy, jobListings]);

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const JobCard = ({ job, index }: { job: any, index: number }) => (
    <Card 
      className={`card-professional hover-lift group animate-fade-in ${
        job.featured ? 'ring-2 ring-primary/20 bg-gradient-to-r from-card to-primary/5' : ''
      } ${job.urgent ? 'border-l-4 border-l-destructive' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1 min-w-0">
            {/* Company Logo */}
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover border border-border"
            />
            
            <div className="flex-1 min-w-0">
              {/* Job Title & Badges */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-1">
                    {job.title}
                  </CardTitle>
                  <div className="flex items-center space-x-3 text-muted-foreground mt-1">
                    <span className="flex items-center font-medium">
                      <Building className="h-4 w-4 mr-1" />
                      {job.company}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </span>
                  </div>
                </div>
                
                {/* Status Badges */}
                <div className="flex flex-col items-end space-y-2">
                  {job.featured && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {job.urgent && (
                    <Badge variant="destructive">
                      <Zap className="h-3 w-3 mr-1" />
                      Urgent
                    </Badge>
                  )}
                  <div className="flex items-center space-x-1 text-sm">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-primary font-medium">{job.matchPercentage}% match</span>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {job.type}
                </span>
                <span className="flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  {job.experienceLevel}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(job.postedDate).toLocaleDateString()}
                </span>
                {job.remote && (
                  <Badge variant="outline" className="text-primary border-primary">
                    Remote
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleSaveJob(job.id)}
            className="hover:bg-primary/10"
          >
            <Bookmark className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-primary text-primary' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            {/* Description */}
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {job.description}
            </p>
            
            {/* Skills & Requirements */}
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-2">Key Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.slice(0, 3).map((req: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                  {job.requirements.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.requirements.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Salary & Stats */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="font-medium">Salary</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                {job.salary}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Applied:</span>
                <span className="font-medium">{job.appliedCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Views:</span>
                <span className="font-medium">{job.viewCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Job Score:</span>
                <span className="font-bold text-primary">{job.jobScore}/100</span>
              </div>
            </div>

            {/* Application Deadline */}
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Deadline</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Posted by</p>
              <p className="font-medium text-primary">{job.postedBy}</p>
            </div>

            <div className="space-y-2">
              <Button className="btn-professional w-full">
                <Send className="h-4 w-4 mr-2" />
                Quick Apply
              </Button>
              <Button variant="outline" className="btn-outline-pro w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Heart className="h-4 w-4 mr-1" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Enhanced Page Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Briefcase className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gradient-primary">Career Hub</h1>
                  <p className="text-muted-foreground">Discover {jobListings.length}+ exclusive opportunities from our alumni network</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="btn-outline-pro">
                  <Eye className="h-4 w-4 mr-2" />
                  Job Alerts
                </Button>
                <Button className="btn-hero">
                  <Send className="h-4 w-4 mr-2" />
                  Post a Job
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="mb-8 space-y-6 animate-fade-in">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by job title, company, skills, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-32 py-6 text-lg"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                  <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <Card className="card-professional p-6 animate-fade-in">
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Industries</label>
                    <div className="space-y-2">
                      {industries.map(industry => (
                        <label key={industry} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedIndustries.includes(industry)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIndustries([...selectedIndustries, industry]);
                              } else {
                                setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
                              }
                            }}
                            className="rounded"
                          />
                          <span>{industry}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-3 block">Experience Level</label>
                    <div className="space-y-2">
                      {experienceLevels.map(level => (
                        <label key={level} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedExperience.includes(level)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedExperience([...selectedExperience, level]);
                              } else {
                                setSelectedExperience(selectedExperience.filter(l => l !== level));
                              }
                            }}
                            className="rounded"
                          />
                          <span>{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-3 block">Salary Range</label>
                    <div className="space-y-2">
                      {salaryRanges.map(range => (
                        <label key={range} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedSalaryRange.includes(range)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSalaryRange([...selectedSalaryRange, range]);
                              } else {
                                setSelectedSalaryRange(selectedSalaryRange.filter(r => r !== range));
                              }
                            }}
                            className="rounded"
                          />
                          <span>{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Quick Filters</label>
                    <div className="space-y-2">
                      <Button
                        variant={savedJobs.length > 0 ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          // Filter to show only saved jobs
                        }}
                      >
                        <Bookmark className="h-4 w-4 mr-2" />
                        Saved Jobs ({savedJobs.length})
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Clock className="h-4 w-4 mr-2" />
                        Recently Applied
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6 space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedIndustries([]);
                      setSelectedExperience([]);
                      setSelectedSalaryRange([]);
                    }}
                  >
                    Clear All
                  </Button>
                  <Button onClick={() => setShowAdvancedFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </Card>
            )}

            {/* Filter Buttons and Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                {jobTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "outline"}
                    onClick={() => setSelectedType(type.id)}
                    className={`${
                      selectedType === type.id 
                        ? "btn-professional" 
                        : "btn-outline-pro"
                    } flex items-center space-x-2`}
                  >
                    <type.icon className="h-4 w-4" />
                    <span>{type.label}</span>
                    <Badge variant="secondary" className="ml-1">
                      {type.count}
                    </Badge>
                  </Button>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                {/* Sort Options */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm bg-background"
                >
                  <option value="posted">Latest Posted</option>
                  <option value="salary">Highest Salary</option>
                  <option value="match">Best Match</option>
                  <option value="applications">Least Competitive</option>
                </select>

                {/* View Mode */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8 animate-fade-in flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredJobs.length} of {jobListings.length} opportunities
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Saved: {savedJobs.length} jobs</span>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or check back later for new opportunities
              </p>
              <Button onClick={() => { 
                setSearchQuery(""); 
                setSelectedType("all");
                setSelectedIndustries([]);
                setSelectedExperience([]);
                setSelectedSalaryRange([]);
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EnhancedJobBoard;