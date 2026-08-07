'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Instansis', 'status', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Instansis', 'kodeCabang', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Instansis', 'cabangInduk', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Instansis', 'clustering', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Instansis', 'jenis', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Instansis', 'area', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Instansis', 'status');
    await queryInterface.removeColumn('Instansis', 'kodeCabang');
    await queryInterface.removeColumn('Instansis', 'cabangInduk');
    await queryInterface.removeColumn('Instansis', 'clustering');
    await queryInterface.removeColumn('Instansis', 'jenis');
    await queryInterface.removeColumn('Instansis', 'area');
  }
};
