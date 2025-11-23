import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert, Home, ArrowLeft, Lock } from "lucide-react";

const Forbidden = () => {
  const navigate = useNavigate();

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 -left-20 w-72 h-72 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--brand-error)", opacity: 0.1 }}
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--brand-warning)", opacity: 0.1 }}
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl mx-4"
      >
        <Card className="bg-glass border-border/50 shadow-2xl border-l-4 border-l-red-500">
          <CardContent className="p-12 text-center space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img
                src="/logo.svg"
                alt="IdentityX Logo"
                className="w-16 h-16 drop-shadow-lg"
              />
            </div>

            {/* Animated Icon */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="flex justify-center"
            >
              <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center relative">
                <ShieldAlert className="w-12 h-12 text-red-500" />
                <Lock className="w-6 h-6 text-red-500 absolute -bottom-1 -right-1 bg-background rounded-full p-1" />
              </div>
            </motion.div>

            {/* Error Code */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-8xl font-bold mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                403
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold mb-4"
              >
                Access Forbidden
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground text-lg max-w-md mx-auto"
              >
                You don't have permission to access this resource. Please log in
                with an authorized account or contact your administrator.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-border/50 hover:border-brand-primary/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="w-full sm:w-auto bg-brand-gradient hover:opacity-90 text-white"
              >
                <Lock className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-border/50 hover:border-brand-primary/50"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-8 border-t border-border/50"
            >
              <div className="flex items-start space-x-3 text-left max-w-md mx-auto">
                <ShieldAlert className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Security Notice
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This action has been logged for security purposes. Repeated
                    unauthorized access attempts may result in your account
                    being temporarily locked.
                  </p>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Forbidden;
