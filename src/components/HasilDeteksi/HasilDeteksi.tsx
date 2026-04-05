import React from "react";
import type { JenisUdang } from "../../types/udang.types";
import { Award, Ruler, MapPin, Palette } from "lucide-react";

interface Props {
  hasil: JenisUdang;
}

export const HasilDeteksi: React.FC<Props> = ({ hasil }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600 bg-green-100";
    if (confidence >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-orange-600 bg-orange-100";
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{hasil.nama_umum}</h3>
          <p className="text-gray-500 italic">{hasil.nama_ilmiah}</p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getConfidenceColor(hasil.confidence)}`}
        >
          <Award className="w-4 h-4 inline mr-1" />
          {hasil.confidence}% confidence
        </div>
      </div>

      {hasil.gambar_url && (
        <img
          src={hasil.gambar_url}
          alt={hasil.nama_umum}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            Habitat: {hasil.habitat === "laut" ? "🌊 Laut" : "💧 Air Tawar"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Ruler className="w-4 h-4" />
          <span className="text-sm">
            Ukuran: {hasil.ukuran_min} - {hasil.ukuran_max} cm
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 col-span-2">
          <Palette className="w-4 h-4" />
          <span className="text-sm">Warna khas: {hasil.warna}</span>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-gray-700 leading-relaxed">{hasil.deskripsi}</p>
      </div>
    </div>
  );
};
