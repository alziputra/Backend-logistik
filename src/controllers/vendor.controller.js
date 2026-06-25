const { Vendor } = require('../models');
const { validationResult } = require('express-validator');

// GET /api/vendors
const getAllVendors = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;
    const { Op } = require('sequelize');

    const where = {};
    if (search) {
      where.nama = { [Op.iLike]: `%${search}%` };
    }

    const { count, rows } = await Vendor.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: {
        vendors: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/vendors/:id
const getVendorById = async (req, res, next) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);

    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor tidak ditemukan' });
    }

    res.json({ success: true, data: { vendor } });
  } catch (error) {
    next(error);
  }
};

// POST /api/vendors
const createVendor = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { nama, no_telp, alamat } = req.body;

    const vendor = await Vendor.create({ nama, no_telp, alamat });

    res.status(201).json({
      success: true,
      message: 'Vendor berhasil ditambahkan',
      data: { vendor },
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/vendors/:id
const updateVendor = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor tidak ditemukan' });
    }

    const { nama, no_telp, alamat } = req.body;
    await vendor.update({ nama, no_telp, alamat });

    res.json({
      success: true,
      message: 'Vendor berhasil diupdate',
      data: { vendor },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/vendors/:id
const deleteVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor tidak ditemukan' });
    }

    await vendor.destroy();

    res.json({ success: true, message: 'Vendor berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllVendors, getVendorById, createVendor, updateVendor, deleteVendor };