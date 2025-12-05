import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Home, User, Settings, MapPin, ShieldUser } from "lucide-react";
import { useGetUserInfoQuery } from "../pages/auth/authApi";
import { ThemeToggle } from "@/components/ThemeToggle";

const AppHeader = ({
  title = "IdentityX",
  subtitle = "Dashboard",
  showBackButton = false,
  backPath = "/dashboard",
}) => {
  const navigate = useNavigate();
  const { data: user, isError } = useGetUserInfoQuery();

  const handleLogout = async () => {
    navigate("/login");
  };

  return (
    <header className="border-b border-border/40 sticky top-0 z-50 backdrop-blur-md bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="/dashboard"
            className="flex items-center gap-2 font-medium cursor-pointer"
          >
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <ShieldUser className="size-5" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold">{title}</span>
              {subtitle && (
                <p className="text-xs text-muted-foreground leading-none">
                  {subtitle}
                </p>
              )}
            </div>
          </a>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user && !isError && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full p-0"
                  >
                    <Avatar className="h-9 w-9 border-2 border-border">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                        {user?.firstName?.[0]}
                        {user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400 border-2 border-background"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                        {user?.firstName?.[0]}
                        {user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        @{user?.username}
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => navigate("/user-info")}
                    className="cursor-pointer gap-2"
                  >
                    <User className="size-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/addresses")}
                    className="cursor-pointer gap-2"
                  >
                    <MapPin className="size-4" />
                    <span>Addresses</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/settings")}
                    className="cursor-pointer gap-2"
                  >
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                  >
                    <LogOut className="size-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
