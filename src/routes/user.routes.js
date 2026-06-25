const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;
