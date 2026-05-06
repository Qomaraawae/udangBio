import React from "react";
import { IdentifikasiWizard } from "../components/IdentifikasiWizard/IDentifikasiWizard";
import { HasilDeteksi } from "../components/HasilDeteksi/HasilDeteksi";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";
import { ErrorAlert } from "../components/Common/ErrorAlert";
import { useDeteksiUdang } from "../hooks/useDeteksiUdang";
import type { CiriUdang } from "../types/udang.types";
import { Fish } from "lucide-react";

export const HomePage: React.FC = () => {
  const { deteksi, loading, hasil, error, reset } = useDeteksiUdang();

  const handleDeteksi = async (ciri: CiriUdang) => {
    reset();
    await deteksi(ciri);
  };

  if (hasil) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={reset}
              className="mb-4 text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              ← Kembali ke form identifikasi
            </button>
            <HasilDeteksi hasil={hasil} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-blue-100 p-4 rounded-full mb-4">
              <Fish className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Identifikasi Jenis Udang
            </h1>
            <p className="text-gray-500 mt-2">
              Jawab pertanyaan berikut untuk mengetahui jenis udang
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            {loading && <LoadingSpinner />}
            {error && <ErrorAlert message={error} onDismiss={reset} />}
            {!loading && !error && (
              <IdentifikasiWizard
                onSubmit={handleDeteksi}
                isLoading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
