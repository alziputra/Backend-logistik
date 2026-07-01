'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Komputers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cpu: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      idOutlet: {
        type: Sequelize.STRING
      },
      ipAddress: {
        type: Sequelize.STRING
      },
      kondisi: {
        type: Sequelize.STRING
      },
      macAddress: {
        type: Sequelize.STRING
      },
      os: {
        type: Sequelize.STRING
      },
      outlet: {
        type: Sequelize.STRING
      },
      produk: {
        type: Sequelize.STRING
      },
      ram: {
        type: Sequelize.STRING
      },
      sn: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      storage: {
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
    await queryInterface.dropTable('Komputers');
  }
};