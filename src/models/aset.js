"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Aset extends Model {
    static associate(models) {
      Aset.belongsTo(models.Vendor, {
        foreignKey: "vendorId",
        as: "vendor",
      });
    }
  }
  Aset.init(
    {
      nama: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM(
          "Sewa Berjalan",
          "Sewa Selesai",
          "Sewa Dibatalkan",
        ),
        allowNull: false,
        defaultValue: "Sewa Berjalan",
      },
      stok: DataTypes.INTEGER,
      satuan: DataTypes.STRING,
      vendorId: DataTypes.INTEGER,
      no_spk: DataTypes.STRING,
      no_pks: DataTypes.STRING,
      masa_sewa_bulan: DataTypes.INTEGER,
      tanggal_mulai: DataTypes.DATEONLY,
      tanggal_selesai: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Aset",
    },
  );
  return Aset;
};