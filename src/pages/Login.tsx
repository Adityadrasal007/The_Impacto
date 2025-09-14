import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState("student");

  const roles = [
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
    },
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
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
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
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 hover-glow">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
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
          <div className="grid grid-cols-3 gap-3">
            {roles.map((role) => (
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
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@university.edu"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
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
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded border-border" />
                    <span>Remember me</span>
                  </label>
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </button>
                </div>

                <Button className="btn-professional w-full">
                  Sign In
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@university.edu"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="pl-10 pr-10"
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
                    type="number"
                    placeholder="2024"
                    min="1950"
                    max="2030"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input type="checkbox" className="rounded border-border mt-1" />
                  <div className="text-sm text-muted-foreground">
                    I agree to the <button className="text-primary hover:text-primary/80">Terms of Service</button> and <button className="text-primary hover:text-primary/80">Privacy Policy</button>
                  </div>
                </div>

                <Button className="btn-professional w-full">
                  Create Account
                </Button>
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