const express = require('express');
const {
  getAllSpkHistories,
  getSpkHistoryById,
  createSpkHistory,
  updateSpkHistory,
  deleteSpkHistory,
} = require('../controllers/spkHistory.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllSpkHistories);
router.get('/:id', getSpkHistoryById);
router.post('/', authorize('admin'), createSpkHistory);
router.put('/:id', authorize('admin'), updateSpkHistory);
router.delete('/:id', authorize('admin'), deleteSpkHistory);

module.exports = router;
