"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("activity_logs", [
      {
        user_email: "admin@pegadaian.co.id",
        action: "CREATE",
        module: "Aset Tanah",
        details: "Menambahkan data aset tanah baru Kanwil VIII Jakarta 1",
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_email: "logistik@pegadaian.co.id",
        action: "UPDATE",
        module: "Menu Sewa",
        details: "Memperbarui status sewa gedung CP Sudirman menjadi Sewa Berjalan",
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_email: "admin@pegadaian.co.id",
        action: "CREATE",
        module: "Renovasi",
        details: "Membuat pengajuan renovasi interior CP Sudirman",
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("activity_logs", null, {});
  },
};
