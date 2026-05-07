-- CreateTable
CREATE TABLE "jenis_udang" (
    "id" SERIAL NOT NULL,
    "nama_ilmiah" TEXT NOT NULL,
    "nama_umum" TEXT NOT NULL,
    "habitat" TEXT NOT NULL,
    "warna" TEXT NOT NULL,
    "ukuran_min" INTEGER NOT NULL,
    "ukuran_max" INTEGER NOT NULL,
    "rostrum" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jenis_udang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "habitat" TEXT NOT NULL,
    "warna" TEXT,
    "ukuran_cm" INTEGER NOT NULL,
    "rostrum" TEXT NOT NULL,
    "hasil_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_hasil_id_fkey" FOREIGN KEY ("hasil_id") REFERENCES "jenis_udang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
