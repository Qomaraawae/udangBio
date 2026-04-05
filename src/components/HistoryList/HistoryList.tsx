import React from "react";
import type { HistoryItem } from "../../types/udang.types";
import { Calendar, Clock } from "lucide-react";

interface Props {
  history: HistoryItem[];
  onItemClick?: (item: HistoryItem) => void;
}

export const HistoryList: React.FC<Props> = ({ history, onItemClick }) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Belum ada history deteksi</p>
        <p className="text-sm">Lakukan deteksi udang pertama Anda!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemClick?.(item)}
          className="card hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-semibold text-gray-900">
                {item.hasil.nama_umum}
              </h4>
              <p className="text-sm text-gray-500">{item.hasil.nama_ilmiah}</p>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(item.timestamp)}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              Ciri-ciri: {item.ciri.habitat === "laut" ? "Laut" : "Air Tawar"},
              {item.ciri.ukuran_cm} cm, rostrum {item.ciri.rostrum}
            </p>
            <p className="text-xs text-primary-500 mt-1">
              Confidence: {item.hasil.confidence}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
