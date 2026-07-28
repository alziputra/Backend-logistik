const { Op } = require('sequelize');
const { Komputer } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

const KOMPUTER_FIELDS = [
  'cpu', 'deskripsi', 'idOutlet', 'ipAddress', 'kondisi', 'macAddress',
  'os', 'outlet', 'produk', 'ram', 'sn', 'status', 'storage',
  'tanggalMulai', 'tanggalSelesai',
];

// GET /api/komputer
const getAllKomputer = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search, outlet, status } = req.query;

    const where = {};
    if (search) where.produk = { [Op.iLike]: `%${search}%` };
    if (outlet) where.outlet = outlet;
    if (status) where.status = status;

    const { count, rows } = await Komputer.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'komputer', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

// GET /api/komputer/:id
const getKomputerById = async (req, res, next) => {
  try {
    const komputer = await Komputer.findByPk(req.params.id);
    if (!komputer) {
      return sendNotFound(res, 'Komputer tidak ditemukan');
    }
    return sendSuccess(res, { komputer });
  } catch (error) {
    next(error);
  }
};

// POST /api/komputer
const createKomputer = async (req, res, next) => {
  try {
    const komputer = await Komputer.create(pick(req.body, KOMPUTER_FIELDS));
    return sendSuccess(res, { komputer }, 'Komputer berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/komputer/:id
const updateKomputer = async (req, res, next) => {
  try {
    const komputer = await Komputer.findByPk(req.params.id);
    if (!komputer) {
      return sendNotFound(res, 'Komputer tidak ditemukan');
    }

    await komputer.update(pick(req.body, KOMPUTER_FIELDS));
    return sendSuccess(res, { komputer }, 'Komputer berhasil diupdate');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/komputer/:id
const deleteKomputer = async (req, res, next) => {
  try {
    const komputer = await Komputer.findByPk(req.params.id);
    if (!komputer) {
      return sendNotFound(res, 'Komputer tidak ditemukan');
    }

    await komputer.destroy();
    return sendSuccess(res, null, 'Komputer berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllKomputer, getKomputerById, createKomputer, updateKomputer, deleteKomputer };
