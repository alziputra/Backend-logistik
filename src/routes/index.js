const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const vendorRoutes = require('./vendor.routes');
const asetRoutes = require('./aset.routes');
const instansiRoutes = require('./instansi.routes');
const komputerRoutes = require('./komputer.routes');
const printerRoutes = require('./printer.routes');
const transaksiRoutes = require('./transaksi.routes');
const asetTanahRoutes = require('./asetTanah.routes');
const menuSewaRoutes = require('./menuSewa.routes');
const renovasiRoutes = require('./renovasi.routes');
const pengamananKorporasiRoutes = require('./pengamananKorporasi.routes');
const spkHistoryRoutes = require('./spkHistory.routes');
const soppHistoryRoutes = require('./soppHistory.routes');
const activityLogRoutes = require('./activityLog.routes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/vendors', vendorRoutes);
router.use('/asets', asetRoutes);
router.use('/instansi', instansiRoutes);
router.use('/komputer', komputerRoutes);
router.use('/printer', printerRoutes);
router.use('/transaksi', transaksiRoutes);
router.use('/aset-tanah', asetTanahRoutes);
router.use('/menu-sewa', menuSewaRoutes);
router.use('/renovasi', renovasiRoutes);
router.use('/pengamanan-korporasi', pengamananKorporasiRoutes);
router.use('/spk-histories', spkHistoryRoutes);
router.use('/sopp-histories', soppHistoryRoutes);
router.use('/activity-logs', activityLogRoutes);

module.exports = router;
