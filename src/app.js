require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { sequelize } = require('./models');
const routes = require('./routes');
const { errorHandler, notFound } = require('./middlewares/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Security & utility middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// 404 & Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server after DB connection
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    // Relax vendorId NOT NULL constraint if needed
    try {
      await sequelize.query('ALTER TABLE "Asets" ALTER COLUMN "vendorId" DROP NOT NULL;');
    } catch {
      // Ignore if table does not exist or column is already nullable
    }

    // Auto-sync Instansis columns & seed master outlet data if needed
    try {
      await sequelize.query('ALTER TABLE "Instansis" ADD COLUMN IF NOT EXISTS "status" VARCHAR(255);');
      await sequelize.query('ALTER TABLE "Instansis" ADD COLUMN IF NOT EXISTS "kodeCabang" VARCHAR(255);');
      await sequelize.query('ALTER TABLE "Instansis" ADD COLUMN IF NOT EXISTS "cabangInduk" VARCHAR(255);');
      await sequelize.query('ALTER TABLE "Instansis" ADD COLUMN IF NOT EXISTS "clustering" VARCHAR(255);');
      await sequelize.query('ALTER TABLE "Instansis" ADD COLUMN IF NOT EXISTS "jenis" VARCHAR(255);');
      await sequelize.query('ALTER TABLE "Instansis" ADD COLUMN IF NOT EXISTS "area" VARCHAR(255);');

      const { Instansi } = require('./models');
      const rawData = [
        { kode: '12447', nama: 'UPC TAMAN RAFLESIA', status: 'UPC', kodeCabang: '12473', cabangInduk: 'CP BEKASI TIMUR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12473', nama: 'CP BEKASI TIMUR', status: 'Cabang', kodeCabang: '12473', cabangInduk: 'CP BEKASI TIMUR', clustering: 'INDUK CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12474', nama: 'UPC RAWA PANJANG', status: 'UPC', kodeCabang: '12473', cabangInduk: 'CP BEKASI TIMUR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12475', nama: 'UPC JATI MULYA', status: 'UPC', kodeCabang: '12473', cabangInduk: 'CP BEKASI TIMUR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12477', nama: 'UPC KALIABANG NANGKA', status: 'UPC', kodeCabang: '12473', cabangInduk: 'CP BEKASI TIMUR', clustering: 'NON CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12478', nama: 'UPC KARANG SATRIA', status: 'UPC', kodeCabang: '12473', cabangInduk: 'CP BEKASI TIMUR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12479', nama: 'UPC PONDOK HIJAU', status: 'UPC', kodeCabang: '12473', cabangInduk: 'CP BEKASI TIMUR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12480', nama: 'UPC BUMYAGARA', status: 'UPC', kodeCabang: '12473', cabangInduk: 'CP BEKASI TIMUR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12481', nama: 'UPC MUSTIKA JAYA', status: 'UPC', kodeCabang: '12473', cabangInduk: 'CP BEKASI TIMUR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12482', nama: 'UPC PONDOK TIMUR', status: 'UPC', kodeCabang: '12473', cabangInduk: 'CP BEKASI TIMUR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12635', nama: 'UPC MUTIARA GADING TIMUR', status: 'UPC', kodeCabang: '12473', cabangInduk: 'CP BEKASI TIMUR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12341', nama: 'CP BEKASI UTAMA', status: 'Cabang', kodeCabang: '12341', cabangInduk: 'CP BEKASI UTAMA', clustering: 'INDUK CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12342', nama: 'UPC WISMA ASRI', status: 'UPC', kodeCabang: '12341', cabangInduk: 'CP BEKASI UTAMA', clustering: 'INDUK CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12343', nama: 'UPC VILLA ASRI', status: 'UPC', kodeCabang: '12341', cabangInduk: 'CP BEKASI UTAMA', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12345', nama: 'UPC MEKAR SARI', status: 'UPC', kodeCabang: '12341', cabangInduk: 'CP BEKASI UTAMA', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12346', nama: 'UPC DUKUH ZAMRUD', status: 'UPC', kodeCabang: '12341', cabangInduk: 'CP BEKASI UTAMA', clustering: 'NON CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12347', nama: 'UPC MEGA BEKASI', status: 'UPC', kodeCabang: '12341', cabangInduk: 'CP BEKASI UTAMA', clustering: 'NON CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12349', nama: 'UPC VILA INDAH PERMAI', status: 'UPC', kodeCabang: '12341', cabangInduk: 'CP BEKASI UTAMA', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12351', nama: 'UPC KEBALEN', status: 'UPC', kodeCabang: '12341', cabangInduk: 'CP BEKASI UTAMA', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12439', nama: 'UPC GABUS RAYA', status: 'UPC', kodeCabang: '12341', cabangInduk: 'CP BEKASI UTAMA', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12513', nama: 'UPC TELUK PUCUNG', status: 'UPC', kodeCabang: '12341', cabangInduk: 'CP BEKASI UTAMA', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12616', nama: 'UPC PONCOL KARTINI', status: 'UPC', kodeCabang: '12341', cabangInduk: 'CP BEKASI UTAMA', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12465', nama: 'CP CIKARANG', status: 'Cabang', kodeCabang: '12465', cabangInduk: 'CP CIKARANG', clustering: 'INDUK CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12466', nama: 'UPC JABABEKA', status: 'UPC', kodeCabang: '12465', cabangInduk: 'CP CIKARANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12467', nama: 'UPC KALIJAYA', status: 'UPC', kodeCabang: '12465', cabangInduk: 'CP CIKARANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12468', nama: 'UPC SERANG CIKARANG', status: 'UPC', kodeCabang: '12465', cabangInduk: 'CP CIKARANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12469', nama: 'UPC SGC', status: 'UPC', kodeCabang: '12465', cabangInduk: 'CP CIKARANG', clustering: 'NON CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12470', nama: 'UPC SUKAMANTRI', status: 'UPC', kodeCabang: '12465', cabangInduk: 'CP CIKARANG', clustering: 'NON CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12471', nama: 'UPC GRAHA CIKARANG', status: 'UPC', kodeCabang: '12465', cabangInduk: 'CP CIKARANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12472', nama: 'UPC SUKARESMI', status: 'UPC', kodeCabang: '12465', cabangInduk: 'CP CIKARANG', clustering: 'INDUK CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12435', nama: 'CP KALIMALANG', status: 'Cabang', kodeCabang: '12435', cabangInduk: 'CP KALIMALANG', clustering: 'INDUK CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12437', nama: 'UPC CAMAN RAYA', status: 'UPC', kodeCabang: '12435', cabangInduk: 'CP KALIMALANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12442', nama: 'UPC JAKA PERMAI', status: 'UPC', kodeCabang: '12435', cabangInduk: 'CP KALIMALANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12443', nama: 'UPC KINCAN RAYA', status: 'UPC', kodeCabang: '12435', cabangInduk: 'CP KALIMALANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12444', nama: 'UPC JATIBENING', status: 'UPC', kodeCabang: '12435', cabangInduk: 'CP KALIMALANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12613', nama: 'UPC BINTARA JAYA', status: 'UPC', kodeCabang: '12435', cabangInduk: 'CP KALIMALANG', clustering: 'NON CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12680', nama: 'UPC RATNA', status: 'UPC', kodeCabang: '12435', cabangInduk: 'CP KALIMALANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12384', nama: 'CP KARAWANG', status: 'Cabang', kodeCabang: '12384', cabangInduk: 'CP KARAWANG', clustering: 'INDUK CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12385', nama: 'UPC KOSAMBI', status: 'UPC', kodeCabang: '12384', cabangInduk: 'CP KARAWANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12386', nama: 'UPC NAGASARI', status: 'UPC', kodeCabang: '12384', cabangInduk: 'CP KARAWANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12387', nama: 'UPC NIAGA', status: 'UPC', kodeCabang: '12384', cabangInduk: 'CP KARAWANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12388', nama: 'UPC GINTUNG KERTA', status: 'UPC', kodeCabang: '12384', cabangInduk: 'CP KARAWANG', clustering: 'INDUK CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12389', nama: 'UPC TELUK JAMBE', status: 'UPC', kodeCabang: '12384', cabangInduk: 'CP KARAWANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12391', nama: 'UPC KONDANG JAYA', status: 'UPC', kodeCabang: '12384', cabangInduk: 'CP KARAWANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12392', nama: 'UPC PASAR BARU', status: 'UPC', kodeCabang: '12384', cabangInduk: 'CP KARAWANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12393', nama: 'UPC PASAR JOHAR', status: 'UPC', kodeCabang: '12384', cabangInduk: 'CP KARAWANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12394', nama: 'UPC PERUMNAS TELUK JAMBE', status: 'UPC', kodeCabang: '12384', cabangInduk: 'CP KARAWANG', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12390', nama: 'UPC LAMARAN', status: 'UPC', kodeCabang: '12413', cabangInduk: 'CP RENGAS DENGKLOK', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12413', nama: 'CP RENGAS DENGKLOK', status: 'Cabang', kodeCabang: '12413', cabangInduk: 'CP RENGAS DENGKLOK', clustering: 'INDUK CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12414', nama: 'UPC TELAGASARI', status: 'UPC', kodeCabang: '12413', cabangInduk: 'CP RENGAS DENGKLOK', clustering: 'NON CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12415', nama: 'UPC CIBUAYA', status: 'UPC', kodeCabang: '12413', cabangInduk: 'CP RENGAS DENGKLOK', clustering: 'MANDIRI', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12416', nama: 'UPC KEDUNG WARINGIN', status: 'UPC', kodeCabang: '12413', cabangInduk: 'CP RENGAS DENGKLOK', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12659', nama: 'CP SETIA MEKAR', status: 'Cabang', kodeCabang: '12659', cabangInduk: 'CP SETIA MEKAR', clustering: 'INDUK CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12660', nama: 'UPC VILA MUTIARA GADING', status: 'UPC', kodeCabang: '12659', cabangInduk: 'CP SETIA MEKAR', clustering: 'NON CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12661', nama: 'UPC DUREN JAYA', status: 'UPC', kodeCabang: '12659', cabangInduk: 'CP SETIA MEKAR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12663', nama: 'UPC BUMI SANI', status: 'UPC', kodeCabang: '12659', cabangInduk: 'CP SETIA MEKAR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12665', nama: 'UPC TABRANI', status: 'UPC', kodeCabang: '12659', cabangInduk: 'CP SETIA MEKAR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' },
        { kode: '12666', nama: 'UPC AGUS SALIM', status: 'UPC', kodeCabang: '12659', cabangInduk: 'CP SETIA MEKAR', clustering: 'ANGGOTA CLUSTER', jenis: 'KONVEN', area: 'AREA BEKASI' }
      ];

      for (const item of rawData) {
        const existing = await Instansi.findOne({ where: { kode: item.kode } });
        if (existing) {
          await existing.update(item);
        } else {
          await Instansi.create(item);
        }
      }
      console.log('✅ Master data instansi (58 outlet) auto-synced to DB successfully!');
    } catch (err) {
      console.error('⚠️ Error auto-syncing Instansis:', err.message);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📦 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to database:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
