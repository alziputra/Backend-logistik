const { Op } = require('sequelize');
const { Renovasi } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

const RENOVASI_FIELDS = [
  'no_memo', 'tgl_memo', 'nama_pekerjaan', 'nilai_pembayaran',
  'nama_outlet', 'cabang', 'norek', 'bank', 'pelaksana_pekerjaan',
  'tgl_tagihan', 'nilai_spk_pelaksanaan', 'nilai_addendum_spk',
  'tgl_spk', 'no_spk', 'pajak_pph', 'tgl_bap_bast',
  'tagihan_nilai', 'tagihan_dpp', 'tagihan_ppn', 'tagihan_pph',
  'tagihan_retensi', 'tagihan_transfer', 'retensi_nilai', 'retensi_dpp',
  'retensi_ppn', 'retensi_pph', 'retensi_transfer', 'status', 'deskripsi',
];

const getAllRenovasi = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search, status, cabang } = req.query;

    const where = {};
    if (search) {
      where[Op.or] = [
        { nama_pekerjaan: { [Op.iLike]: `%${search}%` } },
        { no_spk: { [Op.iLike]: `%${search}%` } },
        { nama_outlet: { [Op.iLike]: `%${search}%` } },
        { pelaksana_pekerjaan: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (status) where.status = status;
    if (cabang) where.cabang = { [Op.iLike]: `%${cabang}%` };

    const { count, rows } = await Renovasi.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'renovasi', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

const getRenovasiById = async (req, res, next) => {
  try {
    const renovasi = await Renovasi.findByPk(req.params.id);
    if (!renovasi) {
      return sendNotFound(res, 'Data Renovasi tidak ditemukan');
    }
    return sendSuccess(res, { renovasi });
  } catch (error) {
    next(error);
  }
};

const createRenovasi = async (req, res, next) => {
  try {
    const payload = pick(req.body, RENOVASI_FIELDS);
    const renovasi = await Renovasi.create(payload);
    return sendSuccess(res, { renovasi }, 'Data Renovasi berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

const updateRenovasi = async (req, res, next) => {
  try {
    const renovasi = await Renovasi.findByPk(req.params.id);
    if (!renovasi) {
      return sendNotFound(res, 'Data Renovasi tidak ditemukan');
    }
    const payload = pick(req.body, RENOVASI_FIELDS);
    await renovasi.update(payload);
    return sendSuccess(res, { renovasi }, 'Data Renovasi berhasil diupdate');
  } catch (error) {
    next(error);
  }
};

const deleteRenovasi = async (req, res, next) => {
  try {
    const renovasi = await Renovasi.findByPk(req.params.id);
    if (!renovasi) {
      return sendNotFound(res, 'Data Renovasi tidak ditemukan');
    }
    await renovasi.destroy();
    return sendSuccess(res, null, 'Data Renovasi berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRenovasi,
  getRenovasiById,
  createRenovasi,
  updateRenovasi,
  deleteRenovasi,
};
