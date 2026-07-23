const express = require('express');
const { body } = require('express-validator');
const {
  getAllPrinter,
  getPrinterById,
  createPrinter,
  updatePrinter,
  deletePrinter,
} = require('../controllers/printer.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

const printerValidation = [
  body('produk').trim().notEmpty().withMessage('Produk wajib diisi'),
  body('outlet').trim().notEmpty().withMessage('Outlet wajib diisi'),
];

// Semua route butuh autentikasi
router.use(authenticate);

router.get('/', getAllPrinter);
router.get('/:id', getPrinterById);
router.post('/', authorize('admin'), printerValidation, createPrinter);
router.put('/:id', authorize('admin'), updatePrinter);
router.delete('/:id', authorize('admin'), deletePrinter);

module.exports = router;
