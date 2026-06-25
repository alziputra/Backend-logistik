'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Ambil id vendor yang sudah di-seed
    const vendors = await queryInterface.sequelize.query(
      `SELECT id, nama FROM "Vendors" ORDER BY id ASC`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
 
    const vendor1 = vendors[0].id; // PT Era Permata Sejahtera
    const vendor2 = vendors[1].id; // PT Pesona Optima Jasa
    const vendor3 = vendors[2].id; // PT Global Solusindo Kompudata
 
    await queryInterface.bulkInsert('Asets', [
      {
        nama: 'EPSON L4261 ECO TANK',
        jenis_aset: 'Printer',
        status: 'Sewa Berjalan',
        stok: 0,
        satuan: 'Unit',
        vendorId: vendor1,
        no_spk: '2503/00108.04/2025',
        no_pks: '',
        masa_sewa_bulan: 36,
        tanggal_mulai: '2025-08-10',
        tanggal_selesai: '2028-08-10',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: 'Laptop Dell Latitude 5420',
        jenis_aset: 'Laptop',
        status: 'Sewa Berjalan',
        stok: 5,
        satuan: 'Unit',
        vendorId: vendor2,
        no_spk: '2503/00109.04/2025',
        no_pks: 'PKS/001/2025',
        masa_sewa_bulan: 24,
        tanggal_mulai: '2025-01-01',
        tanggal_selesai: '2027-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: 'Scanner Fujitsu fi-7160',
        jenis_aset: 'Scanner',
        status: 'Sewa Berjalan',
        stok: 2,
        satuan: 'Unit',
        vendorId: vendor2,
        no_spk: '2503/00110.04/2025',
        no_pks: 'PKS/002/2025',
        masa_sewa_bulan: 12,
        tanggal_mulai: '2025-03-01',
        tanggal_selesai: '2026-03-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: 'UPS APC 1000VA',
        jenis_aset: 'UPS',
        status: 'Sewa Selesai',
        stok: 0,
        satuan: 'Unit',
        vendorId: vendor3,
        no_spk: '2402/00055.04/2024',
        no_pks: 'PKS/010/2024',
        masa_sewa_bulan: 12,
        tanggal_mulai: '2024-01-01',
        tanggal_selesai: '2025-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: 'AC Daikin 1.5 PK',
        jenis_aset: 'AC',
        status: 'Sewa Berjalan',
        stok: 3,
        satuan: 'Unit',
        vendorId: vendor3,
        no_spk: '2503/00120.04/2025',
        no_pks: '',
        masa_sewa_bulan: 36,
        tanggal_mulai: '2025-06-01',
        tanggal_selesai: '2028-06-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
