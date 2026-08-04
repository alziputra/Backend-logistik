"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("spk_histories", [
      {
        nomor_spk: "2501/SPK-RNV/001",
        tanggal: "2025-01-15",
        perusahaan: "PT Karya Utama Konstruksi",
        uraian: "Surat Perintah Kerja Renovasi Interior CP Sudirman",
        jumlah: "Rp 175.000.000",
        content: JSON.stringify({
          judul: "SPK Renovasi Interior CP Sudirman",
          lokasi: "CP Sudirman Jakarta Pusat",
          jangkaWaktu: "60 Hari Kerja",
          garansi: "6 Bulan",
        }),
        tipe_spk: "renovasi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nomor_spk: "2503/SPK-LOG/008",
        tanggal: "2025-03-10",
        perusahaan: "PT Era Permata Sejahtera",
        uraian: "Pengadaan Sewa Perangkat IT dan Printer Eco Tank",
        jumlah: "Rp 85.500.000",
        content: JSON.stringify({
          judul: "SPK Pengadaan Perangkat IT",
          jumlahUnit: "15 Unit",
          periodeSewa: "36 Bulan",
        }),
        tipe_spk: "pengadaan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("spk_histories", null, {});
  },
};
