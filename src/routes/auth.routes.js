const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe, changePassword } = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validateRequest } = require('../middlewares/validate.middleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validateRequest,
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  login
);

router.get('/me', authenticate, getMe);

router.post(
  '/change-password',
  authenticate,
  [
    body('currentPassword').notEmpty().withMessage('Password saat ini wajib diisi'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password baru minimal 6 karakter'),
  ],
  validateRequest,
  changePassword
);

module.exports = router;
