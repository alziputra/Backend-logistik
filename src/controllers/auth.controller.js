const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { sendSuccess, sendError } = require('../utils/response.util');

const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendError(res, 'Email already registered', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user.id, user.role);

    return sendSuccess(
      res,
      {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token,
      },
      'Registration successful',
      201
    );
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, 'Invalid credentials', 401);
    }

    if (!user.isActive) {
      return sendError(res, 'Account is deactivated', 403);
    }

    const token = generateToken(user.id, user.role);

    return sendSuccess(
      res,
      {
        user: { id: user.id, name: user.name, email: user.email, role: user.role, isActive: user.isActive },
        token,
      },
      'Login successful'
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    const dbUser = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'isActive', 'createdAt']
    });

    if (!dbUser) {
      return sendError(res, 'User tidak ditemukan', 404);
    }

    return sendSuccess(res, {
      user: {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        isActive: dbUser.isActive,
        createdAt: dbUser.createdAt,
      }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/change-password
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return sendError(res, 'User tidak ditemukan', 404);
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return sendError(res, 'Password saat ini salah', 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return sendSuccess(res, null, 'Password berhasil diperbarui');
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, changePassword };