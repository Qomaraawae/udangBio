import React from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  message: string;
  onDismiss?: () => void;
}

export const ErrorAlert: React.FC<Props> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-red-700">{message}</p>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-red-500 hover:text-red-700">
          ×
        </button>
      )}
    </div>
  );
};
