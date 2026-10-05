export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  origin: string;
  price: number;
  formattedPrice: string;
  matchScore: number;
  size: 'Kecil' | 'Sedang' | 'Besar';
  light: 'Rendah' | 'Sedang' | 'Terang';
  petSafe: boolean;
  careLevel: 'Mudah' | 'Sedang' | 'Tinggi';
  watering: string;
  category: string;
  tags: string[];
  popular: number;
  description: string;
  additionalInfo: {
    potSize: string;
    temperature: string;
    soilType: string;
    fertilizer: string;
    toxicityDetail: string;
  };
  careCard: {
    placement: string;
    wateringSchedule: string;
    mistFrequency: string;
    troubleshooting: string;
  };
  images: string[];
}

export const PLANTS_DATA: Plant[] = [
  {
    id: 'calathea',
    name: 'Calathea',
    scientificName: 'Calathea orbifolia / makoyana',
    origin: 'Hutan Hujan Tropis Amazon, Brazil',
    price: 95000,
    formattedPrice: 'Rp 95.000',
    matchScore: 95,
    size: 'Sedang',
    light: 'Sedang',
    petSafe: true,
    careLevel: 'Sedang',
    watering: '2x/minggu',
    category: 'Tanaman Hias Daun',
    tags: ['Aman untuk hewan', 'Tahan minim cahaya'],
    popular: 98,
    description: 'Calathea terkenal dengan pola daunnya yang memukau seperti lukisan alam. Daunnya bergerak mengikuti siklus cahaya alami siang dan malam (prayer plant). Sangat ramah untuk pemilik anjing dan kucing karena 100% bebas racun.',
    additionalInfo: {
      potSize: 'Diameter 15 - 18 cm',
      temperature: '18°C - 26°C (hindari hembusan AC langsung)',
      soilType: 'Campuran porous: sekam bakar, cocopeat, dan perlit',
      fertilizer: 'Pupuk daun cair 1x per bulan dengan dosis separuh',
      toxicityDetail: '100% Non-toxic dan aman untuk kucing, anjing, dan anak-anak (ASPCA Certified).'
    },
    careCard: {
      placement: 'Sudut ruang tamu atau meja dekat jendela berhordeng tipis.',
      wateringSchedule: 'Siram 2 kali seminggu jika 2 cm permukaan tanah mulai terasa kering.',
      mistFrequency: 'Semprot kabut halus 2-3 hari sekali untuk menjaga kelembapan daun.',
      troubleshooting: 'Ujung daun kecokelatan menandakan udara terlalu kering atau air keran berfluorida tinggi. Gunakan air endapan.'
    },
    images: [
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'pilea',
    name: 'Pilea',
    scientificName: 'Pilea peperomioides',
    origin: 'Provinsi Yunnan, Tiongkok Barat Daya',
    price: 70000,
    formattedPrice: 'Rp 70.000',
    matchScore: 90,
    size: 'Kecil',
    light: 'Sedang',
    petSafe: true,
    careLevel: 'Mudah',
    watering: '1-2x/minggu',
    category: 'Tanaman Meja',
    tags: ['Cocok untuk pemula', 'Aman untuk hewan', 'Mudah dirawat'],
    popular: 92,
    description: 'Dikenal juga sebagai Chinese Money Plant atau Tanaman Koin Hoki. Memiliki daun bulat koin berwarna hijau segar dengan batang ramping. Sangat mudah diperbanyak dan cepat menumbuhkan anakan baru.',
    additionalInfo: {
      potSize: 'Diameter 10 - 14 cm',
      temperature: '15°C - 27°C',
      soilType: 'Tanah gembur dengan drainase cepat',
      fertilizer: 'Pupuk NPK seimbang 2 bulan sekali',
      toxicityDetail: 'Aman dan tidak berbahaya bagi hewan peliharaan.'
    },
    careCard: {
      placement: 'Meja kerja, rak buku, atau pinggir jendela dengan cahaya tidak langsung.',
      wateringSchedule: 'Siram saat tanah hampir mengering sempurna (sekitar 5-7 hari sekali).',
      mistFrequency: 'Cukup seka debu daun dengan kain lembap seminggu sekali.',
      troubleshooting: 'Putar pot 90 derajat tiap minggu agar pertumbuhan daun seimbang menghadap cahaya.'
    },
    images: [
      'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'monstera',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    origin: 'Hutan Tropis Meksiko & Panama',
    price: 120000,
    formattedPrice: 'Rp 120.000',
    matchScore: 88,
    size: 'Besar',
    light: 'Sedang',
    petSafe: false,
    careLevel: 'Mudah',
    watering: '1x/minggu',
    category: 'Tanaman Lantai',
    tags: ['Cocok untuk pemula', 'Mudah dirawat'],
    popular: 99,
    description: 'Ratu tanaman indoor dengan lubang daun ikonik yang dramatis. Memberikan nuansa tropis mewah pada ruang keluarga atau kantor. Tahan banting dan tumbuh subur di iklim hangat.',
    additionalInfo: {
      potSize: 'Diameter 20 - 28 cm',
      temperature: '20°C - 32°C',
      soilType: 'Campuran aroid (turus sabut kelapa + bark + pumice)',
      fertilizer: 'Pupuk slow-release 3 bulan sekali',
      toxicityDetail: 'Mengandung kalsium oksalat. Sebaiknya letakkan jauh dari jangkauan hewan yang suka menggigit daun.'
    },
    careCard: {
      placement: 'Sudut ruang tamu atau samping sofa dengan sirkulasi udara baik.',
      wateringSchedule: 'Siram tuntas seminggu sekali sampai air mengalir dari bawah pot.',
      mistFrequency: 'Bantu semprot turus atau batang rambat saat musim kemarau.',
      troubleshooting: 'Daun baru belum berlubang? Berikan sedikit lebih banyak cahaya difus.'
    },
    images: [
      'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'sansevieria',
    name: 'Sansevieria Trifasciata',
    scientificName: 'Dracaena trifasciata (Lidah Mertua)',
    origin: 'Afrika Barat Tropis',
    price: 55000,
    formattedPrice: 'Rp 55.000',
    matchScore: 85,
    size: 'Sedang',
    light: 'Rendah',
    petSafe: false,
    careLevel: 'Mudah',
    watering: '1x/2 minggu',
    category: 'Tanaman Pemurni Udara',
    tags: ['Cocok untuk pemula', 'Tahan minim cahaya', 'Mudah dirawat'],
    popular: 94,
    description: 'Tanaman paling bandel dan tangguh. Sangat ampuh menyaring polutan udara dan menghasilkan oksigen bahkan di malam hari. Sangat cocok diletakkan di kamar tidur atau ruang minim cahaya matahari.',
    additionalInfo: {
      potSize: 'Diameter 14 - 18 cm',
      temperature: '15°C - 35°C',
      soilType: 'Media tanam kaktus berpasir malang',
      fertilizer: 'Pupuk slow-release 6 bulan sekali',
      toxicityDetail: 'Kurang bersahabat bila tertelan hewan peliharaan, simpan pada dudukan pot tinggi.'
    },
    careCard: {
      placement: 'Bisa di mana saja: kamar tidur, sudut lorong, ataupun kamar mandi berventilasi.',
      wateringSchedule: 'Siram sangat hemat, cukup 1 kali setiap 10-14 hari saat tanah kering total.',
      mistFrequency: 'Tidak memerlukan semprotan kabut.',
      troubleshooting: 'Daun lembek/busuk akibat terlalu banyak disiram. Pastikan wadah tidak menggenang.'
    },
    images: [
      'https://images.unsplash.com/photo-1593482892290-f54927ae1eb6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620127682256-0f5a9e32d525?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant (Zamioculcas)',
    scientificName: 'Zamioculcas zamiifolia',
    origin: 'Afrika Timur',
    price: 85000,
    formattedPrice: 'Rp 85.000',
    matchScore: 82,
    size: 'Sedang',
    light: 'Rendah',
    petSafe: false,
    careLevel: 'Mudah',
    watering: '1x/2 minggu',
    category: 'Tanaman Rendah Perawatan',
    tags: ['Cocok untuk pemula', 'Tahan minim cahaya', 'Mudah dirawat'],
    popular: 91,
    description: 'Daun hijau mengilap seperti dilapisi lilin alami. Memiliki rimpang penyimpan air cadangan di bawah tanah sehingga mampu bertahan hidup meski lupa disiram berminggu-minggu.',
    additionalInfo: {
      potSize: 'Diameter 16 - 20 cm',
      temperature: '18°C - 30°C',
      soilType: 'Media tanam perlit + pasir porous',
      fertilizer: 'Cair 3 bulan sekali',
      toxicityDetail: 'Mengandung oksalat ringan, aman jika hanya disentuh daunnya.'
    },
    careCard: {
      placement: 'Ruang kerja tanpa jendela, koridor hotel/apartemen, atau meja resepsionis.',
      wateringSchedule: 'Siram tiap 2-3 minggu sekali.',
      mistFrequency: 'Lap daun agar kilau alami tetap berkilau.',
      troubleshooting: 'Lebih tahan kekurangan air daripada kelebihan air. Biarkan tanah benar-benar kering.'
    },
    images: [
      'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'peperomia-watermelon',
    name: 'Peperomia Watermelon',
    scientificName: 'Peperomia argyreia',
    origin: 'Amerika Selatan Bagian Utara',
    price: 65000,
    formattedPrice: 'Rp 65.000',
    matchScore: 94,
    size: 'Kecil',
    light: 'Sedang',
    petSafe: true,
    careLevel: 'Mudah',
    watering: '1-2x/minggu',
    category: 'Tanaman Meja',
    tags: ['Aman untuk hewan', 'Cocok untuk pemula'],
    popular: 89,
    description: 'Daun tebal dengan garis perak dan hijau menyerupai kulit buah semangka yang menggemaskan. Bentuknya kompak dan sangat cocok untuk menghias meja kantor atau rak mini.',
    additionalInfo: {
      potSize: 'Diameter 10 - 12 cm',
      temperature: '18°C - 25°C',
      soilType: 'Campuran potting mix gembur',
      fertilizer: 'Pupuk daun ringan sebulan sekali',
      toxicityDetail: '100% aman untuk hewan peliharaan (Pet Friendly).'
    },
    careCard: {
      placement: 'Meja kerja dengan lampu meja terang atau jendela timur.',
      wateringSchedule: 'Siram saat setengah bagian atas media tanam kering.',
      mistFrequency: 'Bisa sesekali disemprot kabut saat siang hari.',
      troubleshooting: 'Batang terkulai lemas biasanya tanda butuh sedikit air.'
    },
    images: [
      'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'boston-fern',
    name: 'Boston Fern (Pakis Pedang)',
    scientificName: 'Nephrolepis exaltata',
    origin: 'Wilayah Tropis Seluruh Dunia',
    price: 50000,
    formattedPrice: 'Rp 50.000',
    matchScore: 91,
    size: 'Sedang',
    light: 'Sedang',
    petSafe: true,
    careLevel: 'Sedang',
    watering: '3x/minggu',
    category: 'Tanaman Gantung',
    tags: ['Aman untuk hewan'],
    popular: 84,
    description: 'Rumpun pakis hijau lebat yang menjuntai indah. Mampu meningkatkan kelembapan udara secara alami dan menetralisir racun xilena. Pilihan tepat untuk pot gantung di teras atau kamar mandi.',
    additionalInfo: {
      potSize: 'Pot gantung diameter 18 cm',
      temperature: '16°C - 24°C',
      soilType: 'Campuran kaya humus dan moss',
      fertilizer: 'Pupuk seimbang 1 bulan sekali',
      toxicityDetail: 'Non-toxic untuk anjing dan kucing.'
    },
    careCard: {
      placement: 'Gantung di dekat jendela kamar mandi atau kanopi teras teduh.',
      wateringSchedule: 'Jaga tanah tetap lembap (namun tidak terendam air).',
      mistFrequency: 'Sangat menyukai kabut air harian.',
      troubleshooting: 'Daun rontok menandakan udara terlalu panas atau kering.'
    },
    images: [
      'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'maranta',
    name: 'Maranta Red Stripe',
    scientificName: 'Maranta leuconeura var. erythroneura',
    origin: 'Hutan Hujan Brazil',
    price: 80000,
    formattedPrice: 'Rp 80.000',
    matchScore: 96,
    size: 'Kecil',
    light: 'Sedang',
    petSafe: true,
    careLevel: 'Sedang',
    watering: '2x/minggu',
    category: 'Tanaman Hias Meja',
    tags: ['Aman untuk hewan', 'Tahan minim cahaya'],
    popular: 93,
    description: 'Sering disebut Red Prayer Plant berkat urat daun merah terang di atas kanvas hijau gelap. Di malam hari daunnya melipat ke atas seperti tangan yang sedang berdoa.',
    additionalInfo: {
      potSize: 'Diameter 12 - 15 cm',
      temperature: '18°C - 27°C',
      soilType: 'Substrat porous dengan retensi air seimbang',
      fertilizer: 'Pupuk organik cair 3 minggu sekali',
      toxicityDetail: '100% Pet-friendly dan sangat aman.'
    },
    careCard: {
      placement: 'Meja kopi, rak ambalan, atau meja samping tempat tidur.',
      wateringSchedule: 'Siram teratur 2 kali seminggu dengan air bersuhu ruang.',
      mistFrequency: 'Semprot kabut 2x seminggu.',
      troubleshooting: 'Warna pudar jika terpapar matahari langsung yang terik.'
    },
    images: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'pothos-golden',
    name: 'Sirih Gading (Golden Pothos)',
    scientificName: 'Epipremnum aureum',
    origin: 'Kepulauan Solomon',
    price: 45000,
    formattedPrice: 'Rp 45.000',
    matchScore: 80,
    size: 'Sedang',
    light: 'Rendah',
    petSafe: false,
    careLevel: 'Mudah',
    watering: '1x/minggu',
    category: 'Tanaman Gantung & Rambat',
    tags: ['Cocok untuk pemula', 'Tahan minim cahaya', 'Mudah dirawat'],
    popular: 97,
    description: 'Tanaman rambat sejuta umat yang nyaris mustahil mati. Bisa ditanam di tanah maupun cukup dimasukkan ke dalam toples berisi air. Daun berbentuk hati dengan semburat warna emas.',
    additionalInfo: {
      potSize: 'Diameter 12 - 16 cm atau botol kaca hidroponik',
      temperature: '15°C - 32°C',
      soilType: 'Segala jenis tanah atau air bersih',
      fertilizer: 'Pupuk cair beberapa tetes tiap bulan',
      toxicityDetail: 'Jauhkan dari jangkauan hewan peliharaan dengan digantung tinggi.'
    },
    careCard: {
      placement: 'Dapat digantung di atas lemari, rak dinding tinggi, atau jendela.',
      wateringSchedule: 'Siram seminggu sekali atau ganti air vas jika pakai media air.',
      mistFrequency: 'Cukup sebulan sekali disemprot segar.',
      troubleshooting: 'Ujung daun cokelat bila air media terlalu lama tidak diganti.'
    },
    images: [
      'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'ficus-lyrata',
    name: 'Ficus Lyrata (Ketapang Biola)',
    scientificName: 'Ficus lyrata (Fiddle Leaf Fig)',
    origin: 'Afrika Barat',
    price: 145000,
    formattedPrice: 'Rp 145.000',
    matchScore: 75,
    size: 'Besar',
    light: 'Terang',
    petSafe: false,
    careLevel: 'Tinggi',
    watering: '1x/minggu',
    category: 'Tanaman Lantai Arsitektural',
    tags: [],
    popular: 88,
    description: 'Tanaman lantai yang anggun dan berwibawa dengan daun lebar berbentuk badan biola. Menjadi focal point favorit desainer interior untuk ruangan bergaya modern scandinavian.',
    additionalInfo: {
      potSize: 'Diameter 24 - 30 cm',
      temperature: '18°C - 28°C',
      soilType: 'Media tanam subur dengan drainase super baik',
      fertilizer: 'Pupuk daun seimbang setiap bulan di musim semi/panas',
      toxicityDetail: 'Getah putih dapat menyebabkan iritasi ringan.'
    },
    careCard: {
      placement: 'Tempatkan dekat jendela besar yang mendapat banyak sinar matahari terang.',
      wateringSchedule: 'Siram mendalam saat 5 cm media tanam atas terasa kering.',
      mistFrequency: 'Bersihkan debu daun dengan spons basah lembut.',
      troubleshooting: 'Hindari memindah-mindahkan posisi pot terlalu sering agar tidak stres.'
    },
    images: [
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'spider-plant',
    name: 'Spider Plant (Lili Paris)',
    scientificName: 'Chlorophytum comosum',
    origin: 'Afrika Selatan',
    price: 40000,
    formattedPrice: 'Rp 40.000',
    matchScore: 93,
    size: 'Kecil',
    light: 'Sedang',
    petSafe: true,
    careLevel: 'Mudah',
    watering: '1-2x/minggu',
    category: 'Tanaman Gantung & Meja',
    tags: ['Cocok untuk pemula', 'Aman untuk hewan', 'Mudah dirawat'],
    popular: 86,
    description: 'Tanaman dengan juntaian daun belang putih-hijau yang lentur. Menghasilkan anakan kecil menggantung seperti laba-laba. Sangat aman jika tidak sengaja dimakan oleh kucing atau anjing.',
    additionalInfo: {
      potSize: 'Diameter 12 - 15 cm',
      temperature: '15°C - 27°C',
      soilType: 'Tanah humus berpori',
      fertilizer: 'Pupuk NPK 2 bulan sekali',
      toxicityDetail: '100% Non-toxic dan aman untuk hewan peliharaan.'
    },
    careCard: {
      placement: 'Di atas meja, ambalan dinding, atau pot gantung teras.',
      wateringSchedule: 'Siram saat tanah bagian atas mulai kering.',
      mistFrequency: 'Bisa disemprot 1x seminggu.',
      troubleshooting: 'Potong anakan kecil dan tancapkan di air untuk menumbuhkan tanaman baru.'
    },
    images: [
      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'aglaonema',
    name: 'Aglaonema Lady Valentine',
    scientificName: 'Aglaonema commutatum',
    origin: 'Asia Tenggara',
    price: 110000,
    formattedPrice: 'Rp 110.000',
    matchScore: 87,
    size: 'Sedang',
    light: 'Rendah',
    petSafe: false,
    careLevel: 'Mudah',
    watering: '1-2x/minggu',
    category: 'Tanaman Hias Daun Berwarna',
    tags: ['Cocok untuk pemula', 'Tahan minim cahaya'],
    popular: 90,
    description: 'Dikenal sebagai Sri Rejeki dengan semburat warna merah muda kemerahan yang mencuri perhatian. Tidak rewel, toleran cahaya rendah, dan membawa keceriaan ke dalam sudut ruangan.',
    additionalInfo: {
      potSize: 'Diameter 15 - 18 cm',
      temperature: '18°C - 30°C',
      soilType: 'Sekam bakar + pakis cacah + andam',
      fertilizer: 'Pupuk slow-release 3 bulan sekali',
      toxicityDetail: 'Jauhkan dari jangkauan hewan peliharaan.'
    },
    careCard: {
      placement: 'Meja tamu, sudut buffet TV, atau koridor dalam ruangan.',
      wateringSchedule: 'Siram 1-2 kali seminggu, jangan sampai akar terendam air.',
      mistFrequency: 'Semprot kabut tipis untuk mempertahankan kesegaran warna daun.',
      troubleshooting: 'Warna pink semakin cerah jika diletakkan di cahaya teduh terang.'
    },
    images: [
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=800&q=80'
    ]
  }
];
