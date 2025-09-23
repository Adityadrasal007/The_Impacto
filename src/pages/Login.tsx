import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { 
  GraduationCap, 
  Users, 
  Shield,
  Eye, 
  EyeOff,
  ArrowLeft,
  Mail,
  Lock
} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      await login(email, password, activeRole);
      toast.success("Welcome back! Redirecting...");
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      await login(email, password, activeRole);
      toast.success("Account created successfully! Welcome to AlumniNet!");
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Roles available for both sign-in and sign-up
  const publicRoles = [
    {
      id: "student",
      title: "Student",
      description: "Current students looking to connect",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "alumni",
      title: "Alumni",
      description: "Graduates ready to mentor and network",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    }
  ];

  // All roles including admin (for sign-in only)
  const allRoles = [
    ...publicRoles,
    {
      id: "admin",
      title: "Admin",
      description: "Platform administrators and staff",
      icon: Shield,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.15)_1px,_transparent_0)] bg-[length:20px_20px]" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 hover-glow">
            <img 
              src="/alumni-logo.jpg" 
              alt="AlumniNet Logo" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <h1 className="text-2xl font-bold text-gradient-primary">
            Welcome to AlumniNet
          </h1>
          <p className="text-muted-foreground mt-2">
            Connect with your professional community
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <Label className="text-base font-medium mb-4 block">I am a:</Label>
          <div className={`grid gap-3 ${activeTab === 'login' ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {(activeTab === 'login' ? allRoles : publicRoles).map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`card-professional p-4 text-center transition-all duration-300 ${
                  activeRole === role.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${role.color} p-0.5 mx-auto mb-2`}>
                  <div className="w-full h-full bg-card rounded-lg flex items-center justify-center">
                    <role.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="text-sm font-medium">{role.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <Card className="card-professional">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="login" 
              className="space-y-6"
              onValueChange={(value) => {
                setActiveTab(value);
                // Reset to default role when switching tabs
                // If switching to register and current role is admin, reset to student
                if (value === 'register' && activeRole === 'admin') {
                  setActiveRole('student');
                }
              }}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@university.edu"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <button type="button" className="text-sm text-primary hover:text-primary/80 transition-colors">
                      Forgot password?
                    </button>
                  </div>

                  <Button type="submit" className="btn-professional w-full" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="your.email@university.edu"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      name="graduationYear"
                      type="number"
                      placeholder="2024"
                      min="1950"
                      max="2030"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:text-primary/80">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:text-primary/80">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button type="submit" className="btn-professional w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          Need help? <button className="text-primary hover:text-primary/80 transition-colors">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default Login;