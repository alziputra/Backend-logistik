const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const vendorRoutes = require('./vendor.routes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/vendors', vendorRoutes);

module.exports = router;
