const express = require('express');
const {
  getAllActivityLogs,
  getActivityLogById,
  createActivityLog,
} = require('../controllers/activityLog.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllActivityLogs);
router.get('/:id', getActivityLogById);
router.post('/', createActivityLog);

module.exports = router;
