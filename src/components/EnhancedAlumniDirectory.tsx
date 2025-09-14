import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  MessageCircle,
  Calendar,
  ExternalLink,
  Users,
  Award,
  Building,
  Star,
  BookOpen,
  Linkedin,
  Globe,
  Phone,
  Mail,
  Video,
  Coffee,
  Network,
  TrendingUp,
  ChevronDown,
  Grid,
  List,
  SortAsc
} from "lucide-react";
import Header from "@/components/Header";

const EnhancedAlumniDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Extended mock alumni data
  const alumniProfiles = [
    {
      id: 1,
      name: "Sarah Chen",
      graduationYear: 2018,
      title: "Senior Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      industry: "Technology",
      skills: ["React", "Python", "Machine Learning", "Cloud Architecture"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      verified: true,
      mentoring: true,
      achievements: ["Tech Innovation Award 2023", "Google Developer Expert"],
      bio: "Passionate about building scalable web applications and AI-powered solutions. Love mentoring junior developers.",
      connections: 847,
      responseRate: 95,
      availability: "Available for mentoring",
      linkedIn: "sarah-chen-dev",
      portfolio: "sarahchen.dev",
      phone: "+1-555-0123",
      email: "s.chen@email.com",
      expertise: ["Technical Leadership", "System Design", "Team Building"],
      interests: ["Hiking", "Photography", "Open Source"],
      languages: ["English", "Mandarin", "Spanish"],
      certifications: ["AWS Solutions Architect", "Google Cloud Professional"]
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      graduationYear: 2015,
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      industry: "Technology",
      skills: ["Product Strategy", "Analytics", "Leadership", "Agile"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      verified: true,
      mentoring: false,
      achievements: ["Product of the Year 2022", "Microsoft MVP"],
      bio: "Product leader with 8+ years of experience shipping consumer and enterprise products at scale.",
      connections: 1203,
      responseRate: 87,
      availability: "Limited availability",
      linkedIn: "michael-rodriguez-pm",
      portfolio: "michaelpm.com",
      phone: "+1-555-0124",
      email: "m.rodriguez@email.com",
      expertise: ["Product Strategy", "Market Research", "Cross-functional Leadership"],
      interests: ["Running", "Cooking", "Travel"],
      languages: ["English", "Spanish"],
      certifications: ["Certified Scrum Master", "Google Analytics Certified"]
    },
    // Add more profiles with enhanced data...
    {
      id: 3,
      name: "Dr. Emily Johnson",
      graduationYear: 2012,
      title: "Chief Medical Officer",
      company: "Johns Hopkins Hospital",
      location: "Baltimore, MD",
      industry: "Healthcare",
      skills: ["Medical Research", "Leadership", "Innovation", "Public Health"],
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      verified: true,
      mentoring: true,
      achievements: ["Medical Excellence Award", "Research Grant Recipient"],
      bio: "Leading healthcare innovation and research in personalized medicine and digital health solutions.",
      connections: 654,
      responseRate: 92,
      availability: "Available for consultations",
      linkedIn: "dr-emily-johnson",
      portfolio: "emilyjohnsonmd.com",
      phone: "+1-555-0125",
      email: "e.johnson@email.com",
      expertise: ["Healthcare Strategy", "Medical Research", "Digital Health"],
      interests: ["Medical Ethics", "Yoga", "Medical Writing"],
      languages: ["English", "French"],
      certifications: ["Board Certified Internal Medicine", "Digital Health Certificate"]
    }
  ];

  const industries = [...new Set(alumniProfiles.map(p => p.industry))];
  const years = [...new Set(alumniProfiles.map(p => p.graduationYear.toString()))].sort((a, b) => parseInt(b) - parseInt(a));
  const locations = [...new Set(alumniProfiles.map(p => p.location.split(', ')[1] || p.location))];

  const filters = [
    { id: "all", label: "All Alumni", count: alumniProfiles.length, icon: Users },
    { id: "mentoring", label: "Available for Mentoring", count: alumniProfiles.filter(a => a.mentoring).length, icon: GraduationCap },
    { id: "verified", label: "Verified Alumni", count: alumniProfiles.filter(a => a.verified).length, icon: Award },
    { id: "recent", label: "Recent Graduates (2020+)", count: alumniProfiles.filter(a => a.graduationYear >= 2020).length, icon: TrendingUp },
    { id: "senior", label: "Senior Level", count: alumniProfiles.filter(a => a.title.toLowerCase().includes('senior') || a.title.toLowerCase().includes('chief') || a.title.toLowerCase().includes('director')).length, icon: Building }
  ];

  const filteredAlumni = useMemo(() => {
    return alumniProfiles.filter(alumni => {
      const matchesSearch = alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           alumni.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           alumni.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = selectedFilter === "all" ||
                           (selectedFilter === "mentoring" && alumni.mentoring) ||
                           (selectedFilter === "verified" && alumni.verified) ||
                           (selectedFilter === "recent" && alumni.graduationYear >= 2020) ||
                           (selectedFilter === "senior" && (alumni.title.toLowerCase().includes('senior') || alumni.title.toLowerCase().includes('chief') || alumni.title.toLowerCase().includes('director')));

      const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(alumni.industry);
      const matchesYear = selectedYears.length === 0 || selectedYears.includes(alumni.graduationYear.toString());
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.some(loc => alumni.location.includes(loc));
      
      return matchesSearch && matchesFilter && matchesIndustry && matchesYear && matchesLocation;
    }).sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "year":
          return b.graduationYear - a.graduationYear;
        case "connections":
          return b.connections - a.connections;
        case "response":
          return b.responseRate - a.responseRate;
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedFilter, selectedIndustries, selectedYears, selectedLocations, sortBy, alumniProfiles]);

  const AlumniCard = ({ alumni, index }: { alumni: any, index: number }) => (
    <Card 
      className="card-professional hover-lift group animate-fade-in overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-0">
        {/* Profile Header with Cover */}
        <div className="relative h-20 bg-gradient-primary">
          <div className="absolute -bottom-8 left-6">
            <div className="relative">
              <img
                src={alumni.image}
                alt={alumni.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-background"
              />
              {alumni.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Award className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-4 right-6 flex space-x-2">
            <Badge className={`${alumni.mentoring ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
              {alumni.mentoring ? 'Mentoring' : 'Not Available'}
            </Badge>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-10 p-6">
          {/* Basic Info */}
          <div className="mb-4">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
              {alumni.name}
            </h3>
            <p className="text-primary font-medium">{alumni.title}</p>
            <p className="text-muted-foreground text-sm">{alumni.company}</p>
            <p className="text-muted-foreground text-xs flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {alumni.location} • Class of {alumni.graduationYear}
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {alumni.bio}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="font-semibold text-sm">{alumni.connections}</div>
              <div className="text-xs text-muted-foreground">Connections</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-sm">{alumni.responseRate}%</div>
              <div className="text-xs text-muted-foreground">Response Rate</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-sm">{alumni.skills.length}</div>
              <div className="text-xs text-muted-foreground">Skills</div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {alumni.skills.slice(0, 4).map((skill: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {alumni.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{alumni.skills.length - 4}
                </Badge>
              )}
            </div>
          </div>

          {/* Achievements */}
          {alumni.achievements && alumni.achievements.length > 0 && (
            <div className="mb-4 p-2 bg-primary/5 rounded-md">
              <div className="flex items-center mb-1">
                <Star className="h-3 w-3 text-primary mr-1" />
                <span className="text-xs font-medium text-primary">Recent Achievement</span>
              </div>
              <p className="text-xs text-muted-foreground">{alumni.achievements[0]}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button className="btn-professional flex-1 text-sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Connect
            </Button>
            <Button variant="outline" className="btn-outline-pro">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="btn-outline-pro">
              <Coffee className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AlumniListItem = ({ alumni, index }: { alumni: any, index: number }) => (
    <Card 
      className="card-professional hover-lift group animate-fade-in mb-4"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={alumni.image}
              alt={alumni.name}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-border"
            />
            {alumni.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Award className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                  {alumni.name}
                </h3>
                <p className="text-primary font-medium text-lg">{alumni.title}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {alumni.company}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {alumni.location}
                  </span>
                  <span className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    Class of {alumni.graduationYear}
                  </span>
                </div>
              </div>
              
              {/* Status & Actions */}
              <div className="flex flex-col items-end space-y-2">
                <Badge className={`${alumni.mentoring ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {alumni.mentoring ? 'Available for Mentoring' : 'Not Available'}
                </Badge>
                <div className="flex space-x-2">
                  <Button size="sm" className="btn-professional">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                  <Button size="sm" variant="outline" className="btn-outline-pro">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-muted-foreground mt-3 mb-3">
              {alumni.bio}
            </p>

            {/* Skills & Stats */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {alumni.skills.slice(0, 6).map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {alumni.skills.length > 6 && (
                  <Badge variant="outline" className="text-xs">
                    +{alumni.skills.length - 6} more
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{alumni.connections} connections</span>
                <span>{alumni.responseRate}% response rate</span>
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
                  <Network className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gradient-primary">Alumni Network</h1>
                  <p className="text-muted-foreground">Connect with {alumniProfiles.length}+ successful professionals worldwide</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="btn-outline-pro">
                  <Users className="h-4 w-4 mr-2" />
                  Join Network
                </Button>
                <Button className="btn-hero">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Networking
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Controls */}
          <div className="mb-8 space-y-6 animate-fade-in">
            {/* Search Bar with Advanced Options */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, company, skills, or expertise..."
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
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Industries</label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
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
                    <label className="text-sm font-medium mb-3 block">Graduation Years</label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {years.map(year => (
                        <label key={year} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedYears.includes(year)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedYears([...selectedYears, year]);
                              } else {
                                setSelectedYears(selectedYears.filter(y => y !== year));
                              }
                            }}
                            className="rounded"
                          />
                          <span>{year}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-3 block">Locations</label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {locations.map(location => (
                        <label key={location} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedLocations.includes(location)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLocations([...selectedLocations, location]);
                              } else {
                                setSelectedLocations(selectedLocations.filter(l => l !== location));
                              }
                            }}
                            className="rounded"
                          />
                          <span>{location}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4 space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedIndustries([]);
                      setSelectedYears([]);
                      setSelectedLocations([]);
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
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedFilter === filter.id ? "default" : "outline"}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`${
                      selectedFilter === filter.id 
                        ? "btn-professional" 
                        : "btn-outline-pro"
                    } flex items-center space-x-2`}
                  >
                    <filter.icon className="h-4 w-4" />
                    <span>{filter.label}</span>
                    <Badge variant="secondary" className="ml-1">
                      {filter.count}
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
                  <option value="name">Sort by Name</option>
                  <option value="year">Sort by Graduation Year</option>
                  <option value="connections">Sort by Connections</option>
                  <option value="response">Sort by Response Rate</option>
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
              Showing {filteredAlumni.length} of {alumniProfiles.length} alumni
            </p>
            {(selectedIndustries.length > 0 || selectedYears.length > 0 || selectedLocations.length > 0) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedIndustries([]);
                  setSelectedYears([]);
                  setSelectedLocations([]);
                  setSearchQuery("");
                  setSelectedFilter("all");
                }}
                className="text-sm"
              >
                Clear all filters
              </Button>
            )}
          </div>

          {/* Alumni Display */}
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAlumni.map((alumni, index) => (
                <AlumniCard key={alumni.id} alumni={alumni} index={index} />
              ))}
            </div>
          ) : (
            <div>
              {filteredAlumni.map((alumni, index) => (
                <AlumniListItem key={alumni.id} alumni={alumni} index={index} />
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredAlumni.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No alumni found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => { 
                setSearchQuery(""); 
                setSelectedFilter("all");
                setSelectedIndustries([]);
                setSelectedYears([]);
                setSelectedLocations([]);
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

export default EnhancedAlumniDirectory;