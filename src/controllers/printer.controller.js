const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Printer } = require('../models');

const PRINTER_FIELDS = [
  'deskripsi', 'idOutlet', 'kondisi', 'outlet', 'produk', 'sn', 'status',
  'tanggalMulai', 'tanggalSelesai',
];

const pick = (source, fields) =>
  fields.reduce((acc, field) => {
    if (source[field] !== undefined) acc[field] = source[field];
    return acc;
  }, {});

// GET /api/printer
const getAllPrinter = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, outlet, status } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) where.produk = { [Op.iLike]: `%${search}%` };
    if (outlet) where.outlet = outlet;
    if (status) where.status = status;

    const { count, rows } = await Printer.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: {
        printer: rows,
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

// GET /api/printer/:id
const getPrinterById = async (req, res, next) => {
  try {
    const printer = await Printer.findByPk(req.params.id);
    if (!printer) {
      return res.status(404).json({ success: false, message: 'Printer tidak ditemukan' });
    }
    res.json({ success: true, data: { printer } });
  } catch (error) {
    next(error);
  }
};

// POST /api/printer
const createPrinter = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const printer = await Printer.create(pick(req.body, PRINTER_FIELDS));
    res.status(201).json({ success: true, message: 'Printer berhasil ditambahkan', data: { printer } });
  } catch (error) {
    next(error);
  }
};

// PUT /api/printer/:id
const updatePrinter = async (req, res, next) => {
  try {
    const printer = await Printer.findByPk(req.params.id);
    if (!printer) {
      return res.status(404).json({ success: false, message: 'Printer tidak ditemukan' });
    }

    await printer.update(pick(req.body, PRINTER_FIELDS));
    res.json({ success: true, message: 'Printer berhasil diupdate', data: { printer } });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/printer/:id
const deletePrinter = async (req, res, next) => {
  try {
    const printer = await Printer.findByPk(req.params.id);
    if (!printer) {
      return res.status(404).json({ success: false, message: 'Printer tidak ditemukan' });
    }

    await printer.destroy();
    res.json({ success: true, message: 'Printer berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPrinter, getPrinterById, createPrinter, updatePrinter, deletePrinter };
