"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("pengamanan_korporasi", [
      {
        no_urut: 1,
        kantor_wilayah: "Kanwil VIII Jakarta 1",
        kantor_area: "Area Jakarta 1",
        kantor_cabang: "CP Sudirman",
        kode_unit_kerja: "UK-001",
        nama_unit_kerja: "Kantor Cabang Sudirman",
        status: "Aktif / Terpasang",
        vendor: "PT Securitas Indonesia",
        jumlah_kamera: 16,
        aplikasi: "CCTV VMS",
        nama_aplikasi: "HikCentral Enterprise",
        keterangan: "Sistem pengamanan CCTV terintegrasi 24/7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_urut: 2,
        kantor_wilayah: "Kanwil VIII Jakarta 1",
        kantor_area: "Area Bekasi",
        kantor_cabang: "CP Bekasi",
        kode_unit_kerja: "UK-002",
        nama_unit_kerja: "Gudang Logistik Tambun",
        status: "Aktif / Terpasang",
        vendor: "PT Guard Utama Indonesia",
        jumlah_kamera: 32,
        aplikasi: "CCTV & Perimeter Alarm",
        nama_aplikasi: "Dahua Smart VMS",
        keterangan: "Pengamanan perimeter depo aset dan gudang utama",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pengamanan_korporasi", null, {});
  },
};
