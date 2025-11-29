import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AuthFlowCard = ({ flow, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(flow)}
    >
      <Card className="border border-border hover:border-primary hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden">
        {flow.popular && (
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px]"
            >
              <Sparkles className="w-2.5 h-2.5 mr-1" />
              Popular
            </Badge>
          </div>
        )}
        <CardContent className="p-5">
          <div
            className={`w-12 h-12 rounded-lg bg-${flow.color}-100 dark:bg-${flow.color}-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
          >
            <flow.icon
              className={`w-6 h-6 text-${flow.color}-600 dark:text-${flow.color}-400`}
            />
          </div>
          <h4 className="font-bold text-sm mb-1">{flow.name}</h4>
          <p className="text-xs text-muted-foreground">{flow.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AuthFlowCard;
