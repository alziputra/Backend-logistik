const crypto = require('crypto');
const { Op } = require('sequelize');
const { Transaksi, TransaksiItem, sequelize } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

const TRANSAKSI_FIELDS = [
  'jenisTransaksi', 'lokasi', 'nomorSurat', 'tanggal',
  'pengirimInstansi', 'pengirimNama', 'pengirimJabatan',
  'penerimaInstansi', 'penerimaNama', 'penerimaJabatan',
  'mengetahuiNama', 'mengetahuiJabatan',
];

const ITEM_FIELDS = ['nama', 'keterangan', 'kuantitas', 'satuan', 'sn', 'outlet'];

// GET /api/transaksi
const getAllTransaksi = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { jenisTransaksi, search } = req.query;

    const where = {};
    if (jenisTransaksi) where.jenisTransaksi = jenisTransaksi;
    if (search) where.nomorSurat = { [Op.iLike]: `%${search}%` };

    const { count, rows } = await Transaksi.findAndCountAll({
      where,
      include: [{ model: TransaksiItem, as: 'items' }],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'transaksi', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

// GET /api/transaksi/:id
const getTransaksiById = async (req, res, next) => {
  try {
    const transaksi = await Transaksi.findByPk(req.params.id, {
      include: [{ model: TransaksiItem, as: 'items' }],
    });

    if (!transaksi) {
      return sendNotFound(res, 'Transaksi tidak ditemukan');
    }

    return sendSuccess(res, { transaksi });
  } catch (error) {
    next(error);
  }
};

// POST /api/transaksi
const createTransaksi = async (req, res, next) => {
  try {
    const { items = [], nomorSurat } = req.body;

    if (nomorSurat) {
      const existing = await Transaksi.findOne({
        where: { nomorSurat: nomorSurat.trim() }
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Nomor Surat "${nomorSurat}" sudah terdaftar dalam sistem!`
        });
      }
    }

    const result = await sequelize.transaction(async (t) => {
      const transaksi = await Transaksi.create(
        { id: `TRX-${crypto.randomUUID()}`, ...pick(req.body, TRANSAKSI_FIELDS) },
        { transaction: t }
      );

      if (items.length > 0) {
        await TransaksiItem.bulkCreate(
          items.map((item) => ({
            id: crypto.randomUUID(),
            transaksiId: transaksi.id,
            ...pick(item, ITEM_FIELDS),
          })),
          { transaction: t }
        );
      }

      return Transaksi.findByPk(transaksi.id, {
        include: [{ model: TransaksiItem, as: 'items' }],
        transaction: t,
      });
    });

    return sendSuccess(res, { transaksi: result }, 'Transaksi berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/transaksi/:id
const updateTransaksi = async (req, res, next) => {
  try {
    const { items, nomorSurat } = req.body;
    const { id } = req.params;

    const transaksi = await Transaksi.findByPk(id);
    if (!transaksi) {
      return sendNotFound(res, 'Transaksi tidak ditemukan');
    }

    if (nomorSurat) {
      const existing = await Transaksi.findOne({
        where: {
          nomorSurat: nomorSurat.trim(),
          id: { [Op.ne]: id }
        }
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Nomor Surat "${nomorSurat}" sudah terdaftar pada transaksi lain!`
        });
      }
    }

    const result = await sequelize.transaction(async (t) => {
      await transaksi.update(pick(req.body, TRANSAKSI_FIELDS), { transaction: t });

      if (Array.isArray(items)) {
        await TransaksiItem.destroy({ where: { transaksiId: id }, transaction: t });

        if (items.length > 0) {
          await TransaksiItem.bulkCreate(
            items.map((item) => ({
              id: crypto.randomUUID(),
              transaksiId: id,
              ...pick(item, ITEM_FIELDS),
            })),
            { transaction: t }
          );
        }
      }

      return Transaksi.findByPk(id, {
        include: [{ model: TransaksiItem, as: 'items' }],
        transaction: t,
      });
    });

    return sendSuccess(res, { transaksi: result }, 'Transaksi berhasil diperbarui');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/transaksi/:id
const deleteTransaksi = async (req, res, next) => {
  try {
    const transaksi = await Transaksi.findByPk(req.params.id);
    if (!transaksi) {
      return sendNotFound(res, 'Transaksi tidak ditemukan');
    }

    await sequelize.transaction(async (t) => {
      await TransaksiItem.destroy({ where: { transaksiId: req.params.id }, transaction: t });
      await transaksi.destroy({ transaction: t });
    });

    return sendSuccess(res, null, 'Transaksi berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTransaksi,
  getTransaksiById,
  createTransaksi,
  updateTransaksi,
  deleteTransaksi,
};
