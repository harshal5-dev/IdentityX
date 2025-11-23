import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  KeyRound,
  Mail,
  Calendar,
  Shield,
  Clock,
  ArrowLeft,
  Edit,
  CheckCircle2,
  User as UserIcon,
  MapPin,
  Phone,
  Briefcase,
  Link as LinkIcon,
  Activity,
  Globe,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Home,
  User,
} from "lucide-react";

const UserInfo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      // Mock user data - in real app, fetch from API
      setUser({
        ...JSON.parse(userData),
        firstName: "John",
        lastName: "Doe",
        avatar: null,
        role: "Premium User",
        status: "Active",
        joinDate: "January 15, 2024",
        lastLogin: "Today at 10:30 AM",
        sessions: 5,
        tokenExpiry: "24h",
        location: "San Francisco, CA",
        phone: "+1 (555) 123-4567",
        company: "Tech Innovations Inc.",
        website: "johndoe.dev",
        bio: "Passionate developer and tech enthusiast. Building the future of authentication.",
      });
    }
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: user?.email,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: user?.phone,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: user?.location,
      color: "from-orange-500 to-red-500",
    },
    {
      icon: LinkIcon,
      label: "Website",
      value: user?.website,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const accountStats = [
    {
      title: "Active Sessions",
      value: user?.sessions,
      icon: Activity,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Token Expiry",
      value: user?.tokenExpiry,
      icon: Clock,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      title: "Member Since",
      value: "2024",
      icon: Calendar,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "Security Level",
      value: "High",
      icon: Shield,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/home")}
                  className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </motion.div>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src="/logo.svg"
                    alt="IdentityX Logo"
                    className="w-12 h-12 drop-shadow-lg"
                  />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-brand-gradient">
                    Profile
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Manage your account
                  </p>
                </div>
              </div>
            </div>
            <Badge className="hidden md:flex gap-2 bg-brand-gradient-r text-primary-foreground border-0">
              <Award className="w-3 h-3" />
              {user.role}
            </Badge>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Profile Header Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl overflow-hidden">
              {/* Cover Image with Gradient */}
              <div className="relative h-48 bg-brand-gradient overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Badge className="bg-white/20 backdrop-blur-md text-white border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Verified Account
                  </Badge>
                </div>
              </div>

              <CardContent className="relative pt-0 pb-8 px-6 md:px-8">
                <div className="flex flex-col md:flex-row items-start gap-6 -mt-20 relative">
                  {/* Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <Avatar className="h-40 w-40 border-4 border-white dark:border-gray-900 shadow-2xl ring-4 ring-blue-500/20">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-4xl font-bold bg-brand-gradient text-primary-foreground">
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-card"
                      style={{ backgroundColor: "var(--brand-success)" }}
                    />
                  </motion.div>

                  {/* User Info */}
                  <div className="flex-1 md:mt-16 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                            {user.firstName} {user.lastName}
                          </h2>
                          <CheckCircle2
                            className="w-6 h-6"
                            style={{ color: "var(--brand-primary)" }}
                          />
                        </div>
                        <p className="text-lg text-muted-foreground flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </p>
                        {user.bio && (
                          <p className="text-sm text-muted-foreground max-w-2xl mt-3">
                            {user.bio}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            size="lg"
                            className="bg-brand-gradient hover:opacity-90 text-primary-foreground shadow-brand transition-all"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            size="lg"
                            variant="outline"
                            className="shadow-lg"
                          >
                            <Globe className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className="badge-success border-0 px-3 py-1">
                        <div
                          className="w-2 h-2 rounded-full mr-2 animate-pulse"
                          style={{ backgroundColor: "var(--brand-success)" }}
                        />
                        {user.status}
                      </Badge>
                      <Badge className="bg-accent text-accent-foreground border-0 px-3 py-1">
                        <Shield className="w-3 h-3 mr-1" />
                        {user.role}
                      </Badge>
                      <Badge className="bg-secondary text-secondary-foreground border-0 px-3 py-1">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {user.company}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-brand-gradient rounded-xl shadow-lg">
                        <User className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          Contact Information
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Get in touch
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="group relative"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-800/30 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
                        <div
                          className={`p-2.5 bg-gradient-to-br ${contact.color} rounded-lg shadow-md group-hover:scale-110 transition-transform`}
                        >
                          <contact.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {contact.label}
                          </p>
                          <p className="font-medium text-sm mt-0.5 truncate">
                            {contact.value}
                          </p>
                        </div>
                        {contact.icon === LinkIcon && (
                          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Account Statistics */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-brand-gradient rounded-xl shadow-lg">
                        <Activity className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          Account Statistics
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Your account metrics
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {accountStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800/50 dark:to-gray-800/30">
                        <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2.5 bg-gradient-to-br ${stat.color} rounded-lg shadow-md group-hover:scale-110 transition-transform`}
                              >
                                <stat.icon className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                  {stat.label}
                                </p>
                                <p className="font-bold text-lg mt-0.5">
                                  {stat.value}
                                </p>
                              </div>
                            </div>
                            {stat.icon === Award && (
                              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants} className="mt-6">
            <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand-gradient rounded-xl shadow-lg">
                    <Clock className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Recent Activity</CardTitle>
                    <CardDescription>
                      Your latest authentication events
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      action: "Successful login",
                      time: "2 minutes ago",
                      icon: CheckCircle2,
                      color: "from-green-500 to-emerald-600",
                      bgColor: "bg-green-50 dark:bg-green-900/20",
                    },
                    {
                      action: "Password changed",
                      time: "2 days ago",
                      icon: Shield,
                      color: "from-blue-500 to-indigo-600",
                      bgColor: "bg-blue-50 dark:bg-blue-900/20",
                    },
                    {
                      action: "Profile updated",
                      time: "1 week ago",
                      icon: Edit,
                      color: "from-purple-500 to-pink-600",
                      bgColor: "bg-purple-50 dark:bg-purple-900/20",
                    },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, x: 4 }}
                      className="group"
                    >
                      <div
                        className={`flex items-center justify-between p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 ${activity.bgColor}`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2.5 bg-gradient-to-br ${activity.color} rounded-lg shadow-md group-hover:scale-110 transition-transform`}
                          >
                            <activity.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {activity.action}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default UserInfo;
