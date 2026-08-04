const { Op } = require('sequelize');
const { SpkHistory } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

const SPK_HISTORY_FIELDS = [
  'nomor_spk', 'tanggal', 'perusahaan', 'uraian',
  'jumlah', 'content', 'tipe_spk',
];

const getAllSpkHistories = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search, tipe_spk, perusahaan } = req.query;

    const where = {};
    if (search) {
      where[Op.or] = [
        { nomor_spk: { [Op.iLike]: `%${search}%` } },
        { perusahaan: { [Op.iLike]: `%${search}%` } },
        { uraian: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (tipe_spk) where.tipe_spk = tipe_spk;
    if (perusahaan) where.perusahaan = { [Op.iLike]: `%${perusahaan}%` };

    const { count, rows } = await SpkHistory.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'spk_histories', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

const getSpkHistoryById = async (req, res, next) => {
  try {
    const spkHistory = await SpkHistory.findByPk(req.params.id);
    if (!spkHistory) {
      return sendNotFound(res, 'Riwayat SPK tidak ditemukan');
    }
    return sendSuccess(res, { spkHistory });
  } catch (error) {
    next(error);
  }
};

const createSpkHistory = async (req, res, next) => {
  try {
    const payload = pick(req.body, SPK_HISTORY_FIELDS);
    const spkHistory = await SpkHistory.create(payload);
    return sendSuccess(res, { spkHistory }, 'Riwayat SPK berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

const updateSpkHistory = async (req, res, next) => {
  try {
    const spkHistory = await SpkHistory.findByPk(req.params.id);
    if (!spkHistory) {
      return sendNotFound(res, 'Riwayat SPK tidak ditemukan');
    }
    const payload = pick(req.body, SPK_HISTORY_FIELDS);
    await spkHistory.update(payload);
    return sendSuccess(res, { spkHistory }, 'Riwayat SPK berhasil diupdate');
  } catch (error) {
    next(error);
  }
};

const deleteSpkHistory = async (req, res, next) => {
  try {
    const spkHistory = await SpkHistory.findByPk(req.params.id);
    if (!spkHistory) {
      return sendNotFound(res, 'Riwayat SPK tidak ditemukan');
    }
    await spkHistory.destroy();
    return sendSuccess(res, null, 'Riwayat SPK berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSpkHistories,
  getSpkHistoryById,
  createSpkHistory,
  updateSpkHistory,
  deleteSpkHistory,
};
