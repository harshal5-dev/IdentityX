import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { apiGet } from "@/lib/api";
import { AppLayout } from "@/layouts";
import AddressForm from "@/components/AddressForm";
import AddressList from "@/components/AddressList";
import { Loader2, AlertCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const UserAddresses = () => {
  const navigate = useNavigate();
  const { user: authUser } = useSelector((state) => state.auth);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiGet("/addresses");

      if (response.status === "OK" && response.data) {
        setAddresses(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
      setError(err.errorMessage || "Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    } else {
      fetchAddresses();
    }
  }, [authUser, navigate]);

  const handleAddressAdded = () => {
    // Refresh the address list after adding a new address
    fetchAddresses();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-500" />
          <p className="text-muted-foreground">Loading addresses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <div>
              <h3 className="font-semibold text-lg">
                Failed to Load Addresses
              </h3>
              <p className="text-sm text-muted-foreground mt-2">{error}</p>
            </div>
            <Button onClick={fetchAddresses} variant="outline" className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <AppLayout
      title="My Addresses"
      subtitle="Manage your delivery and billing addresses"
      showBackButton={true}
      backPath="/dashboard"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-5 py-4"
      >
        {/* Stats Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 rounded-xl bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-primary/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {addresses.length === 0
                  ? "No addresses yet"
                  : `${addresses.length} ${
                      addresses.length === 1 ? "Address" : "Addresses"
                    }`}
              </h2>
              <p className="text-xs text-muted-foreground">
                {addresses.filter((a) => a.isPrimary).length > 0
                  ? `${addresses.filter((a) => a.isPrimary).length} primary`
                  : "Add your first address"}
              </p>
            </div>
          </div>
          {addresses.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-700 dark:text-green-400">
                Active
              </span>
            </div>
          )}
        </motion.div>

        {/* Add New Address Form */}
        <AddressForm onAddressAdded={handleAddressAdded} />

        {/* Addresses List */}
        {addresses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-semibold">Saved Addresses</h2>
              {addresses.filter((a) => a.isPrimary).length > 0 && (
                <span className="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 rounded-md border border-yellow-500/20">
                  ⭐ Primary marked
                </span>
              )}
            </div>
            <AddressList addresses={addresses} />
          </motion.div>
        )}
      </motion.div>
    </AppLayout>
  );
};

export default UserAddresses;
