'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Printers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      idOutlet: {
        type: Sequelize.STRING
      },
      kondisi: {
        type: Sequelize.STRING
      },
      outlet: {
        type: Sequelize.STRING
      },
      produk: {
        type: Sequelize.STRING
      },
      sn: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      tanggalMulai: {
        type: Sequelize.DATEONLY
      },
      tanggalSelesai: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Printers');
  }
};