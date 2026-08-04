const express = require('express');
const {
  getAllRenovasi,
  getRenovasiById,
  createRenovasi,
  updateRenovasi,
  deleteRenovasi,
} = require('../controllers/renovasi.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllRenovasi);
router.get('/:id', getRenovasiById);
router.post('/', authorize('admin'), createRenovasi);
router.put('/:id', authorize('admin'), updateRenovasi);
router.delete('/:id', authorize('admin'), deleteRenovasi);

module.exports = router;
