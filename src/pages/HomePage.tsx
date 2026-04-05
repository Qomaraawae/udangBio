import React from "react";
import { FormIdentifikasi } from "../components/FormIdentifikasi/FormIdentifikasi";
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Fish className="w-16 h-16 text-primary-500 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Sistem Pakar Identifikasi Udang
          </h1>
          <p className="text-gray-600">
            Masukkan ciri-ciri udang yang Anda temukan untuk mengetahui jenisnya
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">📝 Ciri-ciri Udang</h2>
            <FormIdentifikasi onSubmit={handleDeteksi} isLoading={loading} />
          </div>

          <div>
            {loading && <LoadingSpinner />}
            {error && <ErrorAlert message={error} onDismiss={reset} />}
            {hasil && <HasilDeteksi hasil={hasil} />}
            {!loading && !hasil && !error && (
              <div className="card text-center py-12 text-gray-400">
                <Fish className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Hasil deteksi akan muncul di sini</p>
                <p className="text-sm">Isi form di samping untuk memulai</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
