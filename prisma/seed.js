import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

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
      {
        namaIlmiah: 'Penaeus monodon',
        namaUmum: 'Udang Windu',
        habitat: 'laut',
        warna: 'hijau kehitaman dengan belang',
        ukuranMin: 20,
        ukuranMax: 35,
        rostrum: 'bergerigi',
        deskripsi: 'Udang asli Asia Tenggara, ukuran besar dengan ciri khas belang',
        gambarUrl: 'https://placehold.co/400x300?text=Udang+Windu'
      },
      {
        namaIlmiah: 'Macrobrachium rosenbergii',
        namaUmum: 'Udang Galah',
        habitat: 'air_tawar',
        warna: 'hijau kebiruan',
        ukuranMin: 25,
        ukuranMax: 40,
        rostrum: 'bergerigi',
        deskripsi: 'Udang air tawar terbesar, capit panjang berwarna biru',
        gambarUrl: 'https://placehold.co/400x300?text=Udang+Galah'
      },
      {
        namaIlmiah: 'Pandalus borealis',
        namaUmum: 'Udang Utara',
        habitat: 'laut',
        warna: 'merah muda',
        ukuranMin: 8,
        ukuranMax: 15,
        rostrum: 'bergerigi',
        deskripsi: 'Udang laut dingin, warna merah muda khas',
        gambarUrl: 'https://placehold.co/400x300?text=Udang+Utara'
      },
      {
        namaIlmiah: 'Caridina multidentata',
        namaUmum: 'Udang Amano',
        habitat: 'air_tawar',
        warna: 'transparan dengan titik coklat',
        ukuranMin: 3,
        ukuranMax: 5,
        rostrum: 'bergerigi',
        deskripsi: 'Udang hias populer untuk aquarium, pemakan algae',
        gambarUrl: 'https://placehold.co/400x300?text=Udang+Amano'
      }
    ],
  });

  console.log('✅ Seed data berhasil!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
