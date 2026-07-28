const { Op } = require('sequelize');
const { Printer } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

const PRINTER_FIELDS = [
  'deskripsi', 'idOutlet', 'kondisi', 'outlet', 'produk', 'sn', 'status',
  'tanggalMulai', 'tanggalSelesai',
];

// GET /api/printer
const getAllPrinter = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search, outlet, status } = req.query;

    const where = {};
    if (search) where.produk = { [Op.iLike]: `%${search}%` };
    if (outlet) where.outlet = outlet;
    if (status) where.status = status;

    const { count, rows } = await Printer.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'printer', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

// GET /api/printer/:id
const getPrinterById = async (req, res, next) => {
  try {
    const printer = await Printer.findByPk(req.params.id);
    if (!printer) {
      return sendNotFound(res, 'Printer tidak ditemukan');
    }
    return sendSuccess(res, { printer });
  } catch (error) {
    next(error);
  }
};

// POST /api/printer
const createPrinter = async (req, res, next) => {
  try {
    const printer = await Printer.create(pick(req.body, PRINTER_FIELDS));
    return sendSuccess(res, { printer }, 'Printer berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/printer/:id
const updatePrinter = async (req, res, next) => {
  try {
    const printer = await Printer.findByPk(req.params.id);
    if (!printer) {
      return sendNotFound(res, 'Printer tidak ditemukan');
    }

    await printer.update(pick(req.body, PRINTER_FIELDS));
    return sendSuccess(res, { printer }, 'Printer berhasil diupdate');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/printer/:id
const deletePrinter = async (req, res, next) => {
  try {
    const printer = await Printer.findByPk(req.params.id);
    if (!printer) {
      return sendNotFound(res, 'Printer tidak ditemukan');
    }

    await printer.destroy();
    return sendSuccess(res, null, 'Printer berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPrinter, getPrinterById, createPrinter, updatePrinter, deletePrinter };
