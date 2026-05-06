import React from "react";
import { HistoryList } from "../components/HistoryList/HistoryList";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";
import { ErrorAlert } from "../components/Common/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHistory } from "../hooks/useHistory";
import { History, Download, RefreshCw, ClipboardList } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const HistoryPage: React.FC = () => {
  const { history, loading, error, refresh } = useHistory();

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

    const tableData = history.map((item, index) => [
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Decorative top strip ── */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400" />

      <div className="container mx-auto px-4 py-14">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* ── Page Header ── */}
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

          {/* ── Divider with label ── */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-medium text-gray-400 tracking-widest uppercase px-2">
              Data Tersimpan
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ── Content Card ── */}
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
                <HistoryList history={history} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
