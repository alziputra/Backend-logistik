"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("renovasi", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      no_memo: {
        type: Sequelize.STRING,
      },
      tgl_memo: {
        type: Sequelize.DATEONLY,
      },
      nama_pekerjaan: {
        type: Sequelize.STRING,
      },
      nilai_pembayaran: {
        type: Sequelize.DECIMAL(10, 4),
      },
      nama_outlet: {
        type: Sequelize.STRING,
      },
      cabang: {
        type: Sequelize.STRING,
      },
      norek: {
        type: Sequelize.STRING,
      },
      bank: {
        type: Sequelize.STRING,
      },
      pelaksana_pekerjaan: {
        type: Sequelize.STRING,
      },
      tgl_tagihan: {
        type: Sequelize.DATEONLY,
      },
      nilai_spk_pelaksanaan: {
        type: Sequelize.BIGINT,
      },
      nilai_addendum_spk: {
        type: Sequelize.BIGINT,
      },
      tgl_spk: {
        type: Sequelize.DATEONLY,
      },
      no_spk: {
        type: Sequelize.STRING,
      },
      pajak_pph: {
        type: Sequelize.BIGINT,
      },
      tgl_bap_bast: {
        type: Sequelize.DATEONLY,
      },
      tagihan_nilai: {
        type: Sequelize.BIGINT,
      },
      tagihan_dpp: {
        type: Sequelize.BIGINT,
      },
      tagihan_ppn: {
        type: Sequelize.BIGINT,
      },
      tagihan_pph: {
        type: Sequelize.BIGINT,
      },
      tagihan_retensi: {
        type: Sequelize.BIGINT,
      },
      tagihan_transfer: {
        type: Sequelize.BIGINT,
      },
      retensi_nilai: {
        type: Sequelize.BIGINT,
      },
      retensi_dpp: {
        type: Sequelize.BIGINT,
      },
      retensi_ppn: {
        type: Sequelize.BIGINT,
      },
      retensi_pph: {
        type: Sequelize.BIGINT,
      },
      retensi_transfer: {
        type: Sequelize.BIGINT,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "Dalam Proses",
      },
      deskripsi: {
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
    await queryInterface.dropTable("renovasi");
  },
};
