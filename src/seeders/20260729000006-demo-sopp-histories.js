"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("sopp_histories", [
      {
        nomor_sopp: "SOPP/2025/001",
        tanggal: "2025-01-20",
        tipe_sopp: "sewa",
        dibayarkan_kepada: "PT Landlord Propertindo",
        jumlah: "Rp 450.000.000",
        content: JSON.stringify({
          keterangan: "Pembayaran sewa gedung CP Sudirman Tahun 2025",
          noRekening: "006-12345-789",
          bank: "Bank Mandiri",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nomor_sopp: "SOPP/2025/002",
        tanggal: "2025-02-10",
        tipe_sopp: "pengadaan",
        dibayarkan_kepada: "PT Global Solusindo Kompudata",
        jumlah: "Rp 120.000.000",
        content: JSON.stringify({
          keterangan: "Pembayaran pengadaan komputer desktop kantor",
          noRekening: "112-98765-432",
          bank: "Bank BCA",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sopp_histories", null, {});
  },
};
