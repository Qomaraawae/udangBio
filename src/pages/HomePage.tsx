import React from "react";
import { FormIdentifikasi } from "../components/FormIdentifikasi/FormIdentifikasi";
import { HasilDeteksi } from "../components/HasilDeteksi/HasilDeteksi";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";
import { ErrorAlert } from "../components/Common/ErrorAlert";
import { useDeteksiUdang } from "../hooks/useDeteksiUdang";
import { Badge } from "@/components/ui/badge";
import type { CiriUdang } from "../types/udang.types";
import { Fish, Microscope, Waves } from "lucide-react";

export const HomePage: React.FC = () => {
  const { deteksi, loading, hasil, error, reset } = useDeteksiUdang();

  const handleDeteksi = async (ciri: CiriUdang) => {
    reset();
    await deteksi(ciri);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Decorative top strip ── */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400" />

      <div className="container mx-auto px-4 py-14">
        <div className="max-w-6xl mx-auto">
          {/* ── Hero Header ── */}
          <div className="text-center mb-14">
            <Badge
              variant="outline"
              className="border-blue-200 bg-blue-50 text-blue-600 px-5 py-1.5 text-xs tracking-widest uppercase mb-6 inline-flex"
            >
              🦐 Sistem Pakar · Rule-Based AI
            </Badge>

            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-2xl bg-blue-200 blur-md scale-110 opacity-50" />
                <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl shadow-blue-200">
                  <Fish className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Identifikasi <span className="text-blue-600">Jenis Udang</span>
            </h1>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed mb-10">
              Masukkan ciri-ciri udang yang Anda temukan, sistem akan
              mencocokkan dengan basis pengetahuan dan menampilkan jenis udang
              beserta tingkat kepercayaannya.
            </p>

            {/* ── Stats row ── */}
            <div className="inline-flex items-center gap-0 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              {[
                { label: "Jenis Udang", value: "5+" },
                { label: "Akurasi Sistem", value: "≥90%" },
                { label: "Deteksi Instan", value: "<1s" },
              ].map((s, i, arr) => (
                <div
                  key={s.label}
                  className={`px-8 py-4 text-center ${
                    i < arr.length - 1 ? "border-r border-gray-100" : ""
                  }`}
                >
                  <p className="text-2xl font-bold text-blue-600">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Divider with label ── */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-medium text-gray-400 tracking-widest uppercase px-2">
              Mulai Identifikasi
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ── Cards Grid ── */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Card */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400" />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-7">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 border border-blue-100">
                    <Waves className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-800 leading-none">
                      Ciri-ciri Udang
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Lengkapi semua parameter di bawah
                    </p>
                  </div>
                </div>
                <FormIdentifikasi
                  onSubmit={handleDeteksi}
                  isLoading={loading}
                />
              </div>
            </div>

            {/* Result Card */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-cyan-400" />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-7">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 border border-blue-100">
                    <Microscope className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-800 leading-none">
                      Hasil Deteksi
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Hasil identifikasi akan tampil di sini
                    </p>
                  </div>
                </div>

                <div className="min-h-[420px] flex flex-col">
                  {loading && <LoadingSpinner />}
                  {error && <ErrorAlert message={error} onDismiss={reset} />}
                  {hasil && <HasilDeteksi hasil={hasil} />}

                  {!loading && !hasil && !error && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-16">
                      {/* Icon with dashed border */}
                      <div className="relative flex items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-gray-200 bg-gray-50">
                        <Fish className="w-8 h-8 text-gray-300" />
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500 font-medium text-sm">
                          Belum ada hasil deteksi
                        </p>
                        <p className="text-gray-400 text-xs mt-1.5 max-w-[200px] mx-auto leading-relaxed">
                          Isi form di sebelah kiri untuk memulai identifikasi
                        </p>
                      </div>
                      {/* Pulse dots */}
                      <div className="flex gap-2 mt-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse"
                            style={{ animationDelay: `${i * 0.3}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
