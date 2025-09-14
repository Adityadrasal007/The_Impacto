import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar, 
  MapPin, 
  Clock,
  Users,
  ExternalLink,
  Heart,
  Share2,
  Filter,
  Video,
  Building,
  Star
} from "lucide-react";
import Header from "@/components/Header";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Tech Alumni Networking Night",
      date: "2024-01-15",
      time: "6:00 PM - 9:00 PM",
      location: "San Francisco, CA",
      venue: "TechHub SF",
      type: "Networking",
      mode: "In-Person",
      organizer: "Sarah Chen",
      attendees: 47,
      maxAttendees: 100,
      price: "Free",
      description: "Join fellow tech alumni for an evening of networking, drinks, and discussions about the latest industry trends.",
      tags: ["Technology", "Networking", "Career"],
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
      featured: true,
      rsvpd: false
    },
    {
      id: 2,
      title: "Healthcare Innovation Webinar",
      date: "2024-01-20",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual Event",
      venue: "Zoom",
      type: "Educational",
      mode: "Virtual",
      organizer: "Dr. Emily Johnson",
      attendees: 156,
      maxAttendees: 500,
      price: "$25",
      description: "Explore the latest innovations in healthcare technology and their impact on patient care.",
      tags: ["Healthcare", "Innovation", "Technology"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      featured: false,
      rsvpd: true
    },
    {
      id: 3,
      title: "Finance Career Panel",
      date: "2024-01-25",
      time: "7:00 PM - 8:30 PM",
      location: "New York, NY",
      venue: "Alumni Center",
      type: "Panel",
      mode: "Hybrid",
      organizer: "David Kim",
      attendees: 89,
      maxAttendees: 200,
      price: "Free",
      description: "Industry leaders share insights about career paths in finance and investment banking.",
      tags: ["Finance", "Career", "Investment"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
      featured: true,
      rsvpd: false
    },
    {
      id: 4,
      title: "Startup Pitch Competition",
      date: "2024-02-01",
      time: "1:00 PM - 5:00 PM",
      location: "Austin, TX",
      venue: "Innovation Hub",
      type: "Competition",
      mode: "In-Person",
      organizer: "James Wilson",
      attendees: 234,
      maxAttendees: 300,
      price: "$50",
      description: "Watch alumni entrepreneurs pitch their startups to a panel of investors and industry experts.",
      tags: ["Entrepreneurship", "Startups", "Innovation"],
      image: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&h=400&fit=crop",
      featured: false,
      rsvpd: false
    },
    {
      id: 5,
      title: "Marketing Masterclass Series",
      date: "2024-02-05",
      time: "6:30 PM - 8:00 PM",
      location: "Chicago, IL",
      venue: "Marketing Center",
      type: "Workshop",
      mode: "In-Person",
      organizer: "Lisa Wang",
      attendees: 67,
      maxAttendees: 80,
      price: "$75",
      description: "Advanced digital marketing strategies for professionals looking to level up their skills.",
      tags: ["Marketing", "Digital", "Workshop"],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
      featured: false,
      rsvpd: true
    },
    {
      id: 6,
      title: "Annual Alumni Gala",
      date: "2024-02-14",
      time: "7:00 PM - 11:00 PM",
      location: "Los Angeles, CA",
      venue: "Grand Ballroom",
      type: "Social",
      mode: "In-Person",
      organizer: "Alumni Association",
      attendees: 456,
      maxAttendees: 500,
      price: "$125",
      description: "Celebrate achievements, honor distinguished alumni, and enjoy an elegant evening of networking.",
      tags: ["Gala", "Awards", "Networking"],
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=400&fit=crop",
      featured: true,
      rsvpd: false
    }
  ];

  const eventTypes = [
    { id: "all", label: "All Events", count: events.length },
    { id: "networking", label: "Networking", count: events.filter(e => e.type === "Networking").length },
    { id: "educational", label: "Educational", count: events.filter(e => e.type === "Educational").length },
    { id: "virtual", label: "Virtual", count: events.filter(e => e.mode === "Virtual").length },
    { id: "featured", label: "Featured", count: events.filter(e => e.featured).length },
    { id: "free", label: "Free", count: events.filter(e => e.price === "Free").length }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === "all" ||
                       (selectedType === "networking" && event.type === "Networking") ||
                       (selectedType === "educational" && event.type === "Educational") ||
                       (selectedType === "virtual" && event.mode === "Virtual") ||
                       (selectedType === "featured" && event.featured) ||
                       (selectedType === "free" && event.price === "Free");
    
    return matchesSearch && matchesType;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
                  <Calendar className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gradient-primary">Events</h1>
                  <p className="text-muted-foreground">Discover and attend alumni events in your area</p>
                </div>
              </div>
              <Button className="btn-hero">
                Create Event
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-6 animate-fade-in">
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search events by title, type, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {eventTypes.map((type) => (
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
              Showing {filteredEvents.length} of {events.length} events
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredEvents.map((event, index) => (
              <Card 
                key={event.id} 
                className={`card-professional hover-lift group animate-fade-in overflow-hidden ${
                  event.featured ? 'ring-2 ring-accent/20' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    {event.featured && (
                      <Badge className="bg-accent text-accent-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm hover:bg-background">
                      <Heart className={`h-4 w-4 ${event.rsvpd ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm hover:bg-background">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                      {event.mode === "Virtual" ? (
                        <><Video className="h-3 w-3 mr-1" /> Virtual</>
                      ) : event.mode === "Hybrid" ? (
                        <><Building className="h-3 w-3 mr-1" /> Hybrid</>
                      ) : (
                        <><MapPin className="h-3 w-3 mr-1" /> In-Person</>
                      )}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                        {event.title}
                      </CardTitle>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">
                        {event.price}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Event Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees}/{event.maxAttendees} attending</span>
                      </div>
                      <div>
                        <span>By {event.organizer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Bar */}
                  <div className="w-full bg-muted rounded-full h-2 mb-6">
                    <div 
                      className="bg-accent rounded-full h-2 transition-all duration-300" 
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      className={`flex-1 ${event.rsvpd ? 'btn-outline-pro' : 'btn-professional'}`}
                    >
                      {event.rsvpd ? 'RSVP\'d' : 'RSVP'}
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
          {filteredEvents.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or check back later for new events
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

export default Events;