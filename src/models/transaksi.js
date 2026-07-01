"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    static associate(models) {
      Transaksi.hasMany(models.TransaksiItem, {
        foreignKey: "transaksiId",
        as: "items",
      });
    }
  }
  Transaksi.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      jenisTransaksi: {
        type: DataTypes.ENUM("Barang Masuk", "Barang Keluar"),
        allowNull: false,
      },
      lokasi: DataTypes.STRING,
      nomorSurat: DataTypes.STRING,
      tanggal: DataTypes.DATEONLY,
      pengirimInstansi: DataTypes.STRING,
      pengirimNama: DataTypes.STRING,
      pengirimJabatan: DataTypes.STRING,
      penerimaInstansi: DataTypes.STRING,
      penerimaNama: DataTypes.STRING,
      penerimaJabatan: DataTypes.STRING,
      mengetahuiNama: DataTypes.STRING,
      mengetahuiJabatan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaksi",
    },
  );
  return Transaksi;
};