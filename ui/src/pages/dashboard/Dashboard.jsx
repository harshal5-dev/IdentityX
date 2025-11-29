import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AppLayout } from "@/layouts";
import EmptyState from "./EmptyState";
import CompanyGrid from "./CompanyGrid";
import ClientManagement from "./ClientManagement";

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCreateCompany = () => {
    // TODO: Open create company modal
    console.log("Create company clicked");
  };

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
  };

  const handleBackToCompanies = () => {
    setSelectedCompany(null);
  };

  return (
    <AppLayout
      title="IdentityX"
      subtitle={selectedCompany ? selectedCompany.name : "Dashboard"}
    >
      <AnimatePresence mode="wait">
        {companies.length === 0 && !selectedCompany ? (
          <EmptyState key="empty" onCreateCompany={handleCreateCompany} />
        ) : selectedCompany ? (
          <ClientManagement
            key="clients"
            company={selectedCompany}
            onBack={handleBackToCompanies}
          />
        ) : (
          <CompanyGrid
            key="companies"
            companies={companies}
            onSelectCompany={handleSelectCompany}
            onCreateCompany={handleCreateCompany}
          />
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

export default Dashboard;
