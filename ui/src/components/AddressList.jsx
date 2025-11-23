import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Building,
  Map,
  Mail,
  Globe,
  Phone,
  Star,
  MapPinned,
  Home,
  Briefcase,
  Building2,
} from "lucide-react";

const ADDRESS_TYPE_CONFIG = {
  HOME: {
    label: "Home",
    icon: Home,
    color: "bg-green-500/10 text-green-700 border-green-500/20",
  },
  WORK: {
    label: "Work",
    icon: Briefcase,
    color: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  },
  OFFICE: {
    label: "Office",
    icon: Building2,
    color: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  },
  OTHER: {
    label: "Other",
    icon: MapPinned,
    color: "bg-orange-500/10 text-orange-700 border-orange-500/20",
  },
};

const AddressList = ({ addresses }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  if (!addresses || addresses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-2 border-dashed">
          <CardContent className="py-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-muted/50 rounded-full">
                <MapPinned className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">No Addresses Yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add your first address using the form above
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {addresses.map((address, index) => {
        const typeConfig =
          ADDRESS_TYPE_CONFIG[address.type] || ADDRESS_TYPE_CONFIG.OTHER;
        const TypeIcon = typeConfig.icon;

        return (
          <motion.div key={address.id || index} variants={itemVariants}>
            <Card className="border hover:shadow-lg hover:border-primary/30 transition-all duration-300">
              <CardHeader className="pb-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-1">
                    <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-base">
                          {address.street}
                        </CardTitle>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge
                          variant="outline"
                          className={`${typeConfig.color} border font-medium text-xs`}
                        >
                          <TypeIcon className="w-3 h-3 mr-1" />
                          {typeConfig.label}
                        </Badge>
                        {address.isPrimary && (
                          <Badge
                            variant="default"
                            className="bg-linear-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-sm text-xs"
                          >
                            <Star className="w-3 h-3 mr-1 fill-white" />
                            Primary
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {/* City */}
                  <div className="flex items-center gap-2.5 p-2.5 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-1.5 bg-green-500/10 rounded-md">
                      <Building className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">City</p>
                      <p className="text-sm font-medium">{address.city}</p>
                    </div>
                  </div>

                  {/* State */}
                  <div className="flex items-center gap-2.5 p-2.5 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-1.5 bg-purple-500/10 rounded-md">
                      <Map className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">State</p>
                      <p className="text-sm font-medium">{address.state}</p>
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div className="flex items-center gap-2.5 p-2.5 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-1.5 bg-red-500/10 rounded-md">
                      <Mail className="w-3.5 h-3.5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Postal Code
                      </p>
                      <p className="text-sm font-medium">
                        {address.postalCode}
                      </p>
                    </div>
                  </div>

                  {/* Country */}
                  <div className="flex items-center gap-2.5 p-2.5 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-1.5 bg-orange-500/10 rounded-md">
                      <Globe className="w-3.5 h-3.5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Country</p>
                      <p className="text-sm font-medium">{address.country}</p>
                    </div>
                  </div>
                </div>

                {/* Phone Number - Full Width */}
                <div className="flex items-center gap-2.5 p-2.5 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="p-1.5 bg-cyan-500/10 rounded-md">
                    <Phone className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Phone Number
                    </p>
                    <p className="text-sm font-medium">{address.phoneNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default AddressList;
