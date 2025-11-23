import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const alertStyles = {
  success: {
    container:
      "bg-linear-to-r from-green-500/10 to-emerald-500/10 border-green-500/30",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
    textColor: "text-green-600 dark:text-green-400",
    textMuted: "text-green-600/80 dark:text-green-400/80",
    icon: CheckCircle,
  },
  error: {
    container:
      "bg-linear-to-r from-red-500/10 to-rose-500/10 border-red-500/30",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-600 dark:text-red-400",
    textColor: "text-red-600 dark:text-red-400",
    textMuted: "text-red-600/80 dark:text-red-400/80",
    icon: AlertCircle,
  },
  warning: {
    container:
      "bg-linear-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30",
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    textColor: "text-yellow-600 dark:text-yellow-400",
    textMuted: "text-yellow-600/80 dark:text-yellow-400/80",
    icon: AlertTriangle,
  },
  info: {
    container:
      "bg-linear-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    textColor: "text-blue-600 dark:text-blue-400",
    textMuted: "text-blue-600/80 dark:text-blue-400/80",
    icon: Info,
  },
};

/**
 * Enhanced Alert component for displaying messages with error details
 * @param {Object} props
 * @param {string} props.variant - Type of alert: 'success' | 'error' | 'warning' | 'info'
 * @param {string} props.title - Alert title
 * @param {string} props.message - Main message
 * @param {string} [props.errorCode] - Optional error code (hidden from users by default)
 * @param {Object} [props.validationErrors] - Optional validation errors object
 * @param {boolean} [props.showErrorCode] - Whether to show error code to users (default: false)
 */
export const Alert = ({
  variant = "info",
  title,
  message,
  errorCode,
  validationErrors,
  showErrorCode = false,
}) => {
  const style = alertStyles[variant] || alertStyles.info;
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className={`p-4 ${style.container} border rounded-lg`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          <div
            className={`w-8 h-8 rounded-full ${style.iconBg} flex items-center justify-center`}
          >
            <Icon className={`h-5 w-5 ${style.iconColor}`} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`text-sm font-semibold ${style.textColor} mb-1`}>
              {title}
            </h4>
          )}
          {message && (
            <p className={`text-sm ${style.textMuted} break-words`}>
              {message}
            </p>
          )}

          {/* Only show error code if explicitly enabled (for debugging/support) */}
          {showErrorCode && errorCode && (
            <p className="text-xs text-red-500/60 dark:text-red-400/60 font-mono mt-2">
              Error Code: {errorCode}
            </p>
          )}

          {validationErrors && Object.keys(validationErrors).length > 0 && (
            <ul className="mt-2 space-y-1">
              {Object.entries(validationErrors).map(([field, errors]) => (
                <li key={field} className={`text-xs ${style.textMuted}`}>
                  • <span className="font-medium">{field}</span>:{" "}
                  {Array.isArray(errors) ? errors.join(", ") : errors}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Alert;
