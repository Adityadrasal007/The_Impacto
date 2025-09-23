import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { 
    name: string; 
    email: string; 
    role: string;
    company?: string;
    graduationYear?: number;
    bio?: string;
    skills?: string[];
    linkedin?: string;
    github?: string;
  } | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: Partial<{ 
    name: string; 
    company: string; 
    graduationYear: number; 
    bio: string;
    skills: string[];
    linkedin: string;
    github: string;
  }>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ 
    name: string; 
    email: string; 
    role: string;
    company?: string;
    graduationYear?: number;
    bio?: string;
    skills?: string[];
    linkedin?: string;
    github?: string;
  } | null>(null);

  // Check for existing auth on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('alumni-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
  }, []);

  const login = async (email: string, password: string, role: string) => {
    // Simulated login - in real app, this would call an API
    const emailUsername = email.split('@')[0];
    // Convert email username to a more readable name format
    const readableName = emailUsername
      .split(/[._-]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    
    const userData = {
      name: readableName,
      email,
      role,
      company: '',
      graduationYear: new Date().getFullYear(),
      bio: '',
      skills: [],
      linkedin: '',
      github: ''
    };
    
    setIsAuthenticated(true);
    setUser(userData);
    
    // Save to localStorage
    localStorage.setItem('alumni-auth', JSON.stringify({
      isAuthenticated: true,
      user: userData
    }));
  };

  const updateProfile = (profileData: Partial<{ 
    name: string; 
    company: string; 
    graduationYear: number; 
    bio: string;
    skills: string[];
    linkedin: string;
    github: string;
  }>) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('alumni-auth', JSON.stringify({
        isAuthenticated: true,
        user: updatedUser
      }));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('alumni-auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};