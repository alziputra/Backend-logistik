const express = require('express');
const {
  getAllAsetTanah,
  getAsetTanahById,
  createAsetTanah,
  updateAsetTanah,
  deleteAsetTanah,
} = require('../controllers/asetTanah.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllAsetTanah);
router.get('/:id', getAsetTanahById);
router.post('/', authorize('admin'), createAsetTanah);
router.put('/:id', authorize('admin'), updateAsetTanah);
router.delete('/:id', authorize('admin'), deleteAsetTanah);

module.exports = router;
