import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Bell, 
  Calendar, 
  User,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  TrendingUp,
  Award,
  Briefcase,
  GraduationCap
} from "lucide-react";
import Header from "@/components/Header";

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock news data
  const newsArticles = [
    {
      id: 1,
      title: "Alumni Startup Raises $10M Series A",
      excerpt: "TechFlow, founded by 2018 graduate Sarah Chen, successfully closes Series A funding round led by top venture capital firms.",
      content: "TechFlow, the innovative SaaS platform founded by computer science alumna Sarah Chen (Class of 2018), has successfully raised $10 million in Series A funding...",
      author: "Alumni Relations Team",
      publishedDate: "2024-01-10",
      category: "Success Stories",
      tags: ["Entrepreneurship", "Funding", "Technology"],
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
      likes: 124,
      comments: 23,
      featured: true,
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Career Services Program Launched",
      excerpt: "The university announces expanded career services specifically designed for recent graduates and young alumni.",
      content: "We're excited to announce the launch of our new Career Accelerator Program, designed to support alumni in the first five years of their careers...",
      author: "Career Services",
      publishedDate: "2024-01-08",
      category: "University News",
      tags: ["Career Services", "Programs", "Support"],
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
      likes: 89,
      comments: 12,
      featured: false,
      readTime: "2 min read"
    },
    {
      id: 3,
      title: "Alumni Excellence Awards 2024",
      excerpt: "Celebrating outstanding achievements of our alumni across various industries and their contributions to society.",
      content: "The annual Alumni Excellence Awards recognize graduates who have made significant contributions to their fields and communities...",
      author: "Alumni Association",
      publishedDate: "2024-01-05",
      category: "Awards",
      tags: ["Awards", "Recognition", "Excellence"],
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=400&fit=crop",
      likes: 201,
      comments: 45,
      featured: true,
      readTime: "5 min read"
    },
    {
      id: 4,
      title: "Healthcare Innovation Summit Recap",
      excerpt: "Key insights and networking highlights from our recent Healthcare Innovation Summit featuring alumni leaders.",
      content: "Last month's Healthcare Innovation Summit brought together over 200 healthcare professionals, including many distinguished alumni...",
      author: "Dr. Emily Johnson",
      publishedDate: "2024-01-03",
      category: "Events",
      tags: ["Healthcare", "Innovation", "Summit"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      likes: 156,
      comments: 34,
      featured: false,
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "Global Alumni Network Expansion",
      excerpt: "Our alumni network now spans 50+ countries with new chapters opening in emerging markets worldwide.",
      content: "We're thrilled to announce the continued expansion of our global alumni network, with new chapters recently established in...",
      author: "Global Relations",
      publishedDate: "2023-12-28",
      category: "Network Updates",
      tags: ["Global", "Expansion", "Chapters"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      likes: 92,
      comments: 18,
      featured: false,
      readTime: "3 min read"
    },
    {
      id: 6,
      title: "Tech Industry Trends Report 2024",
      excerpt: "Annual report analyzing career trends and opportunities in technology based on alumni survey data.",
      content: "Our comprehensive analysis of technology sector trends, based on responses from over 1,000 alumni in tech roles...",
      author: "Research Team",
      publishedDate: "2023-12-20",
      category: "Industry Insights",
      tags: ["Technology", "Trends", "Research"],
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
      likes: 178,
      comments: 56,
      featured: true,
      readTime: "8 min read"
    }
  ];

  const categories = [
    { id: "all", label: "All News", count: newsArticles.length, icon: Bell },
    { id: "success-stories", label: "Success Stories", count: newsArticles.filter(n => n.category === "Success Stories").length, icon: Award },
    { id: "university-news", label: "University News", count: newsArticles.filter(n => n.category === "University News").length, icon: GraduationCap },
    { id: "events", label: "Events", count: newsArticles.filter(n => n.category === "Events").length, icon: Calendar },
    { id: "industry-insights", label: "Industry Insights", count: newsArticles.filter(n => n.category === "Industry Insights").length, icon: TrendingUp },
    { id: "featured", label: "Featured", count: newsArticles.filter(n => n.featured).length, icon: TrendingUp }
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" ||
                           article.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory ||
                           (selectedCategory === "featured" && article.featured);
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
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
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Bell className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gradient-primary">Alumni News</h1>
                <p className="text-muted-foreground">Stay updated with the latest alumni achievements and university news</p>
              </div>
            </div>
          </div>

          {/* Search and Categories */}
          <div className="mb-8 space-y-6 animate-fade-in">
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search news by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id 
                      ? "btn-professional" 
                      : "btn-outline-pro"
                  } flex items-center space-x-2`}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.label}</span>
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8 animate-fade-in">
            <p className="text-muted-foreground">
              Showing {filteredNews.length} of {newsArticles.length} articles
            </p>
          </div>

          {/* News Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredNews.map((article, index) => (
              <Card 
                key={article.id} 
                className={`card-professional hover-lift group animate-fade-in overflow-hidden ${
                  article.featured ? 'ring-2 ring-accent/20' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                      {article.category}
                    </Badge>
                  </div>
                  {article.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent text-accent-foreground">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4">
                    <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">
                      {article.readTime}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(article.publishedDate)}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{article.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{article.comments}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button className="btn-professional flex-1">
                      Read More
                    </Button>
                    <Button variant="outline" className="btn-outline-pro">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="btn-outline-pro">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredNews.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or check back later for new content
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 animate-fade-in">
            <Card className="card-hero p-8 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Stay in the Loop</h3>
              <p className="text-muted-foreground mb-6">
                Get the latest alumni news and updates delivered straight to your inbox
              </p>
              <div className="flex space-x-3 max-w-md mx-auto">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button className="btn-hero">
                  Subscribe
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default News;