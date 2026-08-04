'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const existingVendors = await queryInterface.sequelize.query(
      `SELECT nama FROM "Vendors"`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const existingNames = existingVendors.map((v) => v.nama);
    const vendorsToInsert = [];

    const candidates = [
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
    ];

    candidates.forEach((cand) => {
      if (!existingNames.includes(cand.nama)) {
        vendorsToInsert.push(cand);
      }
    });

    if (vendorsToInsert.length > 0) {
      await queryInterface.bulkInsert('Vendors', vendorsToInsert);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vendors', null, {});
  }
};
