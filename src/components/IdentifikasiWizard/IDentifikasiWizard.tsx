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
import { KamusVisual } from "../KamusVisual/KamusVisual";
import { BookOpen } from "lucide-react";
import type { CiriUdang, Habitat, Rostrum } from "../../types/udang.types";

interface Props {
  onSubmit: (data: CiriUdang) => Promise<void>;
  isLoading: boolean;
}

type Step = 1 | 2 | 3 | 4;

export const IdentifikasiWizard: React.FC<Props> = ({
  onSubmit,
  isLoading,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isKamusOpen, setIsKamusOpen] = useState(false);
  const [formData, setFormData] = useState<CiriUdang>({
    habitat: "laut",
    warna: "",
    ukuran_cm: 15,
    rostrum: "bergerigi",
  });

  const updateFormData = (key: keyof CiriUdang, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const habitatOptions = [
    {
      value: "laut",
      label: "Laut",
      emoji: "🌊",
      description: "Hidup di air asin, laut, tambak air asin",
    },
    {
      value: "air_tawar",
      label: "Air Tawar",
      emoji: "💧",
      description: "Hidup di sungai, danau, tambak air tawar",
    },
  ];

  const warnaOptions = [
    "Merah",
    "Putih",
    "Hijau",
    "Kecoklatan",
    "Kebiruan",
    "Kuning",
    "Hitam",
    "Transparan",
    "Lainnya",
  ];

  const rostrumOptions = [
    {
      value: "bergerigi",
      label: "🔪 Bergerigi (Bergigi)",
      description: "Moncong bergerigi seperti gergaji - ciri khas udang laut",
    },
    {
      value: "halus",
      label: "✨ Halus (Tidak Bergigi)",
      description: "Moncong halus tanpa gerigi - umum pada udang air tawar",
    },
    {
      value: "tidak_ada",
      label: "❌ Tidak Ada Rostrum",
      description: "Tidak memiliki moncong - sangat jarang",
    },
  ];

  const progressWidth = ((currentStep - 1) / 3) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full" />
          <h2 className="font-semibold text-gray-700">
            Langkah {currentStep} dari 4
          </h2>
        </div>
        <KamusVisual open={isKamusOpen} onOpenChange={setIsKamusOpen} />
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span
            className={currentStep >= 1 ? "text-blue-600 font-semibold" : ""}
          >
            Habitat
          </span>
          <span
            className={currentStep >= 2 ? "text-blue-600 font-semibold" : ""}
          >
            Warna
          </span>
          <span
            className={currentStep >= 3 ? "text-blue-600 font-semibold" : ""}
          >
            Ukuran
          </span>
          <span
            className={currentStep >= 4 ? "text-blue-600 font-semibold" : ""}
          >
            Rostrum
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px] bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                🌍 Di mana udang ini hidup?
              </h2>
              <p className="text-gray-500 mt-2">
                Pilih habitat tempat udang ditemukan
              </p>
              <p className="text-xs text-gray-400 mt-1">
                💡 Tidak yakin? Klik tombol{" "}
                <BookOpen className="w-3 h-3 inline" /> Kamus Visual di pojok
                kanan atas
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {habitatOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateFormData("habitat", opt.value)}
                  className={`p-6 rounded-xl border-2 text-center transition-all ${
                    formData.habitat === opt.value
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <span className="text-4xl block mb-3">{opt.emoji}</span>
                  <span className="font-bold text-lg block">{opt.label}</span>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {opt.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* WARNA */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                🎨 Apa warna udang ini?
              </h2>
              <p className="text-gray-500 mt-2">
                Pilih warna yang paling dominan
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {warnaOptions.map((warna) => (
                <button
                  key={warna}
                  type="button"
                  onClick={() =>
                    updateFormData(
                      "warna",
                      warna === "Lainnya" ? "" : warna.toLowerCase(),
                    )
                  }
                  className={`py-3 px-4 rounded-xl border-2 text-center transition-all ${
                    formData.warna ===
                    (warna === "Lainnya" ? "" : warna.toLowerCase())
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <span className="text-sm font-medium">{warna}</span>
                </button>
              ))}
            </div>
            {formData.warna === "" && (
              <div className="mt-4">
                <Label htmlFor="warna_lain">Atau tulis warna lainnya:</Label>
                <Input
                  id="warna_lain"
                  type="text"
                  placeholder="Contoh: abu-abu kehijauan"
                  className="mt-2"
                  onChange={(e) => updateFormData("warna", e.target.value)}
                />
              </div>
            )}
          </div>
        )}

        {/* UKURAN */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                📏 Berapa ukuran udang ini?
              </h2>
              <p className="text-gray-500 mt-2">
                Perkirakan panjang udang dalam cm
              </p>
            </div>
            <div className="pt-8 px-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Kecil (0-10cm)</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formData.ukuran_cm} cm
                </span>
                <span className="text-sm text-gray-500">Besar (40-50cm)</span>
              </div>
              <Slider
                min={0}
                max={50}
                step={1}
                value={[formData.ukuran_cm]}
                onValueChange={(value) => updateFormData("ukuran_cm", value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
              </div>
            </div>
          </div>
        )}

        {/* ROSTRUM */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                🦐 Bagaimana bentuk rostrumnya?
              </h2>
              <p className="text-gray-500 mt-2">
                Rostrum adalah moncong/tajak di kepala udang
              </p>
              <button
                type="button"
                onClick={() => setIsKamusOpen(true)}
                className="text-xs text-blue-500 hover:underline mt-1"
              >
                ❓ Tidak tahu apa itu rostrum? Lihat di kamus visual
              </button>
            </div>
            <div className="space-y-3 pt-4">
              {rostrumOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateFormData("rostrum", opt.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.rostrum === opt.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <span className="font-semibold">{opt.label}</span>
                  <p className="text-xs text-gray-500 mt-1">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-3">
        <Button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1 || isLoading}
          variant="outline"
          className="px-6"
        >
          ← Kembali
        </Button>

        <Button
          type="button"
          onClick={handleNext}
          disabled={isLoading}
          className="px-8 bg-blue-600 hover:bg-blue-700"
        >
          {currentStep === 4 ? (
            isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Mendeteksi...
              </span>
            ) : (
              "🔍 Lihat Hasil"
            )
          ) : (
            "Selanjutnya →"
          )}
        </Button>
      </div>
    </div>
  );
};
