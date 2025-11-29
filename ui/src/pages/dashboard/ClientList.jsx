import { Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ClientList = ({ clients = [], companyName }) => {
  const clientCount = clients.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Active Clients</h3>
        <div className="text-sm text-muted-foreground">
          {clientCount} clients
        </div>
      </div>

      {/* Empty state for clients */}
      {clientCount === 0 && (
        <Card className="border-2 border-dashed">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Code className="w-8 h-8 text-muted-foreground" />
            </div>
            <h4 className="font-semibold mb-2">No clients yet</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first authentication client to get started
            </p>
          </CardContent>
        </Card>
      )}

      {/* TODO: Add client list items when clients exist */}
      {clientCount > 0 && (
        <div className="space-y-3">
          {clients.map((client) => (
            <Card key={client.id} className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm">{client.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {client.authFlow}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {client.status}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientList;
