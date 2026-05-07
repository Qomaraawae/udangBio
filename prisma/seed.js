const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.history.deleteMany();
  await prisma.jenisUdang.deleteMany();

  await prisma.jenisUdang.createMany({
    data: [
      {
        namaIlmiah: 'Litopenaeus vannamei',
        namaUmum: 'Udang Vannamei',
        habitat: 'laut',
        warna: 'kebiruan/kehijauan',
        ukuranMin: 12,
        ukuranMax: 23,
        rostrum: 'bergerigi',
        deskripsi: 'Udang introduksi dari Amerika Latin, dominan di tambak Indonesia',
        gambarUrl: 'https://placehold.co/400x300?text=Udang+Vannamei'
      },
      // ... data lainnya
    ],
  });

  console.log('✅ Seed data berhasil!');
}

main().catch(console.error);