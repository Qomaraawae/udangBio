import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, X, ChevronRight } from "lucide-react";

interface Istilah {
  id: number;
  istilah: string;
  arti: string;
  gambar?: string;
  contoh?: string;
  bagian?: string;
}

const dataIstilah: Istilah[] = [
  {
    id: 1,
    istilah: "Rostrum",
    bagian: "Kepala",
    arti: "Moncong atau tonjolan di bagian kepala udang yang berada di antara mata. Bentuknya bisa bergerigi (bergigi) atau halus. Ini adalah ciri penting untuk mengidentifikasi jenis udang.",
    contoh:
      "Udang Vannamei memiliki rostrum bergerigi dengan 7-10 gigi di bagian atas.",
  },
  {
    id: 2,
    istilah: "Capit",
    bagian: "Kaki Depan",
    arti: "Kaki depan udang yang membesar dan berfungsi untuk menangkap mangsa atau mempertahankan diri. Biasanya lebih besar pada udang jantan dan digunakan untuk menarik perhatian betina.",
    contoh:
      "Udang Galah (Macrobrachium rosenbergii) memiliki capit yang sangat panjang, bisa melebihi panjang tubuhnya.",
  },
  {
    id: 3,
    istilah: "Rostrum Bergerigi",
    bagian: "Kepala",
    arti: "Rostrum yang memiliki gigi atau tonjolan kecil di sepanjang tepi atasnya. Jumlah gigi bervariasi tergantung spesies. Ini ciri khas udang laut seperti Vannamei dan Windu.",
    contoh:
      "Udang Vannamei memiliki 7-10 gigi di atas rostrum, Udang Windu memiliki 6-8 gigi.",
  },
  {
    id: 4,
    istilah: "Rostrum Halus",
    bagian: "Kepala",
    arti: "Rostrum yang tidak memiliki gigi atau tonjolan, tepinya rata dan halus. Lebih umum ditemukan pada udang air tawar.",
    contoh:
      "Beberapa jenis udang hias air tawar seperti Udang Cherry memiliki rostrum yang cenderung halus.",
  },
  {
    id: 5,
    istilah: "Karapas",
    bagian: "Dada",
    arti: "Cangkang keras yang melindungi bagian kepala dan dada udang (cephalothorax). Melindungi organ-organ vital seperti insang, jantung, dan lambung.",
  },
  {
    id: 6,
    istilah: "Abdomen",
    bagian: "Perut",
    arti: "Bagian perut udang yang tersegmentasi (terdiri dari 6 ruas) dan biasanya dimakan sebagai daging udang. Bagian ini fleksibel untuk berenang.",
  },
  {
    id: 7,
    istilah: "Telson",
    bagian: "Ekor",
    arti: "Bagian ekor bagian tengah udang, berbentuk seperti kipas yang digunakan untuk berenang mundur cepat saat terancam bahaya.",
  },
  {
    id: 8,
    istilah: "Uropod",
    bagian: "Ekor",
    arti: "Bagian ekor samping udang yang bersama telson membentuk kipas ekor. Berfungsi untuk berenang dan melompat dengan cepat.",
  },
  {
    id: 9,
    istilah: "Antena",
    bagian: "Kepala",
    arti: "Alat peraba panjang di kepala udang yang berfungsi untuk mendeteksi lingkungan sekitar, mencari makanan, dan berkomunikasi dengan udang lain.",
  },
  {
    id: 10,
    istilah: "Antenula",
    bagian: "Kepala",
    arti: "Antena pendek yang berfungsi sebagai alat penciuman dan keseimbangan udang. Membantu udang mendeteksi bau makanan di air.",
  },
  {
    id: 11,
    istilah: "Pleopoda",
    bagian: "Perut",
    arti: "Kaki-kaki kecil di bagian perut udang yang berfungsi untuk berenang dan pada udang betina berfungsi untuk membawa telur.",
  },
  {
    id: 12,
    istilah: "Pereopoda",
    bagian: "Kaki",
    arti: "Kaki berjalan udang yang terdiri dari 5 pasang. Dua pasang pertama sering membentuk capit pada beberapa spesies.",
  },
  {
    id: 13,
    istilah: "Exoskeleton",
    bagian: "Seluruh Tubuh",
    arti: "Kerangka luar udang yang terbuat dari kitin. Udang akan berganti kulit (molting) secara berkala untuk tumbuh lebih besar.",
  },
  {
    id: 14,
    istilah: "Molting",
    bagian: "Proses",
    arti: "Proses berganti kulit pada udang untuk tumbuh. Udang akan melepaskan kerangka lamanya dan membentuk yang baru. Proses ini membuat udang rentan terhadap predator.",
  },
  {
    id: 15,
    istilah: "Insang",
    bagian: "Dada",
    arti: "Alat pernapasan udang yang berbentuk seperti bulu dan terletak di bawah karapas. Udang mengambil oksigen dari air melalui insang.",
  },
];

interface KamusVisualProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const KamusVisual: React.FC<KamusVisualProps> = ({
  children,
  open,
  onOpenChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIstilah, setSelectedIstilah] = useState<Istilah | null>(null);

  const filteredIstilah = dataIstilah.filter(
    (item) =>
      item.istilah.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.arti.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.bagian &&
        item.bagian.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleClose = () => {
    setSelectedIstilah(null);
    setSearchQuery("");
    onOpenChange?.(false);
  };

  const bagianList = [
    ...new Set(dataIstilah.map((i) => i.bagian).filter(Boolean)),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <BookOpen className="w-4 h-4" />
            Kamus Visual
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Kamus Visual Udang</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Search Bar */}
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari istilah... (contoh: rostrum, capit, karapas)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIstilah(null);
            }}
            className="pl-9"
          />
        </div>

        {/* Kategori Cepat */}
        {!searchQuery && !selectedIstilah && (
          <div className="flex flex-wrap gap-2 mt-3">
            {bagianList.map((bagian) => (
              <button
                key={bagian}
                onClick={() => setSearchQuery(bagian!)}
                className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                {bagian}
              </button>
            ))}
          </div>
        )}

        {/* Hasil Pencarian atau Daftar Istilah */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-3">
          {filteredIstilah.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Tidak ada istilah yang cocok dengan "{searchQuery}"</p>
              <p className="text-sm mt-1">
                Coba kata kunci lain: rostrum, capit, antena
              </p>
            </div>
          ) : selectedIstilah ? (
            // Detail istilah
            <div className="space-y-4">
              <button
                onClick={() => setSelectedIstilah(null)}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                ← Kembali ke daftar
              </button>
              <div className="bg-gradient-to-r from-blue-50 to-white rounded-lg p-5 border border-blue-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-1">
                      {selectedIstilah.istilah}
                    </h3>
                    {selectedIstilah.bagian && (
                      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 mb-3">
                        {selectedIstilah.bagian}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {selectedIstilah.arti}
                </p>
                {selectedIstilah.contoh && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-blue-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      📝 Contoh pada udang:
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedIstilah.contoh}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Daftar istilah
            <div className="grid gap-2">
              {filteredIstilah.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedIstilah(item)}
                  className="text-left p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-gray-800 group-hover:text-blue-700">
                        {item.istilah}
                      </span>
                      {item.bagian && (
                        <span className="ml-2 text-xs text-gray-400">
                          {item.bagian}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {item.arti.substring(0, 100)}...
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t pt-3 mt-3 text-xs text-gray-400 text-center">
          <p>💡 Klik istilah untuk melihat penjelasan lengkap</p>
          <p className="mt-1">
            📖 Total {dataIstilah.length} istilah dalam kamus
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
