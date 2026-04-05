import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

// CORS 
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Udang Expert System API',
    status: 'running',
    endpoints: {
      deteksi: 'POST /api/deteksi',
      history: 'GET /api/history',
      jenisUdang: 'GET /api/jenis-udang'
    }
  });
});

// Database mock
let historyId = 1;
const deteksiHistory = [];

const dataUdang = [
  {
    id: 1,
    nama_ilmiah: 'Litopenaeus vannamei',
    nama_umum: 'Udang Vannamei',
    habitat: 'laut',
    warna: 'kebiruan/kehijauan',
    ukuran_min: 12,
    ukuran_max: 23,
    rostrum: 'bergerigi',
    deskripsi: 'Udang introduksi dari Amerika Latin, dominan di tambak Indonesia',
    gambar_url: 'https://images.unsplash.com/photo-1565680018434-b5131a9e99b2?w=400'
  },
  {
    id: 2,
    nama_ilmiah: 'Penaeus monodon',
    nama_umum: 'Udang Windu',
    habitat: 'laut',
    warna: 'hijau kehitaman dengan belang',
    ukuran_min: 20,
    ukuran_max: 35,
    rostrum: 'bergerigi',
    deskripsi: 'Udang asli Asia Tenggara, ukuran besar dengan ciri khas belang',
    gambar_url: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=400'
  },
  {
    id: 3,
    nama_ilmiah: 'Macrobrachium rosenbergii',
    nama_umum: 'Udang Galah',
    habitat: 'air_tawar',
    warna: 'hijau kebiruan',
    ukuran_min: 25,
    ukuran_max: 40,
    rostrum: 'bergerigi',
    deskripsi: 'Udang air tawar terbesar, capit panjang berwarna biru',
    gambar_url: 'https://images.unsplash.com/photo-1551029506-0808e961106a?w=400'
  },
  {
    id: 4,
    nama_ilmiah: 'Pandalus borealis',
    nama_umum: 'Udang Utara',
    habitat: 'laut',
    warna: 'merah muda',
    ukuran_min: 8,
    ukuran_max: 15,
    rostrum: 'bergerigi',
    deskripsi: 'Udang laut dingin, warna merah muda khas',
    gambar_url: 'https://images.unsplash.com/photo-1551029506-0808e961106a?w=400'
  },
  {
    id: 5,
    nama_ilmiah: 'Caridina multidentata',
    nama_umum: 'Udang Amano',
    habitat: 'air_tawar',
    warna: 'transparan dengan titik coklat',
    ukuran_min: 3,
    ukuran_max: 5,
    rostrum: 'bergerigi',
    deskripsi: 'Udang hias populer untuk aquarium, pemakan algae',
    gambar_url: 'https://images.unsplash.com/photo-1551029506-0808e961106a?w=400'
  }
];

function deteksiUdang(ciri) {
  let hasil = null;
  let confidenceTertinggi = 0;

  for (const udang of dataUdang) {
    let skor = 0;
    let totalKriteria = 0;

    if (ciri.habitat === udang.habitat) {
      skor += 30;
      totalKriteria += 30;
    }

    if (ciri.ukuran_cm >= udang.ukuran_min && ciri.ukuran_cm <= udang.ukuran_max) {
      skor += 25;
    } else if (Math.abs(ciri.ukuran_cm - (udang.ukuran_min + udang.ukuran_max)/2) <= 10) {
      skor += 15;
    }
    totalKriteria += 25;

    if (ciri.rostrum === udang.rostrum) {
      skor += 20;
      totalKriteria += 20;
    }

    if (ciri.warna && udang.warna.toLowerCase().includes(ciri.warna.toLowerCase())) {
      skor += 25;
      totalKriteria += 25;
    } else if (ciri.warna) {
      totalKriteria += 25;
    }

    const confidence = totalKriteria > 0 ? (skor / totalKriteria) * 100 : 0;
    
    if (confidence > confidenceTertinggi && confidence >= 50) {
      confidenceTertinggi = confidence;
      hasil = { ...udang, confidence: Math.round(confidence) };
    }
  }

  return hasil;
}

// API Endpoints
app.post('/api/deteksi', (req, res) => {
  const { habitat, warna, ukuran_cm, rostrum } = req.body;
  
  console.log('📥 Deteksi request:', { habitat, warna, ukuran_cm, rostrum });
  
  if (!habitat || !ukuran_cm || !rostrum) {
    return res.status(400).json({
      success: false,
      message: 'Harap isi semua field yang diperlukan'
    });
  }

  const hasil = deteksiUdang({ habitat, warna, ukuran_cm, rostrum });
  
  if (!hasil) {
    return res.status(404).json({
      success: false,
      message: 'Tidak ada jenis udang yang cocok dengan ciri-ciri tersebut'
    });
  }

  const historyItem = {
    id: historyId++,
    timestamp: new Date().toISOString(),
    ciri: { habitat, warna, ukuran_cm, rostrum },
    hasil: hasil
  };
  deteksiHistory.unshift(historyItem);

  console.log('✅ Hasil:', hasil.nama_umum);
  
  res.json({
    success: true,
    data: hasil,
    historyId: historyItem.id
  });
});

app.get('/api/history', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  console.log('📜 History requested');
  res.json({
    success: true,
    data: deteksiHistory.slice(0, limit)
  });
});

app.get('/api/jenis-udang', (req, res) => {
  res.json({
    success: true,
    data: dataUdang
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Udang Expert API running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET    http://localhost:${PORT}/`);
  console.log(`   POST   http://localhost:${PORT}/api/deteksi`);
  console.log(`   GET    http://localhost:${PORT}/api/history`);
  console.log(`   GET    http://localhost:${PORT}/api/jenis-udang\n`);
});