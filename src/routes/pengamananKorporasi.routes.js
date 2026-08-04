const express = require('express');
const {
  getAllPengamananKorporasi,
  getPengamananKorporasiById,
  createPengamananKorporasi,
  updatePengamananKorporasi,
  deletePengamananKorporasi,
} = require('../controllers/pengamananKorporasi.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllPengamananKorporasi);
router.get('/:id', getPengamananKorporasiById);
router.post('/', authorize('admin'), createPengamananKorporasi);
router.put('/:id', authorize('admin'), updatePengamananKorporasi);
router.delete('/:id', authorize('admin'), deletePengamananKorporasi);

module.exports = router;
