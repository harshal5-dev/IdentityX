import { useState } from "react";
import { useGetUserInfoQuery } from "../auth/authApi";
import { Button } from "@/components/ui/button";
import { Plus, Workflow } from "lucide-react";
import { AppLayout } from "@/layouts";
import AuthFlowCard from "./AuthFlowCard";

const Dashboard = () => {
  const { data: user } = useGetUserInfoQuery();
  const [authFlows, setAuthFlows] = useState([]);

  const handleCreateAuthFlow = () => {
    console.log("Create authentication flow");
    // TODO: Open create auth flow modal
  };

  return (
    <AppLayout title="IdentityX" subtitle="Authentication Flows">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Authentication Flows
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and manage custom authentication flows for your
              applications
            </p>
          </div>
          <Button onClick={handleCreateAuthFlow} className="gap-2">
            <Plus className="size-4" />
            Create Auth Flow
          </Button>
        </div>

        {/* Empty State or Auth Flows List */}
        {authFlows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="rounded-full bg-primary/10 p-6 mb-6">
              <Workflow className="size-16 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              No Authentication Flows Yet
            </h2>
            <p className="text-muted-foreground text-center max-w-md mb-8">
              Get started by creating your first authentication flow. Define
              custom rules, configure OAuth providers, and manage user access.
            </p>
            <Button onClick={handleCreateAuthFlow} size="lg" className="gap-2">
              <Plus className="size-5" />
              Create Your First Auth Flow
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authFlows.map((flow) => (
              <AuthFlowCard key={flow.id} flow={flow} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
