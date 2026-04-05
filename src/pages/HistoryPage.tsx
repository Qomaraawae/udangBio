import React from "react";
import { HistoryList } from "../components/HistoryList/HistoryList";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";
import { ErrorAlert } from "../components/Common/ErrorAlert";
import { useHistory } from "../hooks/useHistory";
import { History, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const HistoryPage: React.FC = () => {
  const { history, loading, error, refresh } = useHistory();

  // Fungsi export ke PDF
  const exportToPDF = () => {
    if (history.length === 0) {
      alert("Tidak ada data riwayat untuk diexport");
      return;
    }

    // Buat dokumen PDF
    const doc = new jsPDF();

    // Header
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

    // Garis pemisah
    doc.line(14, 35, 200, 35);

    // Tabel data
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
        fillColor: [41, 112, 255],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 248, 255],
      },
      margin: { left: 14, right: 14 },
      // Hapus baris 'fontSize' karena tidak dikenal
    });

    // Simpan PDF
    doc.save(
      `riwayat-deteksi-udang-${new Date().toISOString().slice(0, 19)}.pdf`,
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-primary-500" />
            <h1 className="text-2xl font-bold text-gray-800">
              Riwayat Deteksi
            </h1>
          </div>
          <div className="flex gap-2">
            {/* Tombol Export PDF */}
            <button
              onClick={exportToPDF}
              disabled={history.length === 0}
              className="btn-secondary text-sm flex items-center gap-1"
              title="Export ke PDF"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            {/* Tombol Refresh */}
            <button onClick={refresh} className="btn-secondary text-sm">
              🔄 Refresh
            </button>
          </div>
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorAlert message={error} />}
        {!loading && !error && <HistoryList history={history} />}
      </div>
    </div>
  );
};
