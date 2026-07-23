const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Aset, Vendor } = require('../models');

const ASET_FIELDS = [
  'nama', 'status', 'stok', 'satuan', 'vendorId',
  'no_spk', 'no_pks', 'masa_sewa_bulan', 'tanggal_mulai', 'tanggal_selesai',
];

const pick = (source, fields) =>
  fields.reduce((acc, field) => {
    if (source[field] !== undefined) acc[field] = source[field];
    return acc;
  }, {});

// GET /api/asets
const getAllAsets = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, status, vendorId } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) where.nama = { [Op.iLike]: `%${search}%` };
    if (status) where.status = status;
    if (vendorId) where.vendorId = vendorId;

    const { count, rows } = await Aset.findAndCountAll({
      where,
      include: [{ model: Vendor, as: 'vendor', attributes: ['id', 'nama'] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: {
        asets: rows,
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

// GET /api/asets/:id
const getAsetById = async (req, res, next) => {
  try {
    const aset = await Aset.findByPk(req.params.id, {
      include: [{ model: Vendor, as: 'vendor', attributes: ['id', 'nama'] }],
    });

    if (!aset) {
      return res.status(404).json({ success: false, message: 'Aset tidak ditemukan' });
    }

    res.json({ success: true, data: { aset } });
  } catch (error) {
    next(error);
  }
};

// POST /api/asets
const createAset = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const vendor = await Vendor.findByPk(req.body.vendorId);
    if (!vendor) {
      return res.status(400).json({ success: false, message: 'Vendor tidak ditemukan' });
    }

    const aset = await Aset.create(pick(req.body, ASET_FIELDS));

    res.status(201).json({ success: true, message: 'Aset berhasil ditambahkan', data: { aset } });
  } catch (error) {
    next(error);
  }
};

// PUT /api/asets/:id
const updateAset = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const aset = await Aset.findByPk(req.params.id);
    if (!aset) {
      return res.status(404).json({ success: false, message: 'Aset tidak ditemukan' });
    }

    if (req.body.vendorId) {
      const vendor = await Vendor.findByPk(req.body.vendorId);
      if (!vendor) {
        return res.status(400).json({ success: false, message: 'Vendor tidak ditemukan' });
      }
    }

    await aset.update(pick(req.body, ASET_FIELDS));

    res.json({ success: true, message: 'Aset berhasil diupdate', data: { aset } });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/asets/:id
const deleteAset = async (req, res, next) => {
  try {
    const aset = await Aset.findByPk(req.params.id);
    if (!aset) {
      return res.status(404).json({ success: false, message: 'Aset tidak ditemukan' });
    }

    await aset.destroy();
    res.json({ success: true, message: 'Aset berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAsets, getAsetById, createAset, updateAset, deleteAset };
