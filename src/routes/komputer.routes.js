const express = require('express');
const { body } = require('express-validator');
const {
  getAllKomputer,
  getKomputerById,
  createKomputer,
  updateKomputer,
  deleteKomputer,
} = require('../controllers/komputer.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

const komputerValidation = [
  body('produk').trim().notEmpty().withMessage('Produk wajib diisi'),
  body('outlet').trim().notEmpty().withMessage('Outlet wajib diisi'),
];

// Semua route butuh autentikasi
router.use(authenticate);

router.get('/', getAllKomputer);
router.get('/:id', getKomputerById);
router.post('/', authorize('admin'), komputerValidation, createKomputer);
router.put('/:id', authorize('admin'), updateKomputer);
router.delete('/:id', authorize('admin'), deleteKomputer);

module.exports = router;
