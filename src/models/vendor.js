const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Vendor = sequelize.define(
  'Vendor',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Nama vendor wajib diisi' },
      },
    },
    no_telp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'No. telepon wajib diisi' },
      },
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Alamat wajib diisi' },
      },
    },
  },
  {
    tableName: 'Vendors',
    timestamps: true,
  }
);

module.exports = Vendor;
