"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transaksis", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      jenisTransaksi: {
        type: Sequelize.ENUM("Barang Masuk", "Barang Keluar"),
        allowNull: false,
      },
      lokasi: { type: Sequelize.STRING },
      nomorSurat: { type: Sequelize.STRING },
      tanggal: { type: Sequelize.DATEONLY },
      pengirimInstansi: { type: Sequelize.STRING },
      pengirimNama: { type: Sequelize.STRING },
      pengirimJabatan: { type: Sequelize.STRING },
      penerimaInstansi: { type: Sequelize.STRING },
      penerimaNama: { type: Sequelize.STRING },
      penerimaJabatan: { type: Sequelize.STRING },
      mengetahuiNama: { type: Sequelize.STRING },
      mengetahuiJabatan: { type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transaksis");
  },
};