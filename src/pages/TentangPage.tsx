import React from "react";
import { Info, Fish, Database, Brain, Code } from "lucide-react";

export const TentangPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Info className="w-16 h-16 text-primary-500 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tentang Aplikasi
          </h1>
          <p className="text-gray-600">
            Sistem Pakar Pendeteksi Jenis Udang Air Tawar / Laut
          </p>
        </div>

        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Fish className="text-primary-500" />
            Latar Belakang
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Keanekaragaman jenis udang sangat banyak. Mahasiswa dan dosen
            Biologi masih harus membuka buku referensi untuk mengidentifikasi
            udang yang ditangkap. Aplikasi ini hadir untuk membantu identifikasi
            udang secara lebih mudah dan cepat.
          </p>
        </div>

        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Brain className="text-primary-500" />
            Cara Kerja
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Sistem menggunakan metode <strong>rule-based expert system </strong>
            dengan basis pengetahuan yang berisi ciri-ciri khas setiap jenis
            udang (habitat, warna, ukuran, bentuk rostrum). Pengguna cukup
            memasukkan ciri-ciri udang yang ditemukan, sistem akan mencocokkan
            dengan basis pengetahuan dan menampilkan jenis udang yang paling
            mungkin beserta tingkat kepercayaan (confidence).
          </p>
        </div>

        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Database className="text-primary-500" />
            Jenis Udang yang Didukung
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <strong>Udang Vannamei</strong> (Litopenaeus vannamei) - Udang
              laut budidaya
            </li>
            <li>
              <strong>Udang Windu</strong> (Penaeus monodon) - Udang laut asli
              Asia
            </li>
            <li>
              <strong>Udang Galah</strong> (Macrobrachium rosenbergii) - Udang
              air tawar raksasa
            </li>
            <li>
              <strong>Udang Utara</strong> (Pandalus borealis) - Udang laut
              dingin
            </li>
            <li>
              <strong>Udang Amano</strong> (Caridina multidentata) - Udang hias
              air tawar
            </li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Code className="text-primary-500" />
            Teknologi
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              React 19
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Vite
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Axios
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Express (Mock API)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
