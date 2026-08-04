const { Op } = require('sequelize');
const { AsetTanah } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

const ASET_TANAH_FIELDS = [
  'no', 'unit_kerja', 'alamat', 'peruntukan', 'aset_sap',
  'no_shgb', 'no_sertifikat', 'no_sertifikat_gabung', 'no_imb',
  'nama_pemilik_imb', 'tgl_shgb_mulai', 'tgl_shgb_berakhir',
  'tahun_perolehan', 'luas_tanah_m2', 'luas_pagar_m2',
  'luas_bangunan_m2', 'status', 'keterangan',
];

const getAllAsetTanah = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search, status, unit_kerja } = req.query;

    const where = {};
    if (search) {
      where[Op.or] = [
        { unit_kerja: { [Op.iLike]: `%${search}%` } },
        { peruntukan: { [Op.iLike]: `%${search}%` } },
        { alamat: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (status) where.status = status;
    if (unit_kerja) where.unit_kerja = { [Op.iLike]: `%${unit_kerja}%` };

    const { count, rows } = await AsetTanah.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'aset_tanah', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

const getAsetTanahById = async (req, res, next) => {
  try {
    const asetTanah = await AsetTanah.findByPk(req.params.id);
    if (!asetTanah) {
      return sendNotFound(res, 'Aset Tanah tidak ditemukan');
    }
    return sendSuccess(res, { asetTanah });
  } catch (error) {
    next(error);
  }
};

const createAsetTanah = async (req, res, next) => {
  try {
    const payload = pick(req.body, ASET_TANAH_FIELDS);
    const asetTanah = await AsetTanah.create(payload);
    return sendSuccess(res, { asetTanah }, 'Aset Tanah berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

const updateAsetTanah = async (req, res, next) => {
  try {
    const asetTanah = await AsetTanah.findByPk(req.params.id);
    if (!asetTanah) {
      return sendNotFound(res, 'Aset Tanah tidak ditemukan');
    }
    const payload = pick(req.body, ASET_TANAH_FIELDS);
    await asetTanah.update(payload);
    return sendSuccess(res, { asetTanah }, 'Aset Tanah berhasil diupdate');
  } catch (error) {
    next(error);
  }
};

const deleteAsetTanah = async (req, res, next) => {
  try {
    const asetTanah = await AsetTanah.findByPk(req.params.id);
    if (!asetTanah) {
      return sendNotFound(res, 'Aset Tanah tidak ditemukan');
    }
    await asetTanah.destroy();
    return sendSuccess(res, null, 'Aset Tanah berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAsetTanah,
  getAsetTanahById,
  createAsetTanah,
  updateAsetTanah,
  deleteAsetTanah,
};
