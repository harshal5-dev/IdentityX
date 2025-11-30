import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  ArrowLeft,
  User,
  Settings,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useGetUserInfoQuery } from "../pages/auth/authApi";
import { ThemeToggle } from "@/components/ThemeToggle";

const AppHeader = ({
  title = "IdentityX",
  subtitle = "Dashboard",
  showBackButton = false,
  backPath = "/dashboard",
}) => {
  const navigate = useNavigate();
  const {
    data: user,
    isError,
    error,
  } = useGetUserInfoQuery(undefined, {
    skip: false,
  });

  const handleLogout = async () => {
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-sm border-b border-border/40 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(backPath)}
                className="h-8"
              >
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                Back
              </Button>
            )}
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
              <h1 className="text-lg font-bold text-brand-gradient">{title}</h1>
              <p className="text-[10px] text-muted-foreground leading-none">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user && !isError && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <Avatar className="h-10 w-10 border-2 border-border shadow-lg ring-2 ring-muted transition-all hover:border-primary hover:shadow-brand">
                        <AvatarFallback className="bg-brand-gradient text-white text-sm font-bold">
                          {user?.firstName?.[0]}
                          {user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full badge-success border-2 border-background shadow-sm"></span>
                    </motion.div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-72 p-2 bg-popover/98 backdrop-blur-xl border border-border shadow-2xl rounded-xl"
                >
                  <div className="flex items-center gap-3 px-2 py-3 rounded-lg bg-accent/50 border border-border mb-2">
                    <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                      <AvatarFallback className="bg-brand-gradient text-white text-base font-bold">
                        {user?.firstName?.[0]}
                        {user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 min-w-0">
                      <p className="text-sm font-bold text-brand-gradient truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground/80 mt-0.5">
                        @{user?.username}
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="my-2" />

                  <DropdownMenuItem
                    onClick={() => navigate("/user-info")}
                    className="cursor-pointer rounded-lg py-2.5 px-3 hover:bg-accent focus:bg-accent group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          Account Info
                        </span>
                        <span className="text-xs text-muted-foreground">
                          View your profile
                        </span>
                      </div>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/addresses")}
                    className="cursor-pointer rounded-lg py-2.5 px-3 hover:bg-accent focus:bg-accent group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                        <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          My Addresses
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Manage locations
                        </span>
                      </div>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard")}
                    className="cursor-pointer rounded-lg py-2.5 px-3 hover:bg-accent focus:bg-accent group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors">
                        <Settings className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Dashboard</span>
                        <span className="text-xs text-muted-foreground">
                          Go to main panel
                        </span>
                      </div>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-2" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer rounded-lg py-2.5 px-3 text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
                        <LogOut className="h-4 w-4 text-destructive" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">Log out</span>
                        <span className="text-xs text-muted-foreground">
                          Sign out of account
                        </span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AppHeader;
