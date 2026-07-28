const { User } = require('../models');
const { getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

// GET /api/users
const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { role } = req.query;

    const where = {};
    if (role) where.role = role;

    const { count, rows } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'users', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return sendNotFound(res, 'User not found');
    }

    return sendSuccess(res, { user });
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return sendNotFound(res, 'User not found');
    }

    const { name, isActive } = req.body;
    await user.update({ name, isActive });

    return sendSuccess(
      res,
      { user: { id: user.id, name: user.name, email: user.email, role: user.role, isActive: user.isActive } },
      'User updated successfully'
    );
  } catch (error) {
    next(error);
  }
};

// DELETE /api/users/:id
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return sendNotFound(res, 'User not found');
    }

    await user.destroy();
    return sendSuccess(res, null, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
