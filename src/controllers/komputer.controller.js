const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Komputer } = require('../models');

const KOMPUTER_FIELDS = [
  'cpu', 'deskripsi', 'idOutlet', 'ipAddress', 'kondisi', 'macAddress',
  'os', 'outlet', 'produk', 'ram', 'sn', 'status', 'storage',
  'tanggalMulai', 'tanggalSelesai',
];

const pick = (source, fields) =>
  fields.reduce((acc, field) => {
    if (source[field] !== undefined) acc[field] = source[field];
    return acc;
  }, {});

// GET /api/komputer
const getAllKomputer = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, outlet, status } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) where.produk = { [Op.iLike]: `%${search}%` };
    if (outlet) where.outlet = outlet;
    if (status) where.status = status;

    const { count, rows } = await Komputer.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: {
        komputer: rows,
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

// GET /api/komputer/:id
const getKomputerById = async (req, res, next) => {
  try {
    const komputer = await Komputer.findByPk(req.params.id);
    if (!komputer) {
      return res.status(404).json({ success: false, message: 'Komputer tidak ditemukan' });
    }
    res.json({ success: true, data: { komputer } });
  } catch (error) {
    next(error);
  }
};

// POST /api/komputer
const createKomputer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const komputer = await Komputer.create(pick(req.body, KOMPUTER_FIELDS));
    res.status(201).json({ success: true, message: 'Komputer berhasil ditambahkan', data: { komputer } });
  } catch (error) {
    next(error);
  }
};

// PUT /api/komputer/:id
const updateKomputer = async (req, res, next) => {
  try {
    const komputer = await Komputer.findByPk(req.params.id);
    if (!komputer) {
      return res.status(404).json({ success: false, message: 'Komputer tidak ditemukan' });
    }

    await komputer.update(pick(req.body, KOMPUTER_FIELDS));
    res.json({ success: true, message: 'Komputer berhasil diupdate', data: { komputer } });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/komputer/:id
const deleteKomputer = async (req, res, next) => {
  try {
    const komputer = await Komputer.findByPk(req.params.id);
    if (!komputer) {
      return res.status(404).json({ success: false, message: 'Komputer tidak ditemukan' });
    }

    await komputer.destroy();
    res.json({ success: true, message: 'Komputer berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllKomputer, getKomputerById, createKomputer, updateKomputer, deleteKomputer };
