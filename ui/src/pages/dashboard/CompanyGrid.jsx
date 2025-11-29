import { motion } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import CompanyCard from "./CompanyCard";

const CompanyGrid = ({ companies, onSelectCompany, onCreateCompany }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Companies
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your organizations and their authentication clients
          </p>
        </div>
        <Button
          className="bg-brand-gradient hover:opacity-90 shadow-lg"
          onClick={onCreateCompany}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Company
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search companies..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />
        </div>
        <Button variant="outline" size="sm" className="h-10">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company, index) => (
          <CompanyCard
            key={company.id}
            company={company}
            index={index}
            onSelect={onSelectCompany}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CompanyGrid;
