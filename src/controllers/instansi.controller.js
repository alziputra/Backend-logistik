const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Instansi } = require('../models');

const pick = (source, fields) =>
  fields.reduce((acc, field) => {
    if (source[field] !== undefined) acc[field] = source[field];
    return acc;
  }, {});

// GET /api/instansi
const getAllInstansi = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) where.nama = { [Op.iLike]: `%${search}%` };

    const { count, rows } = await Instansi.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: {
        instansi: rows,
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

// GET /api/instansi/:id
const getInstansiById = async (req, res, next) => {
  try {
    const instansi = await Instansi.findByPk(req.params.id);
    if (!instansi) {
      return res.status(404).json({ success: false, message: 'Instansi tidak ditemukan' });
    }
    res.json({ success: true, data: { instansi } });
  } catch (error) {
    next(error);
  }
};

// POST /api/instansi
const createInstansi = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const instansi = await Instansi.create(pick(req.body, ['kode', 'nama']));

    res.status(201).json({ success: true, message: 'Instansi berhasil ditambahkan', data: { instansi } });
  } catch (error) {
    next(error);
  }
};

// PUT /api/instansi/:id
const updateInstansi = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const instansi = await Instansi.findByPk(req.params.id);
    if (!instansi) {
      return res.status(404).json({ success: false, message: 'Instansi tidak ditemukan' });
    }

    await instansi.update(pick(req.body, ['kode', 'nama']));

    res.json({ success: true, message: 'Instansi berhasil diupdate', data: { instansi } });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/instansi/:id
const deleteInstansi = async (req, res, next) => {
  try {
    const instansi = await Instansi.findByPk(req.params.id);
    if (!instansi) {
      return res.status(404).json({ success: false, message: 'Instansi tidak ditemukan' });
    }

    await instansi.destroy();
    res.json({ success: true, message: 'Instansi berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllInstansi, getInstansiById, createInstansi, updateInstansi, deleteInstansi };
