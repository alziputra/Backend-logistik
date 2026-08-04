"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("menu_sewa", [
      {
        outlet_id: 101,
        kode_outlet: "CP-SDR-01",
        nama_outlet: "CP Sudirman",
        type_outlet: "Cabang Utama",
        type_bangunan: "Ruko 3 Lantai",
        jenis_sto: "Sewa Gedung",
        status_gedung: "Sewa Berjalan",
        periode_sewa: "3 Tahun",
        tgl_kontrak_mulai: "2024-01-01",
        tgl_kontrak_berakhir: "2027-01-01",
        harga_sewa: 450000000,
        status: "Aktif",
        keterangan: "Sewa gedung operasional cabang utama",
        alamat: "Jl. Jendral Sudirman No. 88",
        kelurahan: "Karet Tengsin",
        kecamatan: "Tanah Abang",
        kab_kota: "Jakarta Pusat",
        provinsi: "DKI Jakarta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        outlet_id: 102,
        kode_outlet: "UPC-KBY-02",
        nama_outlet: "UPC Kebayoran",
        type_outlet: "Unit Pelayanan",
        type_bangunan: "Ruko 2 Lantai",
        jenis_sto: "Sewa Gedung",
        status_gedung: "Sewa Berjalan",
        periode_sewa: "2 Tahun",
        tgl_kontrak_mulai: "2025-02-15",
        tgl_kontrak_berakhir: "2027-02-15",
        harga_sewa: 220000000,
        status: "Aktif",
        keterangan: "Sewa ruko unit pelayanan cabang",
        alamat: "Jl. Kyai Maja No. 14",
        kelurahan: "Kramat Pela",
        kecamatan: "Kebayoran Baru",
        kab_kota: "Jakarta Selatan",
        provinsi: "DKI Jakarta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("menu_sewa", null, {});
  },
};
