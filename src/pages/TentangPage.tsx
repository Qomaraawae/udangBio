import React from "react";
import { Badge } from "@/components/ui/badge";
import { Info, Fish, Database, Brain, Code, Layers } from "lucide-react";

const shrimpList = [
  {
    name: "Udang Vannamei",
    latin: "Litopenaeus vannamei",
    tag: "Laut · Budidaya",
    color: "bg-blue-50 border-blue-200",
    dot: "bg-blue-500",
    text: "text-blue-700",
  },
  {
    name: "Udang Windu",
    latin: "Penaeus monodon",
    tag: "Laut · Asia",
    color: "bg-indigo-50 border-indigo-200",
    dot: "bg-indigo-500",
    text: "text-indigo-700",
  },
  {
    name: "Udang Galah",
    latin: "Macrobrachium rosenbergii",
    tag: "Air Tawar · Raksasa",
    color: "bg-cyan-50 border-cyan-200",
    dot: "bg-cyan-500",
    text: "text-cyan-700",
  },
  {
    name: "Udang Utara",
    latin: "Pandalus borealis",
    tag: "Laut · Dingin",
    color: "bg-sky-50 border-sky-200",
    dot: "bg-sky-500",
    text: "text-sky-700",
  },
  {
    name: "Udang Amano",
    latin: "Caridina multidentata",
    tag: "Air Tawar · Hias",
    color: "bg-teal-50 border-teal-200",
    dot: "bg-teal-500",
    text: "text-teal-700",
  },
];

const techStack = [
  "React v19",
  "TypeScript",
  "Tailwind CSS",
  "Shadcn/UI",
  "Vite",
  "Axios",
  "Express",
];

const SectionCard: React.FC<{
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  accentColor: string;
  children: React.ReactNode;
}> = ({ icon, iconBg, title, accentColor, children }) => (
  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    <div className={`h-1 w-full ${accentColor}`} />
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-lg ${iconBg}`}
        >
          {icon}
        </div>
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  </div>
);

export const TentangPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* ── Hero ── */}
          <div className="text-center space-y-4">
            <Badge
              variant="outline"
              className="border-blue-200 bg-blue-50 text-blue-600 px-4 py-1 text-xs tracking-widest uppercase"
            >
              Tentang Aplikasi
            </Badge>

            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-lg shadow-blue-200">
                <Info className="w-8 h-8 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Sistem Pakar{" "}
                <span className="text-blue-600">Identifikasi Udang</span>
              </h1>
              <p className="mt-2 text-gray-500 text-sm max-w-md mx-auto">
                Pendeteksi jenis udang air tawar & laut berbasis rule-based
                expert system
              </p>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* ── Latar Belakang ── */}
          <SectionCard
            icon={<Fish className="w-4 h-4 text-blue-600" />}
            iconBg="bg-blue-50 border border-blue-100"
            title="Latar Belakang"
            accentColor="bg-blue-600"
          >
            <p className="text-gray-500 text-sm leading-relaxed">
              Keanekaragaman jenis udang sangat banyak. Mahasiswa dan dosen
              Biologi masih harus membuka buku referensi untuk mengidentifikasi
              udang yang ditangkap. Aplikasi ini hadir untuk membantu
              identifikasi udang secara lebih mudah dan cepat tanpa perlu
              membuka buku referensi manual.
            </p>
          </SectionCard>

          {/* ── Cara Kerja ── */}
          <SectionCard
            icon={<Brain className="w-4 h-4 text-violet-600" />}
            iconBg="bg-violet-50 border border-violet-100"
            title="Cara Kerja"
            accentColor="bg-violet-500"
          >
            <p className="text-gray-500 text-sm leading-relaxed">
              Sistem menggunakan metode{" "}
              <span className="text-blue-600 font-medium">
                rule-based expert system
              </span>{" "}
              dengan basis pengetahuan yang berisi ciri-ciri khas setiap jenis
              udang — habitat, warna, ukuran, dan bentuk rostrum. Pengguna
              memasukkan ciri-ciri udang yang ditemukan, sistem akan mencocokkan
              dan menampilkan jenis udang beserta{" "}
              <span className="text-blue-600 font-medium">
                confidence score
              </span>
              -nya.
            </p>
          </SectionCard>

          {/* ── Jenis Udang ── */}
          <SectionCard
            icon={<Database className="w-4 h-4 text-cyan-600" />}
            iconBg="bg-cyan-50 border border-cyan-100"
            title="Jenis Udang yang Didukung"
            accentColor="bg-cyan-500"
          >
            <div className="grid gap-2">
              {shrimpList.map((s) => (
                <div
                  key={s.name}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${s.color}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold leading-none ${s.text}`}
                    >
                      {s.name}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5 italic">
                      {s.latin}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-gray-200 text-gray-500 text-xs whitespace-nowrap"
                  >
                    {s.tag}
                  </Badge>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ── Teknologi ── */}
          <SectionCard
            icon={<Code className="w-4 h-4 text-emerald-600" />}
            iconBg="bg-emerald-50 border border-emerald-100"
            title="Teknologi"
            accentColor="bg-emerald-500"
          >
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* ── Footer note ── */}
          <div className="flex items-center gap-2 justify-center text-gray-400 text-xs pb-4">
            <Layers className="w-3 h-3" />
            <span>Dikembangkan sebagai proyek sistem pakar akademik</span>
          </div>
        </div>
      </div>
    </div>
  );
};
