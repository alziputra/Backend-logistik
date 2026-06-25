"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Aset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Aset.init(
    {
      nama: DataTypes.STRING,
      jenis_aset: DataTypes.STRING,
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
      vendorId: DataTypes.UUID,
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
