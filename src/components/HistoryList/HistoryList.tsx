import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { HistoryItem } from "../../types/udang.types";
import { Clock } from "lucide-react";

interface Props {
  history: HistoryItem[];
  onItemClick?: (item: HistoryItem) => void;
}

export const HistoryList: React.FC<Props> = ({ history, onItemClick }) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Belum ada history deteksi</p>
        <p className="text-sm">Lakukan deteksi udang pertama Anda!</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">No</TableHead>
            <TableHead>Jenis Udang</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead className="hidden md:table-cell">
              Waktu Deteksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item, index) => (
            <TableRow
              key={item.id}
              onClick={() => onItemClick?.(item)}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{item.hasil.nama_umum}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.hasil.nama_ilmiah}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="gap-1">
                  {item.hasil.confidence}%
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">
                {formatDate(item.timestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
