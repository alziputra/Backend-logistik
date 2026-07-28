const { Op } = require('sequelize');
const { Aset, Vendor } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound, sendError } = require('../utils/response.util');

const ASET_FIELDS = [
  'nama', 'status', 'stok', 'satuan', 'vendorId',
  'no_spk', 'no_pks', 'masa_sewa_bulan', 'tanggal_mulai', 'tanggal_selesai',
];

// GET /api/asets
const getAllAsets = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search, status, vendorId } = req.query;

    const where = {};
    if (search) where.nama = { [Op.iLike]: `%${search}%` };
    if (status) where.status = status;
    if (vendorId) where.vendorId = vendorId;

    const { count, rows } = await Aset.findAndCountAll({
      where,
      include: [{ model: Vendor, as: 'vendor', attributes: ['id', 'nama'] }],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'asets', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

// GET /api/asets/:id
const getAsetById = async (req, res, next) => {
  try {
    const aset = await Aset.findByPk(req.params.id, {
      include: [{ model: Vendor, as: 'vendor', attributes: ['id', 'nama'] }],
    });

    if (!aset) {
      return sendNotFound(res, 'Aset tidak ditemukan');
    }

    return sendSuccess(res, { aset });
  } catch (error) {
    next(error);
  }
};

// POST /api/asets
const createAset = async (req, res, next) => {
  try {
    const vendor = await Vendor.findByPk(req.body.vendorId);
    if (!vendor) {
      return sendError(res, 'Vendor tidak ditemukan', 400);
    }

    const aset = await Aset.create(pick(req.body, ASET_FIELDS));

    return sendSuccess(res, { aset }, 'Aset berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/asets/:id
const updateAset = async (req, res, next) => {
  try {
    const aset = await Aset.findByPk(req.params.id);
    if (!aset) {
      return sendNotFound(res, 'Aset tidak ditemukan');
    }

    if (req.body.vendorId) {
      const vendor = await Vendor.findByPk(req.body.vendorId);
      if (!vendor) {
        return sendError(res, 'Vendor tidak ditemukan', 400);
      }
    }

    await aset.update(pick(req.body, ASET_FIELDS));

    return sendSuccess(res, { aset }, 'Aset berhasil diupdate');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/asets/:id
const deleteAset = async (req, res, next) => {
  try {
    const aset = await Aset.findByPk(req.params.id);
    if (!aset) {
      return sendNotFound(res, 'Aset tidak ditemukan');
    }

    await aset.destroy();
    return sendSuccess(res, null, 'Aset berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAsets, getAsetById, createAset, updateAset, deleteAset };
