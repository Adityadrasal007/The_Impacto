import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Calendar,
  MapPin, 
  Users,
  Clock,
  Video,
  Star,
  Heart,
  Share2,
  Filter,
  Search,
  Plus,
  Play,
  Eye,
  MessageCircle,
  Award,
  TrendingUp,
  Globe
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'virtual' | 'in-person' | 'hybrid';
  category: string;
  speaker: {
    name: string;
    title: string;
    company: string;
    avatar: string;
  };
  attendees: number;
  maxAttendees: number;
  price: number;
  rating: number;
  tags: string[];
  status: 'upcoming' | 'live' | 'completed';
  featured: boolean;
}

const EventManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const events: Event[] = [
    {
      id: "1",
      title: "AI in Software Development: Future Trends",
      description: "Explore how AI is revolutionizing software development with hands-on examples and case studies from industry leaders.",
      date: "2024-11-15",
      time: "2:00 PM PST",
      location: "Virtual Event",
      type: "virtual",
      category: "Technology",
      speaker: {
        name: "Dr. Sarah Chen",
        title: "AI Research Director",
        company: "Google",
        avatar: "/placeholder-user.jpg"
      },
      attendees: 342,
      maxAttendees: 500,
      price: 0,
      rating: 4.8,
      tags: ["AI", "Machine Learning", "Software Development"],
      status: "upcoming",
      featured: true
    },
    {
      id: "2",
      title: "Career Networking Mixer - Silicon Valley",
      description: "Connect with alumni and industry professionals in the heart of Silicon Valley. Food, drinks, and great conversations!",
      date: "2024-11-20",
      time: "6:00 PM PST",
      location: "Palo Alto, CA",
      type: "in-person",
      category: "Networking",
      speaker: {
        name: "Michael Rodriguez",
        title: "VP of Engineering",
        company: "Meta",
        avatar: "/placeholder-user.jpg"
      },
      attendees: 89,
      maxAttendees: 150,
      price: 25,
      rating: 4.9,
      tags: ["Networking", "Career", "Silicon Valley"],
      status: "upcoming",
      featured: false
    },
    {
      id: "3",
      title: "Startup Pitch Competition Finals", 
      description: "Watch the top 10 startup pitches compete for $100K in funding. Q&A session with VCs and successful entrepreneurs.",
      date: "2024-11-25",
      time: "1:00 PM PST",
      location: "Hybrid - SF & Online",
      type: "hybrid",
      category: "Entrepreneurship",
      speaker: {
        name: "Emily Johnson",
        title: "Managing Partner",
        company: "Sequoia Capital",
        avatar: "/placeholder-user.jpg"
      },
      attendees: 1250,
      maxAttendees: 2000,
      price: 15,
      rating: 4.7,
      tags: ["Startups", "Investing", "Pitch Competition"],
      status: "upcoming",
      featured: true
    }
  ];

  const categories = ["all", "Technology", "Networking", "Entrepreneurship", "Career Development", "Finance"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="card-professional">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">Alumni Events</CardTitle>
                <p className="text-muted-foreground">Connect, Learn, and Grow Together</p>
              </div>
            </div>
            <Button className="bg-accent hover:bg-accent-hover">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="browse" className="space-y-6">  
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Browse Events</span>
          </TabsTrigger>
          <TabsTrigger value="my-events" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>My Events</span>
          </TabsTrigger>
          <TabsTrigger value="live" className="flex items-center space-x-2">
            <Video className="h-4 w-4" />
            <span>Live Events</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Event</span>
          </TabsTrigger>
        </TabsList>

        {/* Browse Events Tab */}
        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <Card className="card-professional">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events, speakers, topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-accent hover:bg-accent-hover" : ""}
                    >
                      {category === "all" ? "All" : category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Events */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Featured Events</h3>
            <div className="grid gap-6">
              {filteredEvents.filter(e => e.featured).map((event) => (
                <Card key={event.id} className="card-professional hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      <div className="w-24 h-24 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-8 w-8 text-accent-foreground" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-xl font-semibold">{event.title}</h3>
                              {event.featured && (
                                <Badge className="bg-accent text-accent-foreground">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-3">{event.description}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-6 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {event.type === 'virtual' ? (
                              <Video className="h-4 w-4" />
                            ) : event.type === 'hybrid' ? (
                              <Globe className="h-4 w-4" />
                            ) : (
                              <MapPin className="h-4 w-4" />
                            )}
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees}/{event.maxAttendees}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={event.speaker.avatar} />
                              <AvatarFallback>
                                {event.speaker.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{event.speaker.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {event.speaker.title} at {event.speaker.company}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <p className="font-semibold text-lg">
                                {event.price === 0 ? 'Free' : `$${event.price}`}
                              </p>
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                <span className="text-xs">{event.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Share2 className="h-3 w-3" />
                              </Button>
                              <Button className="bg-accent hover:bg-accent-hover">
                                Register Now
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          {event.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Events */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">All Events</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.filter(e => !e.featured).map((event) => (
                <Card key={event.id} className="card-professional hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <Badge 
                          className={`${
                            event.type === 'virtual' ? 'bg-blue-100 text-blue-800' :
                            event.type === 'hybrid' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}
                        >
                          {event.type}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>  
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 line-clamp-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={event.speaker.avatar} />
                          <AvatarFallback>
                            {event.speaker.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{event.speaker.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {event.speaker.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="font-semibold">
                            {event.price === 0 ? 'Free' : `$${event.price}`}
                          </p>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs">{event.rating}</span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-accent hover:bg-accent-hover">
                          Register
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* My Events Tab */}
        <TabsContent value="my-events" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-professional"> 
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium mb-2">{event.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <span>{event.date}</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-accent hover:bg-accent-hover">
                        Join Event
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader>
                <CardTitle>Event Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
                      <p className="text-2xl font-bold text-accent">12</p>
                      <p className="text-sm text-muted-foreground">Events Attended</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
                      <p className="text-2xl font-bold text-accent">3</p>
                      <p className="text-sm text-muted-foreground">Upcoming</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Award className="h-5 w-5 text-accent" />
                      <h4 className="font-medium">Event Enthusiast</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You're in the top 10% of event attendees!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Live Events Tab */}
        <TabsContent value="live" className="space-y-6">
          <Card className="card-professional">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Video className="h-16 w-16 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Live Events</h3>
                <p className="text-muted-foreground mb-6">
                  Check back soon for live streaming events and real-time discussions.
                </p>
                <Button className="bg-accent hover:bg-accent-hover">
                  <Play className="h-4 w-4 mr-2" />
                  Browse Upcoming Events
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Event Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
              <p className="text-muted-foreground">
                Share your knowledge and connect with the alumni community
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Plus className="h-16 w-16 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Event Creation Coming Soon</h3>
                <p className="text-muted-foreground mb-6">
                  Advanced event creation tools with registration management, 
                  live streaming, and analytics will be available soon.
                </p>
                <Button className="bg-accent hover:bg-accent-hover">
                  Get Notified
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventManagement;