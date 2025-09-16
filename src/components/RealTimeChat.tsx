import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Search,
  Users,
  MessageCircle,
  Circle
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  unreadCount: number;
  role: string;
  company: string;
}

const RealTimeChat = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      avatar: "/placeholder-user.jpg",
      status: "online",
      lastMessage: "Great to connect! Let's schedule a call.",
      unreadCount: 2,
      role: "CTO",
      company: "TechCorp"
    },
    {
      id: "2", 
      name: "Michael Rodriguez",
      avatar: "/placeholder-user.jpg",
      status: "away",
      lastMessage: "Thanks for the referral opportunity!",
      unreadCount: 0,
      role: "Senior Dev",
      company: "StartupXYZ"
    },
    {
      id: "3",
      name: "Emily Johnson",
      avatar: "/placeholder-user.jpg", 
      status: "online",
      lastMessage: "The mentorship program sounds interesting",
      unreadCount: 1,
      role: "Product Manager", 
      company: "BigTech"
    }
  ];

  const messages: Message[] = [
    {
      id: "1",
      senderId: "1",
      senderName: "Dr. Sarah Chen",
      content: "Hi! I saw your profile and would love to discuss the AI project opportunities at our company.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: "text"
    },
    {
      id: "2", 
      senderId: "me",
      senderName: "You",
      content: "That sounds amazing! I'd love to learn more about the role and how I can contribute.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: "text"
    },
    {
      id: "3",
      senderId: "1", 
      senderName: "Dr. Sarah Chen",
      content: "Great to connect! Let's schedule a call. Are you available this week?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: "text"
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim() && selectedContact) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", message, "to:", selectedContact);
      setMessage("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[700px] bg-background border border-border rounded-lg overflow-hidden">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-border bg-muted/30">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Messages</h2>
            <Button size="sm" className="bg-accent hover:bg-accent-hover">
              <Users className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedContact === contact.id ? 'bg-accent/10 border border-accent/20' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                      contact.status === 'online' ? 'bg-green-500' : 
                      contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                      {contact.unreadCount > 0 && (
                        <Badge className="bg-accent text-accent-foreground text-xs">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{contact.role} at {contact.company}</p>
                    <p className="text-xs text-muted-foreground truncate mt-1">{contact.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contacts.find(c => c.id === selectedContact)?.avatar} />
                    <AvatarFallback>
                      {contacts.find(c => c.id === selectedContact)?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{contacts.find(c => c.id === selectedContact)?.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Circle className="h-3 w-3 text-green-500 fill-current" />
                      <span className="text-xs text-muted-foreground">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.senderId === 'me'
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs mt-1 opacity-70">{formatTime(msg.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-accent hover:bg-accent-hover">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Start a Conversation</h3>
              <p className="text-muted-foreground">Select a contact to begin messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeChat;