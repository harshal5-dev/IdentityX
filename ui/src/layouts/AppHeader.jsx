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

          <div className="flex items-center gap-2">
            {user && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/user-info")}
                  className="flex items-center gap-2 h-8 hover:bg-muted/50"
                >
                  <Avatar className="h-6 w-6 border border-border/50">
                    <AvatarFallback className="bg-brand-gradient text-primary-foreground text-[10px] font-bold">
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm">
                    {user?.firstName}
                  </span>
                </Button>
              </motion.div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AppHeader;
