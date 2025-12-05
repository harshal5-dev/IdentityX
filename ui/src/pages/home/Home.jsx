import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  ShieldUser,
  ShieldCheck,
  FingerprintPattern,
  ListTodo,
  ArrowRight,
  LogIn,
  UserPlus,
  Zap,
  Lock,
  Globe,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background";
import { ThemeToggle } from "@/components/ThemeToggle";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("isAuthenticated:", isAuthenticated);

  const features = [
    {
      icon: ShieldCheck,
      title: "Secure by Default",
      description: "Enterprise-grade security with JWT authentication",
    },
    {
      icon: FingerprintPattern,
      title: "Custom Auth Flows",
      description:
        "Create and manage authentication flows tailored to your needs",
    },
    {
      icon: ListTodo,
      title: "Easy Integration",
      description: "Seamlessly integrate with your existing applications",
    },
    {
      icon: Lock,
      title: "Data Protection",
      description:
        "Bank-grade encryption and compliance with security standards",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for the best user experience",
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Deploy worldwide with multi-region support",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 sticky top-0 z-50 backdrop-blur-md bg-background/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                <ShieldUser className="size-5" />
              </div>
              <span className="font-bold text-foreground">IdentityX</span>
            </a>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              {isAuthenticated ? (
                <Button
                  onClick={() => navigate("/dashboard")}
                  size="sm"
                  className="gap-2"
                >
                  Dashboard
                  <ArrowRight className="size-4" />
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/login")}
                    className="gap-2"
                  >
                    <LogIn className="size-4" />
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate("/register")}
                    className="gap-2"
                  >
                    <UserPlus className="size-4" />
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <AuroraBackground>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="relative z-20 max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/20 p-4 mb-6 text-primary dark:text-primary-foreground dark:bg-primary/50">
                <ShieldUser className="size-20" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Welcome to{" "}
                <span className="bg-linear-to-r from-primary via-secondary to-primary/80 bg-clip-text text-transparent">
                  IdentityX
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-foreground/80 max-w-2xl mx-auto">
                Build secure authentication flows with enterprise-grade security
                and ease
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  onClick={() =>
                    navigate(isAuthenticated ? "/dashboard" : "/register")
                  }
                  className="gap-2 text-lg px-8"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
                  <ArrowRight className="size-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() =>
                    navigate(isAuthenticated ? "/user-info" : "/login")
                  }
                  className="gap-2 text-lg px-8 text-foreground"
                >
                  {isAuthenticated ? (
                    <>
                      <User className="size-5" /> User Info
                    </>
                  ) : (
                    <>
                      <LogIn className="size-5" /> Sign In
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </AuroraBackground>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Why Choose IdentityX?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for secure authentication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-xl border bg-background hover:shadow-lg transition-all duration-300"
              >
                <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6 p-12 rounded-2xl border bg-linear-to-br from-primary/5 to-primary/10">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to get started?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of developers building secure applications with
                IdentityX
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/register")}
                  className="gap-2 text-lg px-8"
                >
                  <UserPlus className="size-5" />
                  Create Account
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="gap-2 text-lg px-8"
                >
                  <LogIn className="size-5" />
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <ShieldUser className="size-4" />
              </div>
              <span className="font-semibold text-foreground">IdentityX</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 IdentityX. Enterprise Authentication Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
