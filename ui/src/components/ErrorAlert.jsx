import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const ErrorAlert = ({ message, title }) => {
  return (
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
            {title}
          </h4>
          <p className="text-sm text-red-600/80 dark:text-red-400/80">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorAlert;
