"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("menu_sewa", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      outlet_id: {
        type: Sequelize.BIGINT,
      },
      kode_outlet: {
        type: Sequelize.STRING,
      },
      nama_outlet: {
        type: Sequelize.STRING,
      },
      type_outlet: {
        type: Sequelize.STRING,
      },
      type_bangunan: {
        type: Sequelize.STRING,
      },
      jenis_sto: {
        type: Sequelize.STRING,
      },
      status_gedung: {
        type: Sequelize.STRING,
      },
      periode_sewa: {
        type: Sequelize.STRING,
      },
      tgl_kontrak_mulai: {
        type: Sequelize.DATEONLY,
      },
      tgl_kontrak_berakhir: {
        type: Sequelize.DATEONLY,
      },
      harga_sewa: {
        type: Sequelize.BIGINT,
      },
      status: {
        type: Sequelize.STRING,
      },
      keterangan: {
        type: Sequelize.TEXT,
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      kelurahan: {
        type: Sequelize.STRING,
      },
      kecamatan: {
        type: Sequelize.STRING,
      },
      kab_kota: {
        type: Sequelize.STRING,
      },
      provinsi: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("menu_sewa");
  },
};
