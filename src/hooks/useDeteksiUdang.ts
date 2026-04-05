import { useState } from "react";
import type { CiriUdang, JenisUdang } from "../types/udang.types";
import { udangService } from "../services/udangService";

export const useDeteksiUdang = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasil, setHasil] = useState<JenisUdang | null>(null);
  const [error, setError] = useState<string | null>(null);

  const deteksi = async (ciri: CiriUdang) => {
    setLoading(true);
    setError(null);
    setHasil(null);

    try {
      const result = await udangService.deteksi(ciri);
      setHasil(result);
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan saat deteksi";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setHasil(null);
    setError(null);
  };

  return { deteksi, reset, loading, hasil, error };
};
