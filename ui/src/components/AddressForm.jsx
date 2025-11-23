import { useState } from "react";
import { motion } from "framer-motion";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Building,
  Map,
  Mail,
  Globe,
  Phone,
  Star,
  Plus,
  Loader2,
  Home,
  Briefcase,
  Building2,
  MapPinned,
  CheckCircle2,
} from "lucide-react";

const ADDRESS_TYPES = [
  {
    value: "HOME",
    label: "Home",
    icon: Home,
    color: "text-green-600 bg-green-500/10",
  },
  {
    value: "WORK",
    label: "Work",
    icon: Briefcase,
    color: "text-blue-600 bg-blue-500/10",
  },
  {
    value: "OFFICE",
    label: "Office",
    icon: Building2,
    color: "text-purple-600 bg-purple-500/10",
  },
  {
    value: "OTHER",
    label: "Other",
    icon: MapPinned,
    color: "text-orange-600 bg-orange-500/10",
  },
];

const AddressForm = ({ onAddressAdded }) => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    isPrimary: false,
    type: "HOME",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await apiPost("/addresses", formData);

      if (response.status === "OK") {
        // Show success message
        setSuccess(true);

        // Reset form
        setFormData({
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          phoneNumber: "",
          isPrimary: false,
          type: "HOME",
        });

        // Notify parent component to refresh the list
        if (onAddressAdded) {
          onAddressAdded();
        }

        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to add address:", err);
      setError(err.errorMessage || "Failed to add address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border shadow-lg">
        <CardHeader className="space-y-1.5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Add New Address</CardTitle>
              <CardDescription className="text-xs">
                Fill in the details to add a new address
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-3">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Address Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-indigo-500" />
                Address Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {ADDRESS_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.type === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, type: type.value }))
                      }
                      className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md scale-105"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1.5">
                        <div className={`p-1.5 rounded-md ${type.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold">
                          {type.label}
                        </span>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1.5 -right-1.5 bg-primary rounded-full p-0.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Street Address */}
            <div className="space-y-1.5">
              <label
                htmlFor="street"
                className="text-xs font-medium flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                Street Address
              </label>
              <Input
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="123 Main Street, Apt 4B"
                required
                className="h-10"
              />
            </div>

            {/* City & State Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="city"
                  className="text-xs font-medium flex items-center gap-1.5"
                >
                  <Building className="w-3.5 h-3.5 text-green-500" />
                  City
                </label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="state"
                  className="text-xs font-medium flex items-center gap-1.5"
                >
                  <Map className="w-3.5 h-3.5 text-purple-500" />
                  State/Province
                </label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="NY"
                  required
                  className="h-10"
                />
              </div>
            </div>

            {/* Postal Code & Country Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="postalCode"
                  className="text-xs font-medium flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-red-500" />
                  Postal Code
                </label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="10001"
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="country"
                  className="text-xs font-medium flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-orange-500" />
                  Country
                </label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="United States"
                  required
                  className="h-10"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label
                htmlFor="phoneNumber"
                className="text-xs font-medium flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-500" />
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                required
                className="h-10"
              />
            </div>

            {/* Primary Address Checkbox */}
            <div className="flex items-center gap-2.5 p-3 bg-muted/30 rounded-lg border">
              <input
                id="isPrimary"
                name="isPrimary"
                type="checkbox"
                checked={formData.isPrimary}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="isPrimary"
                className="text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Star className="w-3.5 h-3.5 text-yellow-500" />
                Set as Primary Address
              </label>
            </div>

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-xs font-semibold text-green-600">
                    Address Added Successfully!
                  </p>
                  <p className="text-xs text-green-600/80">
                    Your new address has been saved.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-xs text-destructive"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-sm font-semibold bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Adding Address...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Add Address
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddressForm;
