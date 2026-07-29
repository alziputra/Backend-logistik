const { Op } = require('sequelize');
const { Aset, Vendor } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound, sendError } = require('../utils/response.util');

const ASET_FIELDS = [
  'nama', 'status', 'stok', 'satuan', 'vendorId',
  'no_spk', 'no_pks', 'masa_sewa_bulan', 'tanggal_mulai', 'tanggal_selesai',
];

const ALLOWED_STATUSES = ['Sewa Berjalan', 'Sewa Selesai', 'Sewa Dibatalkan'];

// GET /api/asets
const getAllAsets = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search, status, vendorId } = req.query;

    const where = {};
    if (search) where.nama = { [Op.iLike]: `%${search}%` };
    if (status) where.status = status;
    if (vendorId) where.vendorId = vendorId;

    const { count, rows } = await Aset.findAndCountAll({
      where,
      include: [{ model: Vendor, as: 'vendor', attributes: ['id', 'nama'] }],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'asets', rows, count, page, limit);
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
      return sendNotFound(res, 'Aset tidak ditemukan');
    }

    return sendSuccess(res, { aset });
  } catch (error) {
    next(error);
  }
};

// POST /api/asets
const createAset = async (req, res, next) => {
  try {
    let validVendorId = null;
    if (req.body.vendorId && !isNaN(Number(req.body.vendorId))) {
      const vendor = await Vendor.findByPk(req.body.vendorId);
      if (vendor) {
        validVendorId = vendor.id;
      }
    }

    if (!validVendorId) {
      const vendorName = (req.body.vendor_nama || "-").trim() || "-";
      const [v] = await Vendor.findOrCreate({
        where: { nama: vendorName },
        defaults: { no_telp: "-", alamat: "-" }
      });
      validVendorId = v.id;
    }

    const payload = pick(req.body, ASET_FIELDS);
    payload.vendorId = validVendorId;
    if (!payload.tanggal_mulai) payload.tanggal_mulai = null;
    if (!payload.tanggal_selesai) payload.tanggal_selesai = null;
    if (!ALLOWED_STATUSES.includes(payload.status)) {
      payload.status = 'Sewa Berjalan';
    }

    const aset = await Aset.create(payload);

    return sendSuccess(res, { aset }, 'Aset berhasil ditambahkan', 201);
  } catch (error) {
    console.error('CREATE ASET ERROR:', error);
    next(error);
  }
};

// PUT /api/asets/:id
const updateAset = async (req, res, next) => {
  try {
    const aset = await Aset.findByPk(req.params.id);
    if (!aset) {
      return sendNotFound(res, 'Aset tidak ditemukan');
    }

    let validVendorId = null;
    if (req.body.vendorId && !isNaN(Number(req.body.vendorId))) {
      const vendor = await Vendor.findByPk(req.body.vendorId);
      if (vendor) {
        validVendorId = vendor.id;
      }
    }

    if (!validVendorId) {
      const vendorName = (req.body.vendor_nama || "-").trim() || "-";
      const [v] = await Vendor.findOrCreate({
        where: { nama: vendorName },
        defaults: { no_telp: "-", alamat: "-" }
      });
      validVendorId = v.id;
    }

    const payload = pick(req.body, ASET_FIELDS);
    payload.vendorId = validVendorId;
    if (!payload.tanggal_mulai) payload.tanggal_mulai = null;
    if (!payload.tanggal_selesai) payload.tanggal_selesai = null;
    if (!ALLOWED_STATUSES.includes(payload.status)) {
      payload.status = 'Sewa Berjalan';
    }

    await aset.update(payload);

    return sendSuccess(res, { aset }, 'Aset berhasil diupdate');
  } catch (error) {
    console.error('UPDATE ASET ERROR:', error);
    next(error);
  }
};

// DELETE /api/asets/:id
const deleteAset = async (req, res, next) => {
  try {
    const aset = await Aset.findByPk(req.params.id);
    if (!aset) {
      return sendNotFound(res, 'Aset tidak ditemukan');
    }

    await aset.destroy();
    return sendSuccess(res, null, 'Aset berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAsets, getAsetById, createAset, updateAset, deleteAset };
