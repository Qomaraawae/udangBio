import React from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  message: string;
  onDismiss?: () => void;
}

export const ErrorAlert: React.FC<Props> = ({ message, onDismiss }) => {
  return (
    <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="text-destructive w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-destructive">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-destructive hover:text-destructive/80"
        >
          ×
        </button>
      )}
    </div>
  );
};
