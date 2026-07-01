"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransaksiItem extends Model {
    static associate(models) {
      TransaksiItem.belongsTo(models.Transaksi, {
        foreignKey: "transaksiId",
        as: "transaksi",
      });
    }
  }
  TransaksiItem.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      transaksiId: DataTypes.STRING,
      nama: DataTypes.STRING,
      keterangan: DataTypes.STRING,
      kuantitas: DataTypes.INTEGER,
      satuan: DataTypes.STRING,
      sn: DataTypes.STRING,
      outlet: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TransaksiItem",
    },
  );
  return TransaksiItem;
};