'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Vendors', [
      {
        nama: 'PT Era Permata Sejahtera',
        no_telp: '021-12345678',
        alamat: 'Jl. Sudirman No. 1, Jakarta Pusat',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: 'PT Prima Optima Jasa',
        no_telp: '021-87654321',
        alamat: 'Jl. Gatot Subroto No. 5, Jakarta Selatan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: 'PT Global Solusindo Kompudata',
        no_telp: '022-11223344',
        alamat: 'Jl. Asia Afrika No. 10, Bandung',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vendors', null, {});
  }
};
