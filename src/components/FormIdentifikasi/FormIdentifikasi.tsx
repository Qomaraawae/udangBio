import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CiriUdang, Habitat, Rostrum } from "../../types/udang.types";

interface Props {
  onSubmit: (data: CiriUdang) => Promise<void>;
  isLoading: boolean;
}

export const FormIdentifikasi: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<CiriUdang>({
    habitat: "laut",
    warna: "",
    ukuran_cm: 15,
    rostrum: "bergerigi",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const habitatOptions: { value: Habitat; label: string; emoji: string }[] = [
    { value: "laut", label: "Laut", emoji: "🌊" },
    { value: "air_tawar", label: "Air Tawar", emoji: "💧" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Habitat */}
      <div className="space-y-2">
        <Label className="text-gray-700 font-semibold text-sm">
          Habitat <span className="text-red-500">*</span>
        </Label>
        <div className="flex gap-3">
          {habitatOptions.map((opt) => {
            const isSelected = formData.habitat === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFormData({ ...formData, habitat: opt.value })}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-semibold text-sm transition-all duration-150 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <span className="text-lg">{opt.emoji}</span>
                {opt.label}
                {isSelected && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Warna */}
      <div className="space-y-2">
        <Label htmlFor="warna" className="text-gray-700 font-semibold text-sm">
          Warna
        </Label>
        <Input
          id="warna"
          type="text"
          value={formData.warna}
          onChange={(e) => setFormData({ ...formData, warna: e.target.value })}
          placeholder="Contoh: merah, putih, hijau, transparan, kecoklatan"
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-800 py-3 px-4 text-base"
        />
        <p className="text-xs text-gray-400">
          💡 Opsional, tapi membantu akurasi deteksi
        </p>
      </div>

      {/* Ukuran */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label
            htmlFor="ukuran"
            className="text-gray-700 font-semibold text-sm"
          >
            Ukuran (cm) <span className="text-red-500">*</span>
          </Label>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-0.5 rounded-full">
            {formData.ukuran_cm} cm
          </span>
        </div>
        <Slider
          id="ukuran"
          min={0}
          max={50}
          step={1}
          value={[formData.ukuran_cm]}
          onValueChange={(value) =>
            setFormData({ ...formData, ukuran_cm: value[0] })
          }
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 font-medium">
          <span>0 cm</span>
          <span>25 cm</span>
          <span>50 cm</span>
        </div>
      </div>

      {/* Rostrum */}
      <div className="space-y-2">
        <Label className="text-gray-700 font-semibold text-sm">
          Bentuk Rostrum <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.rostrum}
          onValueChange={(value) =>
            setFormData({ ...formData, rostrum: value as Rostrum })
          }
        >
          <SelectTrigger className="border-gray-200 bg-white text-gray-800 focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-base h-auto">
            <SelectValue placeholder="Pilih bentuk rostrum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bergerigi" className="py-2 text-base">
              Bergerigi (Bergigi)
            </SelectItem>
            <SelectItem value="halus" className="py-2 text-base">
              Halus (Tidak Bergigi)
            </SelectItem>
            <SelectItem value="tidak_ada" className="py-2 text-base">
              Tidak Ada Rostrum
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-base rounded-xl transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            Mendeteksi...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            🔍 Deteksi Udang
          </span>
        )}
      </Button>
    </form>
  );
};
