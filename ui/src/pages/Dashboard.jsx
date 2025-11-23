import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AppLayout } from "@/layouts";
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
  Activity,
  Lock,
  CheckCircle2,
  Settings,
  User as UserIcon,
  ArrowRight,
  Zap,
  Clock,
  Bell,
  MapPin,
} from "lucide-react";

const Dashboard = () => {
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

  const stats = [
    {
      title: "Active Sessions",
      value: "1",
      icon: Activity,
      color: "var(--brand-primary)",
      trend: "+0%",
    },
    {
      title: "Security Level",
      value: "High",
      icon: Shield,
      color: "var(--brand-success)",
      trend: "Secure",
    },
    {
      title: "Last Login",
      value: "Just now",
      icon: Clock,
      color: "var(--brand-accent)",
      trend: "Active",
    },
    {
      title: "Notifications",
      value: "0",
      icon: Bell,
      color: "var(--brand-secondary)",
      trend: "Clear",
    },
  ];

  const quickActions = [
    {
      title: "Profile Settings",
      description: "Manage your account details",
      icon: Settings,
      action: () => navigate("/user-info"),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "My Addresses",
      description: "Manage delivery addresses",
      icon: MapPin,
      action: () => navigate("/addresses"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Security",
      description: "Review security settings",
      icon: Shield,
      action: () => {},
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <AppLayout title="IdentityX" subtitle="Dashboard">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="space-y-1">
          <h2 className="text-2xl font-bold">
            Welcome back, {user?.firstName}! 👋
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your account today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <p className="text-xs text-muted-foreground font-medium">
                        {stat.title}
                      </p>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <Badge
                        variant="secondary"
                        className="text-[10px] bg-muted/50 h-5"
                      >
                        {stat.trend}
                      </Badge>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-brand-gradient/10 flex items-center justify-center shrink-0">
                      <stat.icon className="w-5 h-5 text-brand-gradient" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-lg font-bold">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  className="border shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  onClick={action.action}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-linear-to-br ${action.gradient} flex items-center justify-center shrink-0`}
                      >
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm group-hover:text-brand-gradient transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Account Overview */}
        <motion.div variants={itemVariants}>
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-brand-gradient rounded-lg">
                  <UserIcon className="w-4 h-4 text-primary-foreground" />
                </div>
                Account Overview
              </CardTitle>
              <CardDescription>Your account details and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-xs text-muted-foreground font-medium mb-1">
                    Full Name
                  </p>
                  <p className="text-sm font-semibold">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-xs text-muted-foreground font-medium mb-1">
                    Username
                  </p>
                  <p className="text-sm font-semibold">@{user?.username}</p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-xs text-muted-foreground font-medium mb-1">
                    Email
                  </p>
                  <p className="text-sm font-semibold">{user?.email}</p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-xs text-muted-foreground font-medium mb-1">
                    Status
                  </p>
                  <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 h-6">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Button
                  onClick={() => navigate("/user-info")}
                  size="sm"
                  className="bg-brand-gradient hover:opacity-90 text-primary-foreground h-8"
                >
                  <Settings className="w-3.5 h-3.5 mr-1.5" />
                  Manage Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Status */}
        <motion.div variants={itemVariants}>
          <Card className="border shadow-sm border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">
                    Your account is secure
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    All security checks passed. Tokens are auto-refreshed.
                  </p>
                  <div className="flex items-center mt-3 gap-2 flex-wrap">
                    <Badge
                      variant="secondary"
                      className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 h-5 text-[10px]"
                    >
                      <Lock className="w-2.5 h-2.5 mr-1" />
                      2FA Ready
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 h-5 text-[10px]"
                    >
                      <Zap className="w-2.5 h-2.5 mr-1" />
                      Auto-refresh Active
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
};

export default Dashboard;
