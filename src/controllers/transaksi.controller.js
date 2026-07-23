const crypto = require('crypto');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Transaksi, TransaksiItem, sequelize } = require('../models');

const TRANSAKSI_FIELDS = [
  'jenisTransaksi', 'lokasi', 'nomorSurat', 'tanggal',
  'pengirimInstansi', 'pengirimNama', 'pengirimJabatan',
  'penerimaInstansi', 'penerimaNama', 'penerimaJabatan',
  'mengetahuiNama', 'mengetahuiJabatan',
];

const ITEM_FIELDS = ['nama', 'keterangan', 'kuantitas', 'satuan', 'sn', 'outlet'];

const pick = (source, fields) =>
  fields.reduce((acc, field) => {
    if (source[field] !== undefined) acc[field] = source[field];
    return acc;
  }, {});

// GET /api/transaksi
const getAllTransaksi = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, jenisTransaksi, search } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (jenisTransaksi) where.jenisTransaksi = jenisTransaksi;
    if (search) where.nomorSurat = { [Op.iLike]: `%${search}%` };

    const { count, rows } = await Transaksi.findAndCountAll({
      where,
      include: [{ model: TransaksiItem, as: 'items' }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: {
        transaksi: rows,
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

// GET /api/transaksi/:id
const getTransaksiById = async (req, res, next) => {
  try {
    const transaksi = await Transaksi.findByPk(req.params.id, {
      include: [{ model: TransaksiItem, as: 'items' }],
    });

    if (!transaksi) {
      return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' });
    }

    res.json({ success: true, data: { transaksi } });
  } catch (error) {
    next(error);
  }
};

// POST /api/transaksi
// Body: { ...transaksi fields, items: [{ nama, keterangan, kuantitas, satuan, sn, outlet }, ...] }
const createTransaksi = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { items = [] } = req.body;

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

    res.status(201).json({ success: true, message: 'Transaksi berhasil ditambahkan', data: { transaksi: result } });
  } catch (error) {
    next(error);
  }
};

// PUT /api/transaksi/:id
// Updates the transaksi header. If `items` is provided, it fully replaces the existing items.
const updateTransaksi = async (req, res, next) => {
  try {
    const transaksi = await Transaksi.findByPk(req.params.id);
    if (!transaksi) {
      return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' });
    }

    const { items } = req.body;

    const result = await sequelize.transaction(async (t) => {
      await transaksi.update(pick(req.body, TRANSAKSI_FIELDS), { transaction: t });

      if (Array.isArray(items)) {
        await TransaksiItem.destroy({ where: { transaksiId: transaksi.id }, transaction: t });
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
      }

      return Transaksi.findByPk(transaksi.id, {
        include: [{ model: TransaksiItem, as: 'items' }],
        transaction: t,
      });
    });

    res.json({ success: true, message: 'Transaksi berhasil diupdate', data: { transaksi: result } });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/transaksi/:id
const deleteTransaksi = async (req, res, next) => {
  try {
    const transaksi = await Transaksi.findByPk(req.params.id);
    if (!transaksi) {
      return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' });
    }

    // Items are removed automatically via ON DELETE CASCADE (see migration).
    await transaksi.destroy();
    res.json({ success: true, message: 'Transaksi berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTransaksi, getTransaksiById, createTransaksi, updateTransaksi, deleteTransaksi };
