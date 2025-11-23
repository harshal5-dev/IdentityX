import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Activity,
  Lock,
  CheckCircle2,
  User as UserIcon,
  ArrowRight,
  Zap,
  Globe,
  Database,
  Cloud,
  TrendingUp,
  LogIn,
  UserPlus,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
  };

  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description:
        "Enterprise-grade security with JWT tokens and refresh token rotation",
      color: "from-blue-500 to-cyan-500",
      stats: "99.9% Uptime",
    },
    {
      icon: Users,
      title: "User Management",
      description:
        "Complete user lifecycle management with role-based access control",
      color: "from-purple-500 to-pink-500",
      stats: "1000+ Users",
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description:
        "Track authentication events and user activities in real-time",
      color: "from-green-500 to-emerald-500",
      stats: "Live Status",
    },
    {
      icon: Lock,
      title: "Data Protection",
      description:
        "End-to-end encryption and compliance with security standards",
      color: "from-orange-500 to-red-500",
      stats: "AES-256",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-sm border-b border-border/40 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img
                  src="/logo.svg"
                  alt="IdentityX Logo"
                  className="w-9 h-9 drop-shadow-md"
                />
              </motion.div>
              <div>
                <h1 className="text-lg font-bold text-brand-gradient">
                  IdentityX
                </h1>
                <p className="text-[10px] text-muted-foreground leading-none">
                  Enterprise Authentication Platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {user ? (
                <Button
                  onClick={() => navigate("/dashboard")}
                  size="sm"
                  className="bg-brand-gradient hover:opacity-90 text-white h-8 text-sm"
                >
                  Dashboard
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/login")}
                    className="h-8 text-sm"
                  >
                    <LogIn className="h-3.5 w-3.5 mr-1.5" />
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate("/register")}
                    className="bg-brand-gradient hover:opacity-90 text-white h-8 text-sm"
                  >
                    <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="relative">
            <Card className="border-0 shadow-2xl bg-brand-gradient text-primary-foreground overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[20px_20px]" />
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl opacity-50" />
              <CardContent className="relative p-6 md:p-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                  <div className="flex-1 space-y-4 max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 mb-4">
                        <Zap className="w-3 h-3 mr-1" />
                        Premium Account
                      </Badge>
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                    >
                      Secure Authentication <br />
                      <span className="text-primary-foreground/90">
                        Made Simple
                      </span>
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-base md:text-lg text-primary-foreground/80"
                    >
                      Enterprise-grade identity management platform with JWT
                      authentication, automatic token refresh, and advanced
                      security features.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
                    >
                      <Button
                        onClick={() =>
                          navigate(user ? "/dashboard" : "/register")
                        }
                        size="lg"
                        className="w-full sm:w-auto bg-white text-brand-gradient hover:bg-white/90 shadow-xl font-semibold px-6"
                      >
                        {user ? "Go to Dashboard" : "Get Started Free"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button
                        onClick={() => navigate(user ? "/user-info" : "/login")}
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto border-2 border-white/50 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm font-semibold px-6"
                      >
                        {user ? "View Profile" : "Sign In"}
                      </Button>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="hidden lg:flex gap-3 shrink-0"
                  >
                    <div className="space-y-3">
                      <div className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-xl flex flex-col items-center justify-center shadow-xl p-3">
                        <Shield className="w-10 h-10 mb-2 text-white" />
                        <span className="text-xs font-bold text-white text-center leading-tight">
                          Secure
                        </span>
                      </div>
                      <div className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-xl flex flex-col items-center justify-center shadow-xl p-3">
                        <Globe className="w-10 h-10 mb-2 text-white" />
                        <span className="text-xs font-bold text-white text-center leading-tight">
                          Global
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 mt-6">
                      <div className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-xl flex flex-col items-center justify-center shadow-xl p-3">
                        <Zap className="w-10 h-10 mb-2 text-white" />
                        <span className="text-xs font-bold text-white text-center leading-tight">
                          Fast
                        </span>
                      </div>
                      <div className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-xl flex flex-col items-center justify-center shadow-xl p-3">
                        <Cloud className="w-10 h-10 mb-2 text-white" />
                        <span className="text-xs font-bold text-white text-center leading-tight">
                          Cloud
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Platform Overview
                </h3>
                <p className="text-muted-foreground">
                  Real-time authentication metrics
                </p>
              </div>
              <Badge variant="outline" className="gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                All systems operational
              </Badge>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="relative overflow-hidden border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl hover:shadow-2xl transition-all duration-300">
                  <div
                    className="absolute top-0 right-0 w-40 h-40 opacity-10 rounded-full -mr-20 -mt-20"
                    style={{
                      background: `linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))`,
                    }}
                  />
                  <CardHeader className="relative pb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-xl"
                      style={{
                        background: `linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))`,
                      }}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <CardDescription className="text-sm mb-4 line-clamp-2">
                      {feature.description}
                    </CardDescription>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800">
                      <Badge className="bg-brand-gradient-r text-primary-foreground border-0">
                        {feature.stats}
                      </Badge>
                      <motion.button
                        whileHover={{ x: 3 }}
                        className="text-sm font-medium text-brand-gradient flex items-center gap-1"
                      >
                        Details
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
