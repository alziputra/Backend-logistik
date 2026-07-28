const { Op } = require('sequelize');
const { Vendor } = require('../models');
const { getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

// GET /api/vendors
const getAllVendors = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search } = req.query;

    const where = {};
    if (search) {
      where.nama = { [Op.iLike]: `%${search}%` };
    }

    const { count, rows } = await Vendor.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'vendors', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

// GET /api/vendors/:id
const getVendorById = async (req, res, next) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);

    if (!vendor) {
      return sendNotFound(res, 'Vendor tidak ditemukan');
    }

    return sendSuccess(res, { vendor });
  } catch (error) {
    next(error);
  }
};

// POST /api/vendors
const createVendor = async (req, res, next) => {
  try {
    const { nama, no_telp, alamat } = req.body;
    const vendor = await Vendor.create({ nama, no_telp, alamat });

    return sendSuccess(res, { vendor }, 'Vendor berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/vendors/:id
const updateVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) {
      return sendNotFound(res, 'Vendor tidak ditemukan');
    }

    const { nama, no_telp, alamat } = req.body;
    await vendor.update({ nama, no_telp, alamat });

    return sendSuccess(res, { vendor }, 'Vendor berhasil diupdate');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/vendors/:id
const deleteVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) {
      return sendNotFound(res, 'Vendor tidak ditemukan');
    }

    await vendor.destroy();
    return sendSuccess(res, null, 'Vendor berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllVendors, getVendorById, createVendor, updateVendor, deleteVendor };