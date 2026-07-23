'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    static associate(models) {
      Vendor.hasMany(models.Aset, {
        foreignKey: 'vendorId',
        as: 'asets',
      });
    }
  }
  Vendor.init(
    {
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
      sequelize,
      modelName: 'Vendor',
      tableName: 'Vendors',
      timestamps: true,
    }
  );
  return Vendor;
};
