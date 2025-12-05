import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { AppLayout } from "@/layouts";
import AddressForm from "@/components/AddressForm";
import AddressList from "@/components/AddressList";
import { Loader2, AlertCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const UserAddresses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "johndoe@example.com",
  };
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API call
    } catch (err) {
      console.error("Failed to fetch addresses:", err);

      // If session expired, clear any stale data and redirect to login
      if (err.message && err.message.includes("Session expired")) {
        localStorage.removeItem("user");
        // Reset auth state
        // Navigate to login
        navigate("/login", { replace: true });
        return;
      }

      setError(err.errorMessage || "Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authUser) {
      navigate("/login", { replace: true });
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
