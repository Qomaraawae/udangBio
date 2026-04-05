import api from "./api";
import type {
  CiriUdang,
  JenisUdang,
  HistoryItem,
  ApiResponse,
} from "../types/udang.types";

export const udangService = {
  async deteksi(ciri: CiriUdang): Promise<JenisUdang> {
    const response = await api.post<ApiResponse<JenisUdang>>("/deteksi", ciri);
    if (!response.data.success) {
      throw new Error(response.data.message || "Gagal mendeteksi udang");
    }
    return response.data.data!;
  },

  async getHistory(limit: number = 20): Promise<HistoryItem[]> {
    const response = await api.get<ApiResponse<HistoryItem[]>>(
      `/history?limit=${limit}`,
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Gagal mengambil history");
    }
    return response.data.data || [];
  },

  async getHistoryDetail(id: number): Promise<HistoryItem> {
    const response = await api.get<ApiResponse<HistoryItem>>(`/history/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "History tidak ditemukan");
    }
    return response.data.data!;
  },

  async getAllJenisUdang(): Promise<JenisUdang[]> {
    const response = await api.get<ApiResponse<JenisUdang[]>>("/jenis-udang");
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Gagal mengambil data jenis udang",
      );
    }
    return response.data.data || [];
  },

  async getJenisUdangById(id: number): Promise<JenisUdang> {
    const response = await api.get<ApiResponse<JenisUdang>>(
      `/jenis-udang/${id}`,
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Jenis udang tidak ditemukan");
    }
    return response.data.data!;
  },
};
