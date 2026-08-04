"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("aset_tanah", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      no: {
        type: Sequelize.INTEGER,
      },
      unit_kerja: {
        type: Sequelize.STRING(100),
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      peruntukan: {
        type: Sequelize.STRING(100),
      },
      aset_sap: {
        type: Sequelize.STRING(50),
      },
      no_shgb: {
        type: Sequelize.STRING(50),
      },
      no_sertifikat: {
        type: Sequelize.STRING(100),
      },
      no_sertifikat_gabung: {
        type: Sequelize.STRING(100),
      },
      no_imb: {
        type: Sequelize.STRING(100),
      },
      nama_pemilik_imb: {
        type: Sequelize.STRING(150),
      },
      tgl_shgb_mulai: {
        type: Sequelize.DATEONLY,
      },
      tgl_shgb_berakhir: {
        type: Sequelize.DATEONLY,
      },
      tahun_perolehan: {
        type: Sequelize.INTEGER,
      },
      luas_tanah_m2: {
        type: Sequelize.DECIMAL(10, 2),
      },
      luas_pagar_m2: {
        type: Sequelize.DECIMAL(10, 2),
      },
      luas_bangunan_m2: {
        type: Sequelize.DECIMAL(10, 2),
      },
      status: {
        type: Sequelize.STRING,
      },
      keterangan: {
        type: Sequelize.TEXT,
      },
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
    await queryInterface.dropTable("aset_tanah");
  },
};
