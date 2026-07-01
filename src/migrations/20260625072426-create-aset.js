"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Asets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(
          "Sewa Berjalan",
          "Sewa Selesai",
          "Sewa Dibatalkan",
        ),
        allowNull: false,
        defaultValue: "Sewa Berjalan",
      },
      stok: {
        type: Sequelize.INTEGER,
      },
      satuan: {
        type: Sequelize.STRING,
      },
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Vendors",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      no_spk: {
        type: Sequelize.STRING,
      },
      no_pks: {
        type: Sequelize.STRING,
      },
      masa_sewa_bulan: {
        type: Sequelize.INTEGER,
      },
      tanggal_mulai: {
        type: Sequelize.DATEONLY,
      },
      tanggal_selesai: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable("Asets");
  },
};