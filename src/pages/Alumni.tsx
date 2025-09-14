import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Building
} from "lucide-react";
import Header from "@/components/Header";

const Alumni = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock alumni data
  const alumniProfiles = [
    {
      id: 1,
      name: "Sarah Chen",
      graduationYear: 2018,
      title: "Senior Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      industry: "Technology",
      skills: ["React", "Python", "Machine Learning"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      verified: true,
      mentoring: true
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      graduationYear: 2015,
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      industry: "Technology",
      skills: ["Product Strategy", "Analytics", "Leadership"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      verified: true,
      mentoring: false
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      graduationYear: 2012,
      title: "Chief Medical Officer",
      company: "Johns Hopkins Hospital",
      location: "Baltimore, MD",
      industry: "Healthcare",
      skills: ["Medical Research", "Leadership", "Innovation"],
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      verified: true,
      mentoring: true
    },
    {
      id: 4,
      name: "David Kim",
      graduationYear: 2019,
      title: "Investment Analyst",
      company: "Goldman Sachs",
      location: "New York, NY",
      industry: "Finance",
      skills: ["Financial Analysis", "Risk Management", "Excel"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      verified: true,
      mentoring: true
    },
    {
      id: 5,
      name: "Lisa Wang",
      graduationYear: 2016,
      title: "Marketing Director",
      company: "Tesla",
      location: "Austin, TX",
      industry: "Automotive",
      skills: ["Digital Marketing", "Brand Strategy", "Analytics"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      verified: true,
      mentoring: false
    },
    {
      id: 6,
      name: "James Wilson",
      graduationYear: 2014,
      title: "Startup Founder",
      company: "EcoTech Solutions",
      location: "Denver, CO",
      industry: "Clean Energy",
      skills: ["Entrepreneurship", "Sustainability", "Leadership"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      verified: true,
      mentoring: true
    }
  ];

  const filters = [
    { id: "all", label: "All Alumni", count: alumniProfiles.length },
    { id: "mentoring", label: "Available for Mentoring", count: alumniProfiles.filter(a => a.mentoring).length },
    { id: "recent", label: "Recent Graduates", count: alumniProfiles.filter(a => a.graduationYear >= 2020).length },
    { id: "technology", label: "Technology", count: alumniProfiles.filter(a => a.industry === "Technology").length },
    { id: "healthcare", label: "Healthcare", count: alumniProfiles.filter(a => a.industry === "Healthcare").length },
    { id: "finance", label: "Finance", count: alumniProfiles.filter(a => a.industry === "Finance").length }
  ];

  const filteredAlumni = alumniProfiles.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alumni.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" ||
                         (selectedFilter === "mentoring" && alumni.mentoring) ||
                         (selectedFilter === "recent" && alumni.graduationYear >= 2020) ||
                         alumni.industry.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gradient-primary">Alumni Directory</h1>
                <p className="text-muted-foreground">Connect with {alumniProfiles.length}+ successful graduates</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-6 animate-fade-in">
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, company, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>

            {/* Filter Buttons */}
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
                  <span>{filter.label}</span>
                  <Badge variant="secondary" className="ml-2">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8 animate-fade-in">
            <p className="text-muted-foreground">
              Showing {filteredAlumni.length} of {alumniProfiles.length} alumni
            </p>
          </div>

          {/* Alumni Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlumni.map((alumni, index) => (
              <Card 
                key={alumni.id} 
                className="card-professional hover-lift group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  {/* Profile Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="relative">
                      <img
                        src={alumni.image}
                        alt={alumni.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-border group-hover:ring-primary transition-colors"
                      />
                      {alumni.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                          <Award className="h-3 w-3 text-accent-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                        {alumni.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Class of {alumni.graduationYear}
                      </p>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{alumni.title}</p>
                        <p className="text-muted-foreground text-xs truncate">{alumni.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm text-muted-foreground truncate">{alumni.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{alumni.industry}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {alumni.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {alumni.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{alumni.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Mentoring Status */}
                  {alumni.mentoring && (
                    <div className="mb-6 p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium text-accent-foreground">
                          Available for Mentoring
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button className="btn-professional flex-1 text-sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                    <Button variant="outline" className="btn-outline-pro">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
              <Button onClick={() => { setSearchQuery(""); setSelectedFilter("all"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Alumni;