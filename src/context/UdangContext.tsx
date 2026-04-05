import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { JenisUdang, HistoryItem } from "../types/udang.types";
import { udangService } from "../services/udangService";

// 1. DEFINE TYPE (bentuk data yang akan disimpan)
interface UdangContextType {
  // State
  history: HistoryItem[];
  semuaUdang: JenisUdang[];
  loadingHistory: boolean;
  loadingUdang: boolean;
  error: string | null;

  // Functions
  refreshHistory: () => Promise<void>;
  refreshSemuaUdang: () => Promise<void>;
  clearError: () => void;
}

// 2. CREATE CONTEXT (dengan nilai default null)
const UdangContext = createContext<UdangContextType | null>(null);

// 3. CREATE PROVIDER COMPONENT (membungkus aplikasi)
interface UdangProviderProps {
  children: ReactNode;
}

export const UdangProvider: React.FC<UdangProviderProps> = ({ children }) => {
  // State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [semuaUdang, setSemuaUdang] = useState<JenisUdang[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingUdang, setLoadingUdang] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Functions
  const refreshHistory = async () => {
    setLoadingHistory(true);
    setError(null);
    try {
      const data = await udangService.getHistory();
      setHistory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengambil history");
    } finally {
      setLoadingHistory(false);
    }
  };

  const refreshSemuaUdang = async () => {
    setLoadingUdang(true);
    setError(null);
    try {
      const data = await udangService.getAllJenisUdang();
      setSemuaUdang(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal mengambil data udang",
      );
    } finally {
      setLoadingUdang(false);
    }
  };

  const clearError = () => setError(null);

  // Load data saat pertama kali mount
  useEffect(() => {
    refreshHistory();
    refreshSemuaUdang();
  }, []);

  // Value yang akan disediakan ke seluruh aplikasi
  const value: UdangContextType = {
    history,
    semuaUdang,
    loadingHistory,
    loadingUdang,
    error,
    refreshHistory,
    refreshSemuaUdang,
    clearError,
  };

  return (
    <UdangContext.Provider value={value}>{children}</UdangContext.Provider>
  );
};

// 4. CREATE CUSTOM HOOK (mudah digunakan di komponen mana pun)
export const useUdangContext = () => {
  const context = useContext(UdangContext);
  if (!context) {
    throw new Error("useUdangContext harus digunakan di dalam UdangProvider");
  }
  return context;
};
