const express = require('express');
const { body } = require('express-validator');
const {
  getAllTransaksi,
  getTransaksiById,
  createTransaksi,
  updateTransaksi,
  deleteTransaksi,
} = require('../controllers/transaksi.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

const transaksiValidation = [
  body('jenisTransaksi')
    .isIn(['Barang Masuk', 'Barang Keluar'])
    .withMessage('Jenis transaksi wajib diisi (Barang Masuk / Barang Keluar)'),
  body('items').optional().isArray().withMessage('Items harus berupa array'),
];

// Semua route butuh autentikasi
router.use(authenticate);

router.get('/', getAllTransaksi);
router.get('/:id', getTransaksiById);
router.post('/', authorize('admin'), transaksiValidation, createTransaksi);
router.put('/:id', authorize('admin'), updateTransaksi);
router.delete('/:id', authorize('admin'), deleteTransaksi);

module.exports = router;
