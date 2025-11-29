import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building2, Plus } from "lucide-react";

const EmptyState = ({ onCreateCompany }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-20 px-4"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center mb-6 shadow-2xl"
    >
      <Building2 className="w-12 h-12 text-white" />
    </motion.div>
    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
      Welcome to IdentityX
    </h3>
    <p className="text-muted-foreground text-center max-w-md mb-8">
      Get started by creating your first company. Then you can add clients with
      different authentication flows.
    </p>
    <Button
      size="lg"
      className="bg-brand-gradient hover:opacity-90 shadow-brand h-11"
      onClick={onCreateCompany}
    >
      <Plus className="w-5 h-5 mr-2" />
      Create Your First Company
    </Button>
  </motion.div>
);

export default EmptyState;
