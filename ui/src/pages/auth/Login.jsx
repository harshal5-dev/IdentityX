import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  User,
  Loader2,
  Shield,
  Lock,
  Fingerprint,
  CheckCircle,
  AlertCircle,
  Home,
} from "lucide-react";
import { useLoginMutation } from "./authApi";
import { setIsAuthenticated } from "./authSlice";

const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Login = () => {
  const navigate = useNavigate();

  const [login, { isLoading, error, reset, isSuccess, isError }] =
    useLoginMutation();
  const { data = {} } = error || {};
  const { errorMessage = "An unexpected error occurred. Please try again." } =
    data;

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }

    if (isError) {
      setTimeout(() => {
        reset();
      }, 5555);
    }
  }, [isSuccess, isError, navigate, reset]);

  const onSubmit = async (data) => {
    await login(data);
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login is not implemented yet. Coming soon!`);
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden bg-muted/30">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 -left-20 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--brand-primary)", opacity: 0.1 }}
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--brand-secondary)", opacity: 0.1 }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <img
                  src="/logo.svg"
                  alt="IdentityX Logo"
                  className="w-14 h-14 drop-shadow-lg"
                />
                <div>
                  <h1 className="text-3xl font-bold text-brand-gradient">
                    IdentityX
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Secure Authentication
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="h-9"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>
          </div>

          <Card className="shadow-2xl bg-glass border-border/50">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="Enter your username"
                              className="pl-10 h-11"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage>
                          {form.formState.errors?.username?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <button
                            type="button"
                            className="text-sm font-medium text-brand-gradient hover:opacity-80 transition-opacity"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              className="pl-10 h-11"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage>
                          {form.formState.errors?.password?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  {/* Success Message */}
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="p-4 bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">
                            Login Successful!
                          </h4>
                          <p className="text-sm text-green-600/80 dark:text-green-400/80">
                            Welcome back! Redirecting...
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {isError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="p-4 bg-linear-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">
                            Login Failed
                          </h4>
                          <p className="text-sm text-red-600/80 dark:text-red-400/80">
                            {errorMessage}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11 bg-brand-gradient hover:opacity-90 text-primary-foreground shadow-md font-medium transition-all"
                    disabled={isLoading || isSuccess}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Welcome back!
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="h-11"
                    onClick={() => handleSocialLogin("Google")}
                    type="button"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11"
                    onClick={() => handleSocialLogin("GitHub")}
                    type="button"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    GitHub
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-brand-gradient font-semibold hover:opacity-80 hover:underline transition-all"
            >
              Sign up
            </button>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image/Illustration */}
      <div className="hidden lg:flex flex-1 bg-brand-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1.5 }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="mb-8 flex items-center justify-center space-x-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl">
                <Shield className="w-10 h-10" />
              </div>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl">
                <Fingerprint className="w-10 h-10" />
              </div>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl">
                <Lock className="w-10 h-10" />
              </div>
            </div>

            <h2 className="text-5xl font-bold mb-6">
              Secure & Reliable
              <br />
              Authentication
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Enterprise-grade security with modern authentication protocols.
              Your data is protected with industry-leading encryption.
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-left border border-white/20">
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-sm text-primary-foreground/70">
                  Uptime Guaranteed
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-left border border-white/20">
                <div className="text-3xl font-bold mb-2">256-bit</div>
                <div className="text-sm text-primary-foreground/70">
                  AES Encryption
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-left border border-white/20">
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-sm text-primary-foreground/70">
                  Active Users
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-left border border-white/20">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm text-primary-foreground/70">
                  Support Available
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
