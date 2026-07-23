'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: crypto.randomUUID(),
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: crypto.randomUUID(),
        name: 'Regular User',
        email: 'user@gmail.com',
        password: hashedPassword,
        role: 'user',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: ['admin@gmail.com', 'user@gmail.com'],
    });
  },
};
