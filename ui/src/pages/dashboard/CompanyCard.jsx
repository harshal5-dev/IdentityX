import { motion } from "framer-motion";
import { ArrowRight, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CompanyCard = ({ company, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="border border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-brand-gradient flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {company.name.charAt(0)}
              </div>
              <div>
                <CardTitle className="text-base group-hover:text-brand-gradient transition-colors">
                  {company.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {company.clientCount} clients
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Status</span>
              <Badge
                variant="secondary"
                className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
              >
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">{company.createdAt}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full mt-2 group-hover:bg-accent"
              onClick={() => onSelect(company)}
            >
              View Clients
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompanyCard;
