import React, { useState, useMemo } from "react";
import { HistoryList } from "../components/HistoryList/HistoryList";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";
import { ErrorAlert } from "../components/Common/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHistory } from "../hooks/useHistory";
import {
  History,
  Download,
  RefreshCw,
  ClipboardList,
  X,
  Award,
  Ruler,
  MapPin,
  Palette,
  Calendar,
  Clock,
  ArrowUpDown,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { HistoryItem } from "../types/udang.types";

type SortType = "terbaru" | "terlama" | "tertinggi" | "terendah";

export const HistoryPage: React.FC = () => {
  const { history, loading, error, refresh } = useHistory();
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>("terbaru");

  // Sorting History
  const sortedHistory = useMemo(() => {
    const data = [...history];

    switch (sortBy) {
      case "terbaru":
        return data.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
      case "terlama":
        return data.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        );
      case "tertinggi":
        return data.sort((a, b) => b.hasil.confidence - a.hasil.confidence);
      case "terendah":
        return data.sort((a, b) => a.hasil.confidence - b.hasil.confidence);
      default:
        return data;
    }
  }, [history, sortBy]);

  const exportToPDF = () => {
    if (history.length === 0) {
      alert("Tidak ada data riwayat untuk diexport");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(33, 33, 33);
    doc.text("Riwayat Deteksi Udang", 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Tanggal export: ${new Date().toLocaleDateString("id-ID")}`,
      14,
      30,
    );
    doc.line(14, 35, 200, 35);

    const tableData = sortedHistory.map((item, index) => [
      index + 1,
      item.hasil.nama_umum,
      item.hasil.nama_ilmiah,
      `${item.hasil.confidence}%`,
      new Date(item.timestamp).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    ]);

    autoTable(doc, {
      startY: 40,
      head: [["No", "Nama Umum", "Nama Ilmiah", "Confidence", "Waktu Deteksi"]],
      body: tableData,
      theme: "striped",
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [239, 246, 255] },
      margin: { left: 14, right: 14 },
    });

    doc.save(
      `riwayat-deteksi-udang-${new Date().toISOString().slice(0, 19)}.pdf`,
    );
  };

  const handleItemClick = (item: HistoryItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (confidence >= 60)
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  // Hitung Statistik
  const totalDeteksi = history.length;
  const rataRataConfidence =
    history.length > 0
      ? Math.round(
          history.reduce((sum, item) => sum + item.hasil.confidence, 0) /
            history.length,
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Decorative top strip */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400" />

      <div className="container mx-auto px-4 py-14">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 border border-blue-100">
                  <History className="w-5 h-5 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Riwayat Deteksi
                </h1>
                {history.length > 0 && (
                  <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-600 text-xs px-3 py-1"
                  >
                    {history.length} data
                  </Badge>
                )}
              </div>
              <p className="text-gray-400 text-sm pl-[52px]">
                Rekam jejak identifikasi udang yang telah dilakukan
              </p>
            </div>

            <div className="flex items-center gap-2 pl-[52px] sm:pl-0 sm:pt-1">
              <Button
                onClick={exportToPDF}
                disabled={history.length === 0}
                variant="outline"
                size="sm"
                className="gap-2 border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 disabled:opacity-40 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
              <Button
                onClick={refresh}
                variant="outline"
                size="sm"
                className="gap-2 border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Statistik Cards */}
          {history.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-400">Total Deteksi</p>
                <p className="text-2xl font-bold text-gray-800">
                  {totalDeteksi}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-400">Rata-rata Confidence</p>
                <p className="text-2xl font-bold text-green-600">
                  {rataRataConfidence}%
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-400">Tertinggi</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.max(...history.map((i) => i.hasil.confidence))}%
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-400">Terendah</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.min(...history.map((i) => i.hasil.confidence))}%
                </p>
              </div>
            </div>
          )}

          {/* Sorting Options */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Urutkan:</span>
            </div>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortType)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="terbaru">📅 Terbaru</SelectItem>
                <SelectItem value="terlama">📅 Terlama</SelectItem>
                <SelectItem value="tertinggi">🏆 Akurasi Tertinggi</SelectItem>
                <SelectItem value="terendah">📉 Akurasi Terendah</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Divider with label */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-medium text-gray-400 tracking-widest uppercase px-2">
              Data Tersimpan
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Content Card */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400" />

            <div className="p-8">
              {loading && <LoadingSpinner />}
              {error && <ErrorAlert message={error} />}

              {!loading && !error && history.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-gray-200 bg-gray-50">
                    <ClipboardList className="w-8 h-8 text-gray-300" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 font-medium text-sm">
                      Belum ada riwayat deteksi
                    </p>
                    <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
                      Lakukan identifikasi udang dari halaman utama terlebih
                      dahulu
                    </p>
                  </div>
                </div>
              )}

              {!loading && !error && history.length > 0 && (
                <HistoryList
                  history={sortedHistory}
                  onItemClick={handleItemClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-2xl"></span>
                    Detail Identifikasi
                  </span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Hasil Deteksi */}
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-5 border border-blue-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {selectedItem.hasil.nama_umum}
                      </h3>
                      <p className="text-sm text-gray-500 italic mt-0.5">
                        {selectedItem.hasil.nama_ilmiah}
                      </p>
                    </div>
                    <Badge
                      className={getConfidenceColor(
                        selectedItem.hasil.confidence,
                      )}
                    >
                      <Award className="w-3 h-3 mr-1" />
                      {selectedItem.hasil.confidence}% Confidence
                    </Badge>
                  </div>
                </div>

                {/* Detail Ciri-ciri yang diinput */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-500 rounded-full" />
                    Ciri-ciri yang Diinput
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <MapPin className="w-3 h-3" />
                        Habitat
                      </div>
                      <p className="font-medium text-gray-800">
                        {selectedItem.ciri.habitat === "laut"
                          ? "Laut"
                          : "Air Tawar"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <Palette className="w-3 h-3" />
                        Warna
                      </div>
                      <p className="font-medium text-gray-800">
                        {selectedItem.ciri.warna || "-"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <Ruler className="w-3 h-3" />
                        Ukuran
                      </div>
                      <p className="font-medium text-gray-800">
                        {selectedItem.ciri.ukuran_cm} cm
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        🦐 Rostrum
                      </div>
                      <p className="font-medium text-gray-800">
                        {selectedItem.ciri.rostrum === "bergerigi" &&
                          "🔪 Bergerigi"}
                        {selectedItem.ciri.rostrum === "halus" && "✨ Halus"}
                        {selectedItem.ciri.rostrum === "tidak_ada" &&
                          "❌ Tidak Ada"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detail Udang */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-500 rounded-full" />
                    Informasi Udang
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Habitat Asli</p>
                      <p className="font-medium text-gray-800">
                        {selectedItem.hasil.habitat === "laut"
                          ? "Laut"
                          : "Air Tawar"}
                      </p>
                    </div>
                    <div className="bg-blue-50/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Ukuran Khas</p>
                      <p className="font-medium text-gray-800">
                        {selectedItem.hasil.ukuran_min} -{" "}
                        {selectedItem.hasil.ukuran_max} cm
                      </p>
                    </div>
                    <div className="bg-blue-50/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Warna Khas</p>
                      <p className="font-medium text-gray-800">
                        {selectedItem.hasil.warna}
                      </p>
                    </div>
                    <div className="bg-blue-50/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">
                        Bentuk Rostrum
                      </p>
                      <p className="font-medium text-gray-800">
                        {selectedItem.hasil.rostrum === "bergerigi" &&
                          "🔪 Bergerigi"}
                        {selectedItem.hasil.rostrum === "halus" && "✨ Halus"}
                        {selectedItem.hasil.rostrum === "tidak_ada" &&
                          "❌ Tidak Ada"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Deskripsi */}
                {selectedItem.hasil.deskripsi && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <div className="w-1 h-4 bg-blue-500 rounded-full" />
                      Deskripsi
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedItem.hasil.deskripsi}
                      </p>
                    </div>
                  </div>
                )}

                {/* Waktu Deteksi */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>ID: {selectedItem.id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(selectedItem.timestamp)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
