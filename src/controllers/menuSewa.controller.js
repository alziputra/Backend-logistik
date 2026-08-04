const { Op } = require('sequelize');
const { MenuSewa } = require('../models');
const { pick, getPaginationParams } = require('../utils/helpers');
const { sendSuccess, sendPaginated, sendNotFound } = require('../utils/response.util');

const MENU_SEWA_FIELDS = [
  'outlet_id', 'kode_outlet', 'nama_outlet', 'type_outlet',
  'type_bangunan', 'jenis_sto', 'status_gedung', 'periode_sewa',
  'tgl_kontrak_mulai', 'tgl_kontrak_berakhir', 'harga_sewa',
  'status', 'keterangan', 'alamat', 'kelurahan', 'kecamatan',
  'kab_kota', 'provinsi',
];

const getAllMenuSewa = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);
    const { search, status, status_gedung } = req.query;

    const where = {};
    if (search) {
      where[Op.or] = [
        { nama_outlet: { [Op.iLike]: `%${search}%` } },
        { kode_outlet: { [Op.iLike]: `%${search}%` } },
        { alamat: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (status) where.status = status;
    if (status_gedung) where.status_gedung = status_gedung;

    const { count, rows } = await MenuSewa.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return sendPaginated(res, 'menu_sewa', rows, count, page, limit);
  } catch (error) {
    next(error);
  }
};

const getMenuSewaById = async (req, res, next) => {
  try {
    const menuSewa = await MenuSewa.findByPk(req.params.id);
    if (!menuSewa) {
      return sendNotFound(res, 'Data Menu Sewa tidak ditemukan');
    }
    return sendSuccess(res, { menuSewa });
  } catch (error) {
    next(error);
  }
};

const createMenuSewa = async (req, res, next) => {
  try {
    const payload = pick(req.body, MENU_SEWA_FIELDS);
    const menuSewa = await MenuSewa.create(payload);
    return sendSuccess(res, { menuSewa }, 'Data Menu Sewa berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

const updateMenuSewa = async (req, res, next) => {
  try {
    const menuSewa = await MenuSewa.findByPk(req.params.id);
    if (!menuSewa) {
      return sendNotFound(res, 'Data Menu Sewa tidak ditemukan');
    }
    const payload = pick(req.body, MENU_SEWA_FIELDS);
    await menuSewa.update(payload);
    return sendSuccess(res, { menuSewa }, 'Data Menu Sewa berhasil diupdate');
  } catch (error) {
    next(error);
  }
};

const deleteMenuSewa = async (req, res, next) => {
  try {
    const menuSewa = await MenuSewa.findByPk(req.params.id);
    if (!menuSewa) {
      return sendNotFound(res, 'Data Menu Sewa tidak ditemukan');
    }
    await menuSewa.destroy();
    return sendSuccess(res, null, 'Data Menu Sewa berhasil dihapus');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMenuSewa,
  getMenuSewaById,
  createMenuSewa,
  updateMenuSewa,
  deleteMenuSewa,
};
