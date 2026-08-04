"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SpkHistory extends Model {
    static associate(models) {
      // define association here
    }
  }
  SpkHistory.init(
    {
      nomor_spk: DataTypes.STRING,
      tanggal: DataTypes.DATEONLY,
      perusahaan: DataTypes.STRING,
      uraian: DataTypes.TEXT,
      jumlah: DataTypes.STRING,
      content: DataTypes.JSON,
      tipe_spk: {
        type: DataTypes.STRING,
        defaultValue: "renovasi",
      },
    },
    {
      sequelize,
      modelName: "SpkHistory",
      tableName: "spk_histories",
    }
  );
  return SpkHistory;
};
