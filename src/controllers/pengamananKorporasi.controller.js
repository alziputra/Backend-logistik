const { Op } = require('sequelize');
const { PengamananKorporasi } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

const PENGAMANAN_FIELDS = [
  'no_urut', 'kantor_wilayah', 'kantor_area', 'kantor_cabang',
  'kode_unit_kerja', 'nama_unit_kerja', 'status', 'vendor',
  'jumlah_kamera', 'aplikasi', 'nama_aplikasi', 'keterangan',
];

const getAllPengamananKorporasi = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search, status, vendor } = req.query;

    const where = {};
    if (search) {
      where[Op.or] = [
        { nama_unit_kerja: { [Op.iLike]: `%${search}%` } },
        { kode_unit_kerja: { [Op.iLike]: `%${search}%` } },
        { kantor_cabang: { [Op.iLike]: `%${search}%` } },
        { vendor: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (status) where.status = status;
    if (vendor) where.vendor = { [Op.iLike]: `%${vendor}%` };

    const { count, rows } = await PengamananKorporasi.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'pengamanan_korporasi', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

const getPengamananKorporasiById = async (req, res, next) => {
  try {
    const data = await PengamananKorporasi.findByPk(req.params.id);
    if (!data) {
      return sendNotFound(res, 'Data Pengamanan Korporasi tidak ditemukan');
    }
    return sendSuccess(res, { pengamananKorporasi: data });
  } catch (error) {
    next(error);
  }
};

const createPengamananKorporasi = async (req, res, next) => {
  try {
    const payload = pick(req.body, PENGAMANAN_FIELDS);
    const data = await PengamananKorporasi.create(payload);
    return sendSuccess(res, { pengamananKorporasi: data }, 'Data Pengamanan Korporasi berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

const updatePengamananKorporasi = async (req, res, next) => {
  try {
    const data = await PengamananKorporasi.findByPk(req.params.id);
    if (!data) {
      return sendNotFound(res, 'Data Pengamanan Korporasi tidak ditemukan');
    }
    const payload = pick(req.body, PENGAMANAN_FIELDS);
    await data.update(payload);
    return sendSuccess(res, { pengamananKorporasi: data }, 'Data Pengamanan Korporasi berhasil diupdate');
  } catch (error) {
    next(error);
  }
};

const deletePengamananKorporasi = async (req, res, next) => {
  try {
    const data = await PengamananKorporasi.findByPk(req.params.id);
    if (!data) {
      return sendNotFound(res, 'Data Pengamanan Korporasi tidak ditemukan');
    }
    await data.destroy();
    return sendSuccess(res, null, 'Data Pengamanan Korporasi berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPengamananKorporasi,
  getPengamananKorporasiById,
  createPengamananKorporasi,
  updatePengamananKorporasi,
  deletePengamananKorporasi,
};
