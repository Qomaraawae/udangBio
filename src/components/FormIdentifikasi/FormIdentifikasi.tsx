import React, { useState } from "react";
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Habitat *
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="laut"
              checked={formData.habitat === "laut"}
              onChange={(e) =>
                setFormData({ ...formData, habitat: e.target.value as Habitat })
              }
              className="w-4 h-4 text-primary-500"
            />
            <span>🌊 Laut</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="air_tawar"
              checked={formData.habitat === "air_tawar"}
              onChange={(e) =>
                setFormData({ ...formData, habitat: e.target.value as Habitat })
              }
              className="w-4 h-4 text-primary-500"
            />
            <span>💧 Air Tawar</span>
          </label>
        </div>
      </div>

      <div>
        <label
          htmlFor="warna"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Warna
        </label>
        <input
          id="warna"
          type="text"
          value={formData.warna}
          onChange={(e) => setFormData({ ...formData, warna: e.target.value })}
          placeholder="Contoh: merah, putih, hijau, transparan"
          className="input-field"
        />
        <p className="text-xs text-gray-500 mt-1">
          Opsional, tapi membantu akurasi
        </p>
      </div>

      <div>
        <label
          htmlFor="ukuran"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Ukuran (cm) *
        </label>
        <input
          id="ukuran"
          type="range"
          min={0}
          max={50}
          value={formData.ukuran_cm}
          onChange={(e) =>
            setFormData({ ...formData, ukuran_cm: Number(e.target.value) })
          }
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>0 cm</span>
          <span className="font-medium">{formData.ukuran_cm} cm</span>
          <span>50 cm</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bentuk Rostrum *
        </label>
        <select
          value={formData.rostrum}
          onChange={(e) =>
            setFormData({ ...formData, rostrum: e.target.value as Rostrum })
          }
          className="input-field"
        >
          <option value="bergerigi">Bergerigi (Bergigi)</option>
          <option value="halus">Halus (Tidak Bergigi)</option>
          <option value="tidak ada">Tidak Ada Rostrum</option>
        </select>
      </div>

      <button type="submit" disabled={isLoading} className="btn-primary w-full">
        {isLoading ? "⏳ Mendeteksi..." : "🔍 Deteksi Udang"}
      </button>
    </form>
  );
};
