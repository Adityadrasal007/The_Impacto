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
  const [contacts, setContacts] = useState<Contact[]>([
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
  ]);

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

  const handleContactSelect = (contactId: string) => {
    setSelectedContact(contactId);
    // Clear unread count for the selected contact
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === contactId ? { ...contact, unreadCount: 0 } : contact
      )
    );
  };

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
    <div className="flex h-[600px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Contacts Sidebar */}
      <div className="w-96 border-r border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg text-gray-900">Messages</h2>
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
                onClick={() => handleContactSelect(contact.id)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 mb-1 ${
                  selectedContact === contact.id 
                    ? 'bg-blue-50 border border-blue-200 shadow-sm' 
                    : 'hover:bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                      <AvatarFallback className="bg-blue-600 text-white font-medium">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      contact.status === 'online' ? 'bg-green-500' : 
                      contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-sm text-gray-900 overflow-hidden whitespace-nowrap text-ellipsis flex-1">{contact.name}</h3>
                      {contact.unreadCount > 0 && (
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                          <span className="text-xs text-white font-medium">
                            {contact.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-1 overflow-hidden whitespace-nowrap text-ellipsis">{contact.role} at {contact.company}</p>
                    <p className="text-xs text-gray-600 leading-relaxed break-words">
                      {contact.lastMessage.length > 50 ? `${contact.lastMessage.substring(0, 50)}...` : contact.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarFallback className="bg-blue-600 text-white font-medium">
                      {contacts.find(c => c.id === selectedContact)?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">{contacts.find(c => c.id === selectedContact)?.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Circle className="h-2 w-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-gray-500">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="text-gray-600 hover:text-gray-900">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-600 hover:text-gray-900">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-600 hover:text-gray-900">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.filter(msg => msg.senderId === selectedContact || msg.senderId === 'me').map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-end space-x-2 max-w-[70%]">
                      {msg.senderId !== 'me' && (
                        <Avatar className="h-6 w-6 mb-1">
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {contacts.find(c => c.id === msg.senderId)?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl shadow-sm break-words ${
                          msg.senderId === 'me'
                            ? 'bg-blue-600 text-white rounded-br-md'
                            : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        <p className={`text-xs mt-2 ${
                          msg.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3"
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start a Conversation</h3>
              <p className="text-gray-500">Select a contact to begin messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeChat;