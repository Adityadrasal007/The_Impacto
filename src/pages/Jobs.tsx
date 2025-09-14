import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  TrendingUp
} from "lucide-react";
import Header from "@/components/Header";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Mock job data
  const jobListings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $180k",
      postedBy: "Sarah Chen",
      postedDate: "2 days ago",
      description: "We're looking for a senior frontend developer to join our growing team...",
      requirements: ["React", "TypeScript", "5+ years experience"],
      remote: true,
      featured: true,
      applicants: 23
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLabs",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$100k - $140k",
      postedBy: "Michael Rodriguez",
      postedDate: "1 week ago",
      description: "Lead product development for our flagship SaaS platform...",
      requirements: ["Product Strategy", "Analytics", "Leadership"],
      remote: false,
      featured: false,
      applicants: 47
    },
    {
      id: 3,
      title: "Data Scientist Intern",
      company: "DataFlow Solutions",
      location: "Remote",
      type: "Internship",
      salary: "$25 - $35/hr",
      postedBy: "Dr. Emily Johnson",
      postedDate: "3 days ago",
      description: "Summer internship opportunity for aspiring data scientists...",
      requirements: ["Python", "Machine Learning", "Statistics"],
      remote: true,
      featured: false,
      applicants: 156
    },
    {
      id: 4,
      title: "Investment Banking Analyst",
      company: "Goldman Sachs",
      location: "New York, NY",
      type: "Full-time",
      salary: "$85k - $120k",
      postedBy: "David Kim",
      postedDate: "5 days ago",
      description: "Join our investment banking division as an analyst...",
      requirements: ["Financial Modeling", "Excel", "CFA preferred"],
      remote: false,
      featured: true,
      applicants: 89
    },
    {
      id: 5,
      title: "Marketing Coordinator",
      company: "BrandBoost Agency",
      location: "Chicago, IL",
      type: "Part-time",
      salary: "$40k - $55k",
      postedBy: "Lisa Wang",
      postedDate: "1 day ago",
      description: "Coordinate marketing campaigns for diverse client portfolio...",
      requirements: ["Digital Marketing", "Social Media", "Creativity"],
      remote: true,
      featured: false,
      applicants: 34
    },
    {
      id: 6,
      title: "Software Engineering Manager",
      company: "StartupX",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$150k - $220k",
      postedBy: "James Wilson",
      postedDate: "4 days ago",
      description: "Lead a team of 8 engineers building next-gen clean tech solutions...",
      requirements: ["Leadership", "System Design", "10+ years experience"],
      remote: false,
      featured: true,
      applicants: 67
    }
  ];

  const jobTypes = [
    { id: "all", label: "All Jobs", count: jobListings.length },
    { id: "full-time", label: "Full-time", count: jobListings.filter(j => j.type === "Full-time").length },
    { id: "part-time", label: "Part-time", count: jobListings.filter(j => j.type === "Part-time").length },
    { id: "internship", label: "Internships", count: jobListings.filter(j => j.type === "Internship").length },
    { id: "remote", label: "Remote", count: jobListings.filter(j => j.remote).length },
    { id: "featured", label: "Featured", count: jobListings.filter(j => j.featured).length }
  ];

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.requirements.some(req => req.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === "all" ||
                       (selectedType === "full-time" && job.type === "Full-time") ||
                       (selectedType === "part-time" && job.type === "Part-time") ||
                       (selectedType === "internship" && job.type === "Internship") ||
                       (selectedType === "remote" && job.remote) ||
                       (selectedType === "featured" && job.featured);
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gradient-primary">Job Board</h1>
                  <p className="text-muted-foreground">Discover exclusive opportunities from alumni network</p>
                </div>
              </div>
              <Button className="btn-hero">
                Post a Job
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-6 animate-fade-in">
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>

            {/* Filter Buttons */}
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
                  <span>{type.label}</span>
                  <Badge variant="secondary" className="ml-2">
                    {type.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8 animate-fade-in">
            <p className="text-muted-foreground">
              Showing {filteredJobs.length} of {jobListings.length} opportunities
            </p>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <Card 
                key={job.id} 
                className={`card-professional hover-lift group animate-fade-in ${
                  job.featured ? 'ring-2 ring-accent/20 bg-gradient-to-r from-card to-accent/5' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {job.title}
                        </CardTitle>
                        {job.featured && (
                          <Badge className="bg-accent text-accent-foreground">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Building className="h-4 w-4" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="hover:bg-accent/20">
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-2">
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {job.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.map((req, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <DollarSign className="h-4 w-4 text-accent" />
                          <span className="font-medium">Salary</span>
                        </div>
                        <p className="text-lg font-semibold text-accent">
                          {job.salary}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Applicants</span>
                        </div>
                        <p className="font-medium">{job.applicants} applied</p>
                      </div>

                      {job.remote && (
                        <Badge variant="outline" className="text-accent border-accent">
                          Remote Friendly
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Posted by</p>
                        <p className="font-medium text-primary">{job.postedBy}</p>
                        <p className="text-xs text-muted-foreground">{job.postedDate}</p>
                      </div>

                      <div className="space-y-2">
                        <Button className="btn-professional w-full">
                          Apply Now
                        </Button>
                        <Button variant="outline" className="btn-outline-pro w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
              <Button onClick={() => { setSearchQuery(""); setSelectedType("all"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Jobs;