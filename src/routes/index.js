const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const vendorRoutes = require('./vendor.routes');
const asetRoutes = require('./aset.routes');
const instansiRoutes = require('./instansi.routes');
const komputerRoutes = require('./komputer.routes');
const printerRoutes = require('./printer.routes');
const transaksiRoutes = require('./transaksi.routes');

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

module.exports = router;
