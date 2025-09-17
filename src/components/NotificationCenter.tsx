import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  BellRing, 
  BellOff,
  Check,
  X,
  Users,
  Briefcase,
  Calendar,
  MessageSquare,
  Award,
  TrendingUp,
  Settings,
  Filter,
  MoreVertical,
  Trash2,
  Archive,
  Star,
  Eye,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";

interface Notification {
  id: string;
  type: 'connection' | 'message' | 'job' | 'event' | 'achievement' | 'system' | 'endorsement';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionable: boolean;
  data?: any;
  avatar?: string;
  sender?: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
  digest: 'daily' | 'weekly' | 'never';
}

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filterPriority, setFilterPriority] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<{ [key: string]: NotificationSettings }>({});

  useEffect(() => {
    // Mock notifications data
    setNotifications([
      {
        id: "1",
        type: "connection",
        title: "New Connection Request",
        description: "Dr. Sarah Chen wants to connect with you",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        read: false,
        priority: "high",
        actionable: true,
        avatar: "/placeholder-user.jpg",
        sender: "Dr. Sarah Chen"
      },
      {
        id: "2",
        type: "message", 
        title: "New Message",
        description: "Michael Zhang sent you a message about the AI project",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        read: false,
        priority: "medium",
        actionable: true,
        avatar: "/placeholder-user.jpg",
        sender: "Michael Zhang"
      },
      {
        id: "3",
        type: "job",
        title: "Job Match Found",
        description: "Senior AI Engineer position at TechCorp matches your profile (95%)",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: true,
        priority: "high",
        actionable: true,
        data: { company: "TechCorp", matchScore: 95 }
      },
      {
        id: "4",
        type: "event",
        title: "Event Reminder",
        description: "AI Summit 2024 starts in 3 days - Don't forget to attend!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        read: false,
        priority: "medium",
        actionable: true,
        data: { eventName: "AI Summit 2024", daysUntil: 3 }
      },
      {
        id: "5",
        type: "achievement",
        title: "Achievement Unlocked!",
        description: "You've earned the 'Network Builder' achievement for connecting with 50+ professionals",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: true,
        priority: "medium",
        actionable: false,
        data: { achievement: "Network Builder", points: 500 }
      },
      {
        id: "6",
        type: "endorsement",
        title: "New Skill Endorsement", 
        description: "Emily Rodriguez endorsed you for Machine Learning",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        read: false,
        priority: "low",
        actionable: true,
        avatar: "/placeholder-user.jpg",
        sender: "Emily Rodriguez"
      },
      {
        id: "7",
        type: "system",
        title: "Profile Views Increased",
        description: "Your profile views increased by 340% this week!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        read: true,
        priority: "low", 
        actionable: false
      },
      {
        id: "8",
        type: "job",
        title: "Application Update",
        description: "Your application for ML Engineer at StartupXYZ has been reviewed",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
        read: false,
        priority: "urgent",
        actionable: true,
        data: { company: "StartupXYZ", status: "reviewed" }
      }
    ]);

    // Mock notification settings
    setSettings({
      connection: { email: true, push: true, inApp: true, digest: 'daily' },
      message: { email: true, push: true, inApp: true, digest: 'daily' },
      job: { email: true, push: true, inApp: true, digest: 'weekly' },
      event: { email: false, push: true, inApp: true, digest: 'daily' },
      achievement: { email: false, push: false, inApp: true, digest: 'weekly' },
      endorsement: { email: true, push: false, inApp: true, digest: 'weekly' },
      system: { email: false, push: false, inApp: true, digest: 'never' }
    });
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'connection': return Users;
      case 'message': return MessageSquare;
      case 'job': return Briefcase;
      case 'event': return Calendar;
      case 'achievement': return Award;
      case 'endorsement': return Star;
      case 'system': return TrendingUp;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50/50';
      case 'high': return 'border-l-orange-500 bg-orange-50/50';
      case 'medium': return 'border-l-blue-500 bg-blue-50/50';
      case 'low': return 'border-l-gray-500 bg-gray-50/50';
      default: return 'border-l-gray-300';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    if (diff < 1000 * 60) return 'Just now';
    if (diff < 1000 * 60 * 60) return `${Math.floor(diff / (1000 * 60))}m ago`;
    if (diff < 1000 * 60 * 60 * 24) return `${Math.floor(diff / (1000 * 60 * 60))}h ago`;
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))}d ago`;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab !== 'all' && notification.type !== activeTab) return false;
    if (filterPriority.length > 0 && !filterPriority.includes(notification.priority)) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="card-professional p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-accent rounded-lg">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Notification Center</h1>
              <p className="text-muted-foreground">Stay updated with your network activities</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <Badge className="bg-accent">
                {unreadCount} unread
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-3">
            <Bell className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-xl font-bold">{notifications.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </Card>
          <Card className="text-center p-3">
            <BellRing className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-xl font-bold">{unreadCount}</div>
            <div className="text-xs text-muted-foreground">Unread</div>
          </Card>
          <Card className="text-center p-3">
            <Zap className="h-6 w-6 text-success mx-auto mb-2" />
            <div className="text-xl font-bold">{notifications.filter(n => n.actionable).length}</div>
            <div className="text-xs text-muted-foreground">Actionable</div>
          </Card>
          <Card className="text-center p-3">
            <Clock className="h-6 w-6 text-premium mx-auto mb-2" />
            <div className="text-xl font-bold">2.3m</div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2">
          <Card className="card-professional">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Notifications</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                  <TabsTrigger value="connection" className="text-xs">Connections</TabsTrigger>
                  <TabsTrigger value="job" className="text-xs">Jobs</TabsTrigger>
                  <TabsTrigger value="message" className="text-xs">Messages</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-2 p-4">
                  {filteredNotifications.map((notification) => {
                    const IconComponent = getNotificationIcon(notification.type);
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 border-l-4 rounded-lg transition-all hover:shadow-sm cursor-pointer ${
                          getPriorityColor(notification.priority)
                        } ${!notification.read ? 'bg-accent/5' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            {notification.avatar ? (
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={notification.avatar} />
                                <AvatarFallback>
                                  {notification.sender?.split(' ').map(n => n[0]).join('') || 'N'}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="p-2 bg-accent/10 rounded-lg">
                                <IconComponent className="h-5 w-5 text-accent" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                    {notification.title}
                                  </h4>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {notification.description}
                                </p>
                                <div className="flex items-center space-x-3 mt-2">
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {notification.type}
                                  </Badge>
                                  {notification.priority === 'urgent' && (
                                    <Badge className="bg-red-500 text-white text-xs">
                                      Urgent
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-1 ml-2">
                                {notification.actionable && (
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-8 w-8 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            {notification.actionable && (
                              <div className="flex items-center space-x-2 mt-3">
                                {notification.type === 'connection' && (
                                  <>
                                    <Button size="sm" className="btn-professional text-xs">
                                      Accept
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-xs">
                                      Decline
                                    </Button>
                                  </>
                                )}
                                {notification.type === 'message' && (
                                  <Button size="sm" className="btn-professional text-xs">
                                    Reply
                                  </Button>
                                )}
                                {notification.type === 'job' && (
                                  <Button size="sm" className="btn-professional text-xs">
                                    View Job
                                  </Button>
                                )}
                                {notification.type === 'event' && (
                                  <Button size="sm" className="btn-professional text-xs">
                                    View Event
                                  </Button>
                                )}
                                {notification.type === 'endorsement' && (
                                  <Button size="sm" className="btn-professional text-xs">
                                    Thank
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-4">
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="text-lg">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings).map(([type, setting]) => (
                <div key={type} className="space-y-3 pb-4 border-b border-border last:border-b-0">
                  <h4 className="font-medium capitalize">{type} Notifications</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email</span>
                      <Switch checked={setting.email} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Push</span>
                      <Switch checked={setting.push} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">In-App</span>
                      <Switch checked={setting.inApp} />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Archive className="h-4 w-4 mr-2" />
                Archive All Read
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BellOff className="h-4 w-4 mr-2" />
                Pause for 1 hour
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Advanced Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;