import React, { useState } from "react";
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
import { useHistory } from "../hooks/useHistory";
import {
  History,
  Download,
  RefreshCw,
  ClipboardList,
  Award,
  Ruler,
  MapPin,
  Palette,
  Calendar,
  Clock,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { HistoryItem } from "../types/udang.types";

export const HistoryPage: React.FC = () => {
  const { history, loading, error, refresh } = useHistory();
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const exportToPDF = () => {
    if (history.length === 0) {
      alert("Tidak ada data riwayat untuk diexport");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    const formatDateTime = (timestamp: string) =>
      new Date(timestamp).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

    // HEADER
    // Background strip biru
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, pageWidth, 38, "F");

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("LAPORAN RIWAYAT DETEKSI UDANG", pageWidth / 2, 16, {
      align: "center",
    });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 220, 255);
    doc.text(
      `Tanggal: ${new Date().toLocaleDateString("id-ID")}   |   Total: ${history.length} identifikasi`,
      pageWidth / 2,
      27,
      { align: "center" },
    );

    let y = 52;

    // ── LOOP DATA ────────────────────────────────────────
    for (let i = 0; i < history.length; i++) {
      const item = history[i];

      // Estimasi tinggi card
      const descLines = item.hasil.deskripsi
        ? doc.splitTextToSize(item.hasil.deskripsi, contentWidth - 20).length
        : 0;
      const estimatedHeight = 88 + descLines * 5;

      // New page jika tidak cukup
      if (y + estimatedHeight > pageHeight - 25) {
        doc.addPage();
        y = 20;
      }

      // Card background
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, y, contentWidth, estimatedHeight, 3, 3, "FD");

      // Stripe biru kiri
      doc.setFillColor(37, 99, 235);
      doc.rect(margin, y, 4, estimatedHeight, "F");

      let iy = y + 10;

      // Nomor + Nama
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text(`#${i + 1}  ${item.hasil.nama_umum}`, margin + 10, iy);

      // Nama ilmiah
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(120, 120, 120);
      doc.text(item.hasil.nama_ilmiah, margin + 10, iy + 6);

      // Confidence badge (kanan)
      const conf = item.hasil.confidence;
      const badgeColor =
        conf >= 80 ? [22, 163, 74] : conf >= 60 ? [217, 119, 6] : [220, 38, 38];
      doc.setFillColor(badgeColor[0], badgeColor[1], badgeColor[2]);
      doc.roundedRect(pageWidth - margin - 38, y + 7, 38, 10, 2, 2, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text(`${conf}% Confidence`, pageWidth - margin - 19, y + 13.5, {
        align: "center",
      });

      iy += 16;

      // Garis pemisah tipis
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(margin + 10, iy, pageWidth - margin - 5, iy);
      iy += 6;

      // ── DUA KOLOM: Ciri Input | Hasil Deteksi ──
      const col1X = margin + 10;
      const col2X = margin + contentWidth / 2 + 5;

      // Label kolom
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("Ciri-ciri Diinput", col1X, iy);
      doc.text("Hasil Deteksi", col2X, iy);
      iy += 5;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(8);

      const rostrumLabel = (r: string) =>
        r === "bergerigi" ? "Bergerigi" : r === "halus" ? "Halus" : "Tidak Ada";
      const habitatLabel = (h: string) => (h === "laut" ? "Laut" : "Air Tawar");

      // Kolom kiri
      const ciriRows = [
        ["Habitat", habitatLabel(item.ciri.habitat)],
        ["Warna", item.ciri.warna || "-"],
        ["Ukuran", `${item.ciri.ukuran_cm} cm`],
        ["Rostrum", rostrumLabel(item.ciri.rostrum)],
      ];

      // Kolom kanan
      const hasilRows = [
        ["Habitat Asli", habitatLabel(item.hasil.habitat)],
        ["Warna Khas", item.hasil.warna],
        [
          "Ukuran Khas",
          `${item.hasil.ukuran_min} - ${item.hasil.ukuran_max} cm`,
        ],
        ["Rostrum", rostrumLabel(item.hasil.rostrum)],
      ];

      const rowStartY = iy;
      ciriRows.forEach(([label, val], idx) => {
        const rowY = rowStartY + idx * 6;
        doc.setTextColor(120, 120, 120);
        doc.text(`${label}`, col1X, rowY);
        doc.setTextColor(40, 40, 40);
        doc.text(`: ${val}`, col1X + 22, rowY);
      });

      hasilRows.forEach(([label, val], idx) => {
        const rowY = rowStartY + idx * 6;
        doc.setTextColor(120, 120, 120);
        doc.text(`${label}`, col2X, rowY);
        doc.setTextColor(40, 40, 40);
        doc.text(`: ${val}`, col2X + 26, rowY);
      });

      iy = rowStartY + ciriRows.length * 6 + 6;

      // ── Deskripsi ──
      if (item.hasil.deskripsi) {
        doc.setDrawColor(226, 232, 240);
        doc.line(margin + 10, iy, pageWidth - margin - 5, iy);
        iy += 5;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(80, 80, 80);
        doc.text("Deskripsi", col1X, iy);
        iy += 4;

        doc.setFont("helvetica", "normal");
        doc.setTextColor(80, 80, 80);
        const lines = doc.splitTextToSize(
          item.hasil.deskripsi,
          contentWidth - 20,
        );
        lines.forEach((line: string) => {
          doc.text(line, col1X, iy);
          iy += 5;
        });
        iy += 2;
      }

      // ── Waktu ──
      doc.setDrawColor(226, 232, 240);
      doc.line(margin + 10, iy, pageWidth - margin - 5, iy);
      iy += 5;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7.5);
      doc.setTextColor(150, 150, 150);
      doc.text(`Waktu deteksi: ${formatDateTime(item.timestamp)}`, col1X, iy);

      y = y + estimatedHeight + 8;
    }

    // ── FOOTER ──────────────────────────────────────────
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFillColor(248, 250, 252);
      doc.rect(0, pageHeight - 12, pageWidth, 12, "F");
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Halaman ${i} dari ${totalPages}  |  Sistem Pakar Identifikasi Udang`,
        pageWidth / 2,
        pageHeight - 4,
        { align: "center" },
      );
    }

    const fileName = `laporan-deteksi-udang-${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, "-")}.pdf`;
    doc.save(fileName);
  };

  const handleItemClick = (item: HistoryItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const formatDate = (timestamp: string) =>
    new Date(timestamp).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (confidence >= 60)
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400" />

      <div className="container mx-auto px-4 py-14">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Header */}
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

          {/* Divider */}
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
                <HistoryList history={history} onItemClick={handleItemClick} />
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
                <DialogTitle>Detail Identifikasi</DialogTitle>
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

                {/* Ciri-ciri */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-500 rounded-full" />
                    Ciri-ciri yang Diinput
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <MapPin className="w-3 h-3" /> Habitat
                      </div>
                      <p className="font-medium text-gray-800">
                        {selectedItem.ciri.habitat === "laut"
                          ? "Laut"
                          : "Air Tawar"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <Palette className="w-3 h-3" /> Warna
                      </div>
                      <p className="font-medium text-gray-800">
                        {selectedItem.ciri.warna || "-"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <Ruler className="w-3 h-3" /> Ukuran
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
                          "Bergerigi"}
                        {selectedItem.ciri.rostrum === "halus" && "Halus"}
                        {selectedItem.ciri.rostrum === "tidak_ada" &&
                          "Tidak Ada"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Informasi Udang */}
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
                          "Bergerigi"}
                        {selectedItem.hasil.rostrum === "halus" && "Halus"}
                        {selectedItem.hasil.rostrum === "tidak_ada" &&
                          "Tidak Ada"}
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

                {/* Footer */}
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
