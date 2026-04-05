export type Habitat = "laut" | "air_tawar";
export type Rostrum = "bergerigi" | "halus" | "tidak_ada";

export interface CiriUdang {
  habitat: Habitat;
  warna: string;
  ukuran_cm: number;
  rostrum: Rostrum;
}

export interface JenisUdang {
  id: number;
  nama_ilmiah: string;
  nama_umum: string;
  confidence: number;
  deskripsi: string;
  habitat: Habitat;
  warna: string;
  ukuran_min: number;
  ukuran_max: number;
  rostrum: Rostrum;
  gambar_url?: string;
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  ciri: CiriUdang;
  hasil: JenisUdang;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
