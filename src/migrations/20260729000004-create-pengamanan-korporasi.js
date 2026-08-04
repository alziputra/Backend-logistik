"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pengamanan_korporasi", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      no_urut: {
        type: Sequelize.INTEGER,
      },
      kantor_wilayah: {
        type: Sequelize.STRING,
      },
      kantor_area: {
        type: Sequelize.STRING,
      },
      kantor_cabang: {
        type: Sequelize.STRING,
      },
      kode_unit_kerja: {
        type: Sequelize.STRING,
      },
      nama_unit_kerja: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      vendor: {
        type: Sequelize.STRING,
      },
      jumlah_kamera: {
        type: Sequelize.INTEGER,
      },
      aplikasi: {
        type: Sequelize.STRING,
      },
      nama_aplikasi: {
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
    await queryInterface.dropTable("pengamanan_korporasi");
  },
};
