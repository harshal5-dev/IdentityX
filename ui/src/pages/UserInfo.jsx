import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { apiGet } from "@/lib/api";
import { AppLayout } from "@/layouts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Shield,
  CheckCircle,
  User,
  Loader2,
  AlertCircle,
  Settings,
} from "lucide-react";

const UserInfo = () => {
  const navigate = useNavigate();
  const { user: authUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiGet("/user/me");

        if (response.status === "OK" && response.data) {
          setUser(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        setError(err.errorMessage || "Failed to load user information");
      } finally {
        setLoading(false);
      }
    };

    if (!authUser) {
      navigate("/login");
    } else {
      fetchUserInfo();
    }
  }, [authUser, navigate]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-brand-gradient" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <div>
              <h3 className="font-semibold text-lg">Failed to Load Profile</h3>
              <p className="text-sm text-muted-foreground mt-2">{error}</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) return null;

  return (
    <AppLayout
      title="Profile"
      subtitle="Manage your account"
      showBackButton={true}
      backPath="/dashboard"
    >
      <div className="space-y-6">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar Section */}
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  <Avatar className="h-24 w-24 border-4 border-primary/10 shadow-lg">
                    <AvatarFallback className="bg-brand-gradient text-primary-foreground text-2xl font-bold">
                      {user.firstName?.[0]}
                      {user.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute bottom-0 right-0 p-1.5 bg-green-500 rounded-full border-2 border-background"
                  >
                    <Shield className="w-3 h-3 text-white" />
                  </motion.div>
                </motion.div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                      <h2 className="text-2xl font-bold text-brand-gradient">
                        {user.firstName}{" "}
                        {user.middleName && `${user.middleName} `}
                        {user.lastName}
                      </h2>
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                      <User className="w-4 h-4" />@{user.username}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <Badge variant="outline" className="gap-1.5">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </Badge>
                    <Badge variant="outline" className="gap-1.5">
                      <User className="w-3 h-3" />
                      ID: {user.userId}
                    </Badge>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Button
                      size="sm"
                      className="bg-brand-gradient hover:opacity-90 text-primary-foreground h-8"
                      onClick={() => navigate("/dashboard")}
                    >
                      <Settings className="w-3.5 h-3.5 mr-1.5" />
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => navigate("/settings")}
                    >
                      <Shield className="w-3.5 h-3.5 mr-1.5" />
                      Security
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-brand-gradient rounded-lg">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                Account Details
              </CardTitle>
              <CardDescription>
                Your personal information and account data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    First Name
                  </p>
                  <p className="text-base font-semibold">{user.firstName}</p>
                </motion.div>

                {user.middleName && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Middle Name
                    </p>
                    <p className="text-base font-semibold">{user.middleName}</p>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Last Name
                  </p>
                  <p className="text-base font-semibold">{user.lastName}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Username
                  </p>
                  <p className="text-base font-semibold">@{user.username}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Email Address
                  </p>
                  <p className="text-base font-semibold">{user.email}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    User ID
                  </p>
                  <p className="text-sm font-semibold font-mono">
                    {user.userId}
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default UserInfo;
