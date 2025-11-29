import { motion } from "framer-motion";
import { Settings, Key, Shield, Lock, Unlock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthFlowCard from "./AuthFlowCard";
import ClientList from "./ClientList";

const authFlows = [
  {
    id: "oauth2",
    name: "OAuth 2.0",
    description: "Industry standard authorization framework",
    icon: Key,
    color: "blue",
    popular: true,
  },
  {
    id: "saml",
    name: "SAML 2.0",
    description: "Enterprise SSO authentication",
    icon: Shield,
    color: "purple",
    popular: false,
  },
  {
    id: "oidc",
    name: "OpenID Connect",
    description: "Identity layer on OAuth 2.0",
    icon: Unlock,
    color: "indigo",
    popular: true,
  },
  {
    id: "jwt",
    name: "JWT Bearer",
    description: "Token-based authentication",
    icon: Lock,
    color: "green",
    popular: true,
  },
];

const ClientManagement = ({ company, onBack }) => {
  const handleSelectAuthFlow = (flow) => {
    // TODO: Open create client modal with selected auth flow
    console.log("Selected auth flow:", flow);
  };

  const handleSettings = () => {
    // TODO: Open company settings modal
    console.log("Settings clicked");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-gradient flex items-center justify-center text-white font-bold shadow-lg">
              {company?.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{company?.name}</h2>
              <p className="text-sm text-muted-foreground">
                Manage authentication clients
              </p>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleSettings}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Auth Flow Selection */}
      <Card className="border-2 border-dashed border-border bg-accent/50">
        <CardContent className="py-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold mb-2">
              Create New Authentication Client
            </h3>
            <p className="text-sm text-muted-foreground">
              Choose an authentication flow for your new client
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {authFlows.map((flow) => (
              <AuthFlowCard
                key={flow.id}
                flow={flow}
                onSelect={handleSelectAuthFlow}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Existing Clients */}
      <ClientList
        clients={company?.clients || []}
        companyName={company?.name}
      />
    </motion.div>
  );
};

export default ClientManagement;
