const express = require('express');
const { body } = require('express-validator');
const {
  getAllAsets,
  getAsetById,
  createAset,
  updateAset,
  deleteAset,
} = require('../controllers/aset.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { validateRequest } = require('../middlewares/validate.middleware');

const router = express.Router();

const asetValidation = [
  body('nama').trim().notEmpty().withMessage('Nama aset wajib diisi'),
  body('vendorId').notEmpty().withMessage('Vendor wajib diisi').isInt().withMessage('Vendor tidak valid'),
  body('status')
    .optional()
    .isIn(['Sewa Berjalan', 'Sewa Selesai', 'Sewa Dibatalkan'])
    .withMessage('Status tidak valid'),
];

// Semua route butuh autentikasi
router.use(authenticate);

router.get('/', getAllAsets);
router.get('/:id', getAsetById);
router.post('/', authorize('admin'), asetValidation, validateRequest, createAset);
router.put('/:id', authorize('admin'), asetValidation, validateRequest, updateAset);
router.delete('/:id', authorize('admin'), deleteAset);

module.exports = router;
