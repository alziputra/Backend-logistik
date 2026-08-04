const { Op } = require('sequelize');
const { Aset, Vendor } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound, sendError } = require('../utils/response.util');

const ASET_FIELDS = [
  'nama', 'status', 'stok', 'satuan', 'vendorId',
  'no_spk', 'no_pks', 'masa_sewa_bulan', 'tanggal_mulai', 'tanggal_selesai',
];

const ALLOWED_STATUSES = ['Inventaris', 'Sewa Berjalan', 'Sewa Selesai', 'Sewa Dibatalkan'];

// GET /api/asets
const getAllAsets = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search, status, vendorId } = req.query;

    const todayStr = new Date().toISOString().split('T')[0];
    try {
      await Aset.update(
        { status: 'Sewa Selesai' },
        {
          where: {
            status: 'Sewa Berjalan',
            tanggal_selesai: { [Op.ne]: null, [Op.lt]: todayStr },
          },
        }
      );
    } catch (e) {
      // Ignore if DB update fails
    }

    try {
      await Aset.update(
        { status: 'Inventaris' },
        {
          where: {
            tanggal_mulai: null,
            tanggal_selesai: null,
            status: { [Op.ne]: 'Sewa Dibatalkan' },
          },
        }
      );
    } catch (e) {
      // Ignore if DB update fails
    }

    const where = {};
    if (search) {
      where[Op.or] = [
        { nama: { [Op.iLike]: `%${search}%` } },
        { no_spk: { [Op.iLike]: `%${search}%` } },
        { no_pks: { [Op.iLike]: `%${search}%` } },
      ];
    }
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
    console.error("GET ALL ASETS ERROR:", error);
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

function computeAsetStatusAndMasaSewa(payload) {
  const { vendorId, vendor_nama, tanggal_mulai, tanggal_selesai, status } = payload;
  if (status === 'Sewa Dibatalkan') {
    return {
      computedStatus: 'Sewa Dibatalkan',
      computedMasaSewa: Number(payload.masa_sewa_bulan) || 0,
    };
  }

  let computedMasaSewa = Number(payload.masa_sewa_bulan) || 0;
  if (tanggal_mulai && tanggal_selesai) {
    const d1 = new Date(tanggal_mulai);
    const d2 = new Date(tanggal_selesai);
    if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
      let months = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
      if (d2.getDate() < d1.getDate()) months--;
      computedMasaSewa = months < 0 ? 0 : months;
    }
  }

  const vName = (vendor_nama || "").trim();
  const hasVendor = Boolean(vendorId || (vName !== "" && vName !== "-"));
  const hasDates = Boolean(tanggal_mulai || tanggal_selesai);

  let computedStatus = 'Inventaris';

  if (!hasDates || (!hasVendor && !hasDates)) {
    computedStatus = 'Inventaris';
  } else if (tanggal_selesai) {
    const todayStr = new Date().toISOString().split('T')[0];
    if (todayStr > tanggal_selesai) {
      computedStatus = 'Sewa Selesai';
    } else {
      computedStatus = 'Sewa Berjalan';
    }
  } else if (tanggal_mulai) {
    computedStatus = 'Sewa Berjalan';
  }

  if (!ALLOWED_STATUSES.includes(computedStatus)) {
    computedStatus = 'Inventaris';
  }

  return { computedStatus, computedMasaSewa };
}

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

    const { computedStatus, computedMasaSewa } = computeAsetStatusAndMasaSewa(payload);
    payload.status = computedStatus;
    payload.masa_sewa_bulan = computedMasaSewa;

    try {
      const aset = await Aset.create(payload);
      return sendSuccess(res, { aset }, 'Aset berhasil ditambahkan', 201);
    } catch (dbErr) {
      if (payload.status === 'Inventaris') {
        payload.status = 'Sewa Berjalan';
        const aset = await Aset.create(payload);
        return sendSuccess(res, { aset }, 'Aset berhasil ditambahkan', 201);
      }
      throw dbErr;
    }
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

    const { computedStatus, computedMasaSewa } = computeAsetStatusAndMasaSewa(payload);
    payload.status = computedStatus;
    payload.masa_sewa_bulan = computedMasaSewa;

    try {
      await aset.update(payload);
      return sendSuccess(res, { aset }, 'Aset berhasil diupdate');
    } catch (dbErr) {
      if (payload.status === 'Inventaris') {
        payload.status = 'Sewa Berjalan';
        await aset.update(payload);
        return sendSuccess(res, { aset }, 'Aset berhasil diupdate');
      }
      throw dbErr;
    }
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
