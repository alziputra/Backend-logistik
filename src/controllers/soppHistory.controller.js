const { Op } = require('sequelize');
const { SoppHistory } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

const SOPP_HISTORY_FIELDS = [
  'nomor_sopp', 'tanggal', 'tipe_sopp',
  'dibayarkan_kepada', 'jumlah', 'content',
];

const getAllSoppHistories = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search, tipe_sopp, dibayarkan_kepada } = req.query;

    const where = {};
    if (search) {
      where[Op.or] = [
        { nomor_sopp: { [Op.iLike]: `%${search}%` } },
        { dibayarkan_kepada: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (tipe_sopp) where.tipe_sopp = tipe_sopp;
    if (dibayarkan_kepada) where.dibayarkan_kepada = { [Op.iLike]: `%${dibayarkan_kepada}%` };

    const { count, rows } = await SoppHistory.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'sopp_histories', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

const getSoppHistoryById = async (req, res, next) => {
  try {
    const soppHistory = await SoppHistory.findByPk(req.params.id);
    if (!soppHistory) {
      return sendNotFound(res, 'Riwayat SOPP tidak ditemukan');
    }
    return sendSuccess(res, { soppHistory });
  } catch (error) {
    next(error);
  }
};

const createSoppHistory = async (req, res, next) => {
  try {
    const payload = pick(req.body, SOPP_HISTORY_FIELDS);
    const soppHistory = await SoppHistory.create(payload);
    return sendSuccess(res, { soppHistory }, 'Riwayat SOPP berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

const updateSoppHistory = async (req, res, next) => {
  try {
    const soppHistory = await SoppHistory.findByPk(req.params.id);
    if (!soppHistory) {
      return sendNotFound(res, 'Riwayat SOPP tidak ditemukan');
    }
    const payload = pick(req.body, SOPP_HISTORY_FIELDS);
    await soppHistory.update(payload);
    return sendSuccess(res, { soppHistory }, 'Riwayat SOPP berhasil diupdate');
  } catch (error) {
    next(error);
  }
};

const deleteSoppHistory = async (req, res, next) => {
  try {
    const soppHistory = await SoppHistory.findByPk(req.params.id);
    if (!soppHistory) {
      return sendNotFound(res, 'Riwayat SOPP tidak ditemukan');
    }
    await soppHistory.destroy();
    return sendSuccess(res, null, 'Riwayat SOPP berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSoppHistories,
  getSoppHistoryById,
  createSoppHistory,
  updateSoppHistory,
  deleteSoppHistory,
};
