import { motion } from "framer-motion";

import { CheckCircle } from "lucide-react";

const SuccessAlert = ({ message, title }) => {
  return (
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
            {title}
          </h4>
          <p className="text-sm text-green-600/80 dark:text-green-400/80">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SuccessAlert;
