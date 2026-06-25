const sequelize = require('../config/sequelize');
const User = require('./User');

// Define associations here
// User.hasMany(Post, { foreignKey: 'userId' });
// Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
};
