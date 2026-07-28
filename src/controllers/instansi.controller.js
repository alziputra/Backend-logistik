const { Op } = require('sequelize');
const { Instansi } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

const INSTANSI_FIELDS = ['kode', 'nama'];

// GET /api/instansi
const getAllInstansi = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search } = req.query;

    const where = {};
    if (search) where.nama = { [Op.iLike]: `%${search}%` };

    const { count, rows } = await Instansi.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'instansi', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

// GET /api/instansi/:id
const getInstansiById = async (req, res, next) => {
  try {
    const instansi = await Instansi.findByPk(req.params.id);
    if (!instansi) {
      return sendNotFound(res, 'Instansi tidak ditemukan');
    }
    return sendSuccess(res, { instansi });
  } catch (error) {
    next(error);
  }
};

// POST /api/instansi
const createInstansi = async (req, res, next) => {
  try {
    const instansi = await Instansi.create(pick(req.body, INSTANSI_FIELDS));
    return sendSuccess(res, { instansi }, 'Instansi berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/instansi/:id
const updateInstansi = async (req, res, next) => {
  try {
    const instansi = await Instansi.findByPk(req.params.id);
    if (!instansi) {
      return sendNotFound(res, 'Instansi tidak ditemukan');
    }

    await instansi.update(pick(req.body, INSTANSI_FIELDS));
    return sendSuccess(res, { instansi }, 'Instansi berhasil diupdate');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/instansi/:id
const deleteInstansi = async (req, res, next) => {
  try {
    const instansi = await Instansi.findByPk(req.params.id);
    if (!instansi) {
      return sendNotFound(res, 'Instansi tidak ditemukan');
    }

    await instansi.destroy();
    return sendSuccess(res, null, 'Instansi berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllInstansi, getInstansiById, createInstansi, updateInstansi, deleteInstansi };
