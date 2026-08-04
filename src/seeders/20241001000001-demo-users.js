'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingUsers = await queryInterface.sequelize.query(
      `SELECT email FROM "users" WHERE email IN ('admin@gmail.com', 'user@gmail.com')`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const existingEmails = existingUsers.map((u) => u.email);
    const usersToInsert = [];

    const hashedPassword = await bcrypt.hash('password123', 10);

    if (!existingEmails.includes('admin@gmail.com')) {
      usersToInsert.push({
        id: crypto.randomUUID(),
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    if (!existingEmails.includes('user@gmail.com')) {
      usersToInsert.push({
        id: crypto.randomUUID(),
        name: 'Regular User',
        email: 'user@gmail.com',
        password: hashedPassword,
        role: 'user',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    if (usersToInsert.length > 0) {
      await queryInterface.bulkInsert('users', usersToInsert);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: ['admin@gmail.com', 'user@gmail.com'],
    });
  },
};
