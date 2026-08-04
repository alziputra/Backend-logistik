"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PengamananKorporasi extends Model {
    static associate(models) {
      // define association here
    }
  }
  PengamananKorporasi.init(
    {
      no_urut: DataTypes.INTEGER,
      kantor_wilayah: DataTypes.STRING,
      kantor_area: DataTypes.STRING,
      kantor_cabang: DataTypes.STRING,
      kode_unit_kerja: DataTypes.STRING,
      nama_unit_kerja: DataTypes.STRING,
      status: DataTypes.STRING,
      vendor: DataTypes.STRING,
      jumlah_kamera: DataTypes.INTEGER,
      aplikasi: DataTypes.STRING,
      nama_aplikasi: DataTypes.STRING,
      keterangan: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "PengamananKorporasi",
      tableName: "pengamanan_korporasi",
    }
  );
  return PengamananKorporasi;
};
