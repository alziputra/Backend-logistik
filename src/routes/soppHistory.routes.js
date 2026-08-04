const express = require('express');
const {
  getAllSoppHistories,
  getSoppHistoryById,
  createSoppHistory,
  updateSoppHistory,
  deleteSoppHistory,
} = require('../controllers/soppHistory.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllSoppHistories);
router.get('/:id', getSoppHistoryById);
router.post('/', authorize('admin'), createSoppHistory);
router.put('/:id', authorize('admin'), updateSoppHistory);
router.delete('/:id', authorize('admin'), deleteSoppHistory);

module.exports = router;
