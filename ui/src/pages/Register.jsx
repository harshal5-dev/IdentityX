import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  KeyRound,
  Mail,
  User,
  Loader2,
  Shield,
  Lock,
  UserPlus,
} from "lucide-react";

const registerSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
    confirmPassword: z.string().min(1, {
      message: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    // Simulate API call with correct payload structure (exclude confirmPassword)
    const { confirmPassword, ...payload } = data;
    console.log("Registration payload:", payload);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("/login");
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
            <div className="flex items-center space-x-3 mb-2">
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
          </div>

          <Card className="shadow-2xl bg-glass border-border/50">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold">
                Create account
              </CardTitle>
              <CardDescription>
                Enter your information to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                placeholder="John"
                                className="pl-10 h-11"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                placeholder="Doe"
                                className="pl-10 h-11"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              placeholder="Enter your username"
                              className="pl-10 h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="john.doe@example.com"
                              className="pl-10 h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              className="pl-10 h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              type="password"
                              placeholder="Confirm your password"
                              className="pl-10 h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-11 bg-brand-gradient hover:opacity-90 text-primary-foreground shadow-md font-medium transition-all"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-brand-gradient font-semibold hover:opacity-80 hover:underline transition-all"
            >
              Sign in
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
                <UserPlus className="w-10 h-10" />
              </div>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl">
                <Lock className="w-10 h-10" />
              </div>
            </div>

            <h2 className="text-5xl font-bold mb-6">
              Join IdentityX
              <br />
              Today
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Create your account in seconds and enjoy enterprise-grade security
              with seamless authentication experience.
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-left border border-white/20">
                <div className="text-3xl font-bold mb-2">Free</div>
                <div className="text-sm text-primary-foreground/70">
                  Forever Plan
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-left border border-white/20">
                <div className="text-3xl font-bold mb-2">&lt;1min</div>
                <div className="text-sm text-primary-foreground/70">
                  Quick Setup
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-left border border-white/20">
                <div className="text-3xl font-bold mb-2">SSL</div>
                <div className="text-sm text-primary-foreground/70">
                  Encrypted Data
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-left border border-white/20">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm text-primary-foreground/70">
                  Support Access
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
