"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Ambil semua vendor, petakan berdasarkan nama (bukan urutan/index)
    // supaya tidak salah pasang walau urutan insert vendor berubah
    const vendors = await queryInterface.sequelize.query(
      `SELECT id, nama FROM "Vendors"`,
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    const vendorMap = {};
    vendors.forEach((v) => {
      vendorMap[v.nama] = v.id;
    });

    const requiredVendors = [
      "PT Era Permata Sejahtera",
      "PT Prima Optima Jasa",
      "PT Global Solusindo Kompudata",
    ];

    for (const nama of requiredVendors) {
      if (!vendorMap[nama]) {
        throw new Error(
          `Vendor "${nama}" tidak ditemukan. Jalankan seeder Vendors terlebih dahulu.`,
        );
      }
    }

    await queryInterface.bulkInsert("Asets", [
      {
        nama: "EPSON L4261 ECO TANK",
        status: "Sewa Berjalan",
        stok: 0,
        satuan: "Unit",
        vendorId: vendorMap["PT Era Permata Sejahtera"],
        no_spk: "2503/00108.04/2025",
        no_pks: "",
        masa_sewa_bulan: 36,
        tanggal_mulai: "2025-08-10",
        tanggal_selesai: "2028-08-10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Laptop Dell Latitude 5420",
        status: "Sewa Berjalan",
        stok: 5,
        satuan: "Unit",
        vendorId: vendorMap["PT Prima Optima Jasa"],
        no_spk: "2503/00109.04/2025",
        no_pks: "PKS/001/2025",
        masa_sewa_bulan: 24,
        tanggal_mulai: "2025-01-01",
        tanggal_selesai: "2027-01-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Scanner Fujitsu fi-7160",
        status: "Sewa Berjalan",
        stok: 2,
        satuan: "Unit",
        vendorId: vendorMap["PT Prima Optima Jasa"],
        no_spk: "2503/00110.04/2025",
        no_pks: "PKS/002/2025",
        masa_sewa_bulan: 12,
        tanggal_mulai: "2025-03-01",
        tanggal_selesai: "2026-03-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "UPS APC 1000VA",
        status: "Sewa Selesai",
        stok: 0,
        satuan: "Unit",
        vendorId: vendorMap["PT Global Solusindo Kompudata"],
        no_spk: "2402/00055.04/2024",
        no_pks: "PKS/010/2024",
        masa_sewa_bulan: 12,
        tanggal_mulai: "2024-01-01",
        tanggal_selesai: "2025-01-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "AC Daikin 1.5 PK",
        status: "Sewa Berjalan",
        stok: 3,
        satuan: "Unit",
        vendorId: vendorMap["PT Global Solusindo Kompudata"],
        no_spk: "2503/00120.04/2025",
        no_pks: "",
        masa_sewa_bulan: 36,
        tanggal_mulai: "2025-06-01",
        tanggal_selesai: "2028-06-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Asets", null, {});
  },
};
