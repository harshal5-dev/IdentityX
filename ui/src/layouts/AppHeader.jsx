import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, ArrowLeft } from "lucide-react";

const AppHeader = ({
  title = "IdentityX",
  subtitle = "Dashboard",
  showBackButton = false,
  backPath = "/dashboard",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
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

          <div className="flex items-center gap-4">
            {user && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/user-info")}
                className="flex items-center gap-2.5 bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 px-3 py-1.5 rounded-full border border-purple-200/60 dark:border-purple-800/40 hover:border-purple-300 dark:hover:border-purple-700 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Avatar className="h-8 w-8 ring-2 ring-purple-100 dark:ring-purple-900/50">
                  <AvatarFallback className="bg-linear-to-br from-pink-500 to-purple-600 text-white text-xs font-bold">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-xs font-semibold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {user?.firstName}
                </span>
              </motion.button>
            )}

            <motion.div whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="h-9 w-9 p-0 rounded-full border-destructive/30 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AppHeader;
