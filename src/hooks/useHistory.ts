import { useState, useEffect } from "react";
import type { HistoryItem } from "../types/udang.types";
import { udangService } from "../services/udangService";

export const useHistory = (limit: number = 20) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await udangService.getHistory(limit);
      setHistory(data);
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal mengambil history";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [limit]);

  const refresh = () => {
    fetchHistory();
  };

  return { history, loading, error, refresh };
};
