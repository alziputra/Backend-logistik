"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("spk_histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nomor_spk: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tanggal: {
        type: Sequelize.DATEONLY,
      },
      perusahaan: {
        type: Sequelize.STRING,
      },
      uraian: {
        type: Sequelize.TEXT,
      },
      jumlah: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.JSON,
      },
      tipe_spk: {
        type: Sequelize.STRING,
        defaultValue: "renovasi",
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
    await queryInterface.dropTable("spk_histories");
  },
};
