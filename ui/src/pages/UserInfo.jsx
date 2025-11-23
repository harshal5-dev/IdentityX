import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo, reset } from "@/store/authSlice";
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
  MapPin,
  ArrowRight,
} from "lucide-react";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      dispatch(fetchUserInfo());
    }
  }, [navigate, dispatch]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-brand-gradient" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <div>
              <h3 className="font-semibold text-lg">Failed to Load Profile</h3>
              <p className="text-sm text-muted-foreground mt-2">{message}</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => dispatch(fetchUserInfo())}>
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
      <div className="space-y-4">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border shadow-lg">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                {/* Avatar Section */}
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  <Avatar className="h-20 w-20 border-4 border-primary/10 shadow-lg">
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
                <div className="flex-1 text-center md:text-left space-y-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                      <h2 className="text-xl font-bold text-brand-gradient">
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
            <CardContent className="pt-4">
              <div className="grid gap-3 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">
                    First Name
                  </p>
                  <p className="text-sm font-semibold">{user.firstName}</p>
                </motion.div>

                {user.middleName && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <p className="text-xs font-medium text-muted-foreground mb-0.5">
                      Middle Name
                    </p>
                    <p className="text-sm font-semibold">{user.middleName}</p>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">
                    Last Name
                  </p>
                  <p className="text-sm font-semibold">{user.lastName}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">
                    Username
                  </p>
                  <p className="text-sm font-semibold">@{user.username}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">
                    Email Address
                  </p>
                  <p className="text-sm font-semibold">{user.email}</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-2.5 md:grid-cols-2">
                <Button
                  onClick={() => navigate("/addresses")}
                  variant="outline"
                  className="h-auto p-3 justify-start hover:bg-primary/5 hover:border-primary transition-all"
                >
                  <div className="flex items-center gap-2.5 w-full">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm">My Addresses</p>
                      <p className="text-xs text-muted-foreground">
                        Manage delivery addresses
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-3 justify-start hover:bg-primary/5 hover:border-primary transition-all"
                >
                  <div className="flex items-center gap-2.5 w-full">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Settings className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm">Account Settings</p>
                      <p className="text-xs text-muted-foreground">
                        Update your preferences
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default UserInfo;
