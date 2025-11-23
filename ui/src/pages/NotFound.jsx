import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl mx-4"
      >
        <Card className="bg-glass border-border/50 shadow-2xl">
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
              <div className="w-24 h-24 rounded-full bg-brand-gradient/10 flex items-center justify-center">
                <FileQuestion className="w-12 h-12 text-brand-gradient" />
              </div>
            </motion.div>

            {/* Error Code */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-8xl font-bold text-brand-gradient mb-4"
              >
                404
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold mb-4"
              >
                Page Not Found
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground text-lg max-w-md mx-auto"
              >
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
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
                onClick={() => navigate("/")}
                size="lg"
                className="w-full sm:w-auto bg-brand-gradient hover:opacity-90 text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </motion.div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-8 border-t border-border/50"
            >
              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team or check our{" "}
                <button
                  onClick={() => navigate("/")}
                  className="text-brand-gradient font-medium hover:underline"
                >
                  documentation
                </button>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFound;
