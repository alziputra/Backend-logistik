"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SoppHistory extends Model {
    static associate(models) {
      // define association here
    }
  }
  SoppHistory.init(
    {
      nomor_sopp: DataTypes.STRING,
      tanggal: DataTypes.DATEONLY,
      tipe_sopp: DataTypes.STRING,
      dibayarkan_kepada: DataTypes.STRING,
      jumlah: DataTypes.STRING,
      content: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "SoppHistory",
      tableName: "sopp_histories",
    }
  );
  return SoppHistory;
};
