const express = require('express');
const {
  getAllMenuSewa,
  getMenuSewaById,
  createMenuSewa,
  updateMenuSewa,
  deleteMenuSewa,
} = require('../controllers/menuSewa.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllMenuSewa);
router.get('/:id', getMenuSewaById);
router.post('/', authorize('admin'), createMenuSewa);
router.put('/:id', authorize('admin'), updateMenuSewa);
router.delete('/:id', authorize('admin'), deleteMenuSewa);

module.exports = router;
