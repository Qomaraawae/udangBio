-- CreateTable
CREATE TABLE "JenisUdang" (
    "id" SERIAL NOT NULL,
    "namaIlmiah" TEXT NOT NULL,
    "namaUmum" TEXT NOT NULL,
    "habitat" TEXT NOT NULL,
    "warna" TEXT NOT NULL,
    "ukuranMin" INTEGER NOT NULL,
    "ukuranMax" INTEGER NOT NULL,
    "rostrum" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambarUrl" TEXT,

    CONSTRAINT "JenisUdang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "habitat" TEXT NOT NULL,
    "warna" TEXT,
    "ukuranCm" INTEGER NOT NULL,
    "rostrum" TEXT NOT NULL,
    "hasilId" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_hasilId_fkey" FOREIGN KEY ("hasilId") REFERENCES "JenisUdang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
