const express = require('express');
const { body } = require('express-validator');
const {
  getAllInstansi,
  getInstansiById,
  createInstansi,
  updateInstansi,
  deleteInstansi,
} = require('../controllers/instansi.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

const instansiValidation = [
  body('kode').trim().notEmpty().withMessage('Kode instansi wajib diisi'),
  body('nama').trim().notEmpty().withMessage('Nama instansi wajib diisi'),
];

// Semua route butuh autentikasi
router.use(authenticate);

router.get('/', getAllInstansi);
router.get('/:id', getInstansiById);
router.post('/', authorize('admin'), instansiValidation, createInstansi);
router.put('/:id', authorize('admin'), instansiValidation, updateInstansi);
router.delete('/:id', authorize('admin'), deleteInstansi);

module.exports = router;
