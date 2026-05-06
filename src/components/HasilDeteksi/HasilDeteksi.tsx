import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { JenisUdang } from "../../types/udang.types";
import { Award, Ruler, MapPin, Palette, Info } from "lucide-react";

interface Props {
  hasil: JenisUdang;
}

export const HasilDeteksi: React.FC<Props> = ({ hasil }) => {
  const getConfidenceVariant = (confidence: number) => {
    if (confidence >= 80) return "default";
    if (confidence >= 60) return "secondary";
    return "destructive";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600";
    if (confidence >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="border-2 border-primary-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary-50 to-white rounded-t-xl">
        <div className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {hasil.nama_umum}
            </CardTitle>
            <p className="text-sm text-gray-500 italic mt-1">
              {hasil.nama_ilmiah}
            </p>
          </div>
          <Badge
            variant={getConfidenceVariant(hasil.confidence)}
            className={`gap-1 px-3 py-1 text-sm font-semibold ${getConfidenceColor(hasil.confidence)}`}
          >
            <Award className="w-4 h-4" />
            {hasil.confidence}% Akurasi
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-5">
        {hasil.gambar_url && (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <img
              src={hasil.gambar_url}
              alt={hasil.nama_umum}
              className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Habitat</p>
              <p className="font-semibold text-gray-800">
                {hasil.habitat === "laut" ? "🌊 Laut" : "💧 Air Tawar"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Ruler className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Ukuran</p>
              <p className="font-semibold text-gray-800">
                {hasil.ukuran_min} - {hasil.ukuran_max} cm
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg col-span-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Palette className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Warna Khas</p>
              <p className="font-semibold text-gray-800">{hasil.warna}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-primary-500" />
            <p className="font-semibold text-gray-700">Deskripsi</p>
          </div>
          <p className="text-gray-600 leading-relaxed">{hasil.deskripsi}</p>
        </div>
      </CardContent>
    </Card>
  );
};
