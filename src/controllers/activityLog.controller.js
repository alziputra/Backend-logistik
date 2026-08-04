const { Op } = require('sequelize');
const { ActivityLog } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

const ACTIVITY_LOG_FIELDS = [
  'user_email', 'action', 'module', 'details', 'timestamp',
];

const getAllActivityLogs = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search, module: moduleQuery, action } = req.query;

    const where = {};
    if (search) {
      where[Op.or] = [
        { user_email: { [Op.iLike]: `%${search}%` } },
        { details: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (moduleQuery) where.module = moduleQuery;
    if (action) where.action = action;

    const { count, rows } = await ActivityLog.findAndCountAll({
      where,
      limit,
      offset,
      order: [['timestamp', 'DESC']],
    });

    return sendPaginated(res, 'activity_logs', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

const getActivityLogById = async (req, res, next) => {
  try {
    const log = await ActivityLog.findByPk(req.params.id);
    if (!log) {
      return sendNotFound(res, 'Activity Log tidak ditemukan');
    }
    return sendSuccess(res, { activityLog: log });
  } catch (error) {
    next(error);
  }
};

const createActivityLog = async (req, res, next) => {
  try {
    const payload = pick(req.body, ACTIVITY_LOG_FIELDS);
    if (!payload.user_email && req.user) {
      payload.user_email = req.user.email;
    }
    if (!payload.timestamp) {
      payload.timestamp = new Date();
    }

    const log = await ActivityLog.create(payload);
    return sendSuccess(res, { activityLog: log }, 'Activity Log berhasil dicatat', 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllActivityLogs,
  getActivityLogById,
  createActivityLog,
};
