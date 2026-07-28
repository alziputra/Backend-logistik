const express = require('express');
const { body } = require('express-validator');
const {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
} = require('../controllers/vendor.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { validateRequest } = require('../middlewares/validate.middleware');

const router = express.Router();

const vendorValidation = [
  body('nama').trim().notEmpty().withMessage('Nama vendor wajib diisi'),
  body('no_telp').trim().notEmpty().withMessage('No. telepon wajib diisi'),
  body('alamat').trim().notEmpty().withMessage('Alamat wajib diisi'),
];

// Semua route butuh autentikasi
router.use(authenticate);

router.get('/', getAllVendors);
router.get('/:id', getVendorById);
router.post('/', authorize('admin'), vendorValidation, validateRequest, createVendor);
router.put('/:id', authorize('admin'), vendorValidation, validateRequest, updateVendor);
router.delete('/:id', authorize('admin'), deleteVendor);

module.exports = router;