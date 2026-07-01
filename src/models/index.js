const sequelize = require('../config/sequelize');
const User = require('./User');
const Vendor = require('./Vendor');
const Aset = require('./Aset');

// Define associations here
// User.hasMany(Post, { foreignKey: 'userId' });
// Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Vendor,
  Aset,
};
