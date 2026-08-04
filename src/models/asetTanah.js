"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AsetTanah extends Model {
    static associate(models) {
      // define association here
    }
  }
  AsetTanah.init(
    {
      no: DataTypes.INTEGER,
      unit_kerja: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      peruntukan: DataTypes.STRING,
      aset_sap: DataTypes.STRING,
      no_shgb: DataTypes.STRING,
      no_sertifikat: DataTypes.STRING,
      no_sertifikat_gabung: DataTypes.STRING,
      no_imb: DataTypes.STRING,
      nama_pemilik_imb: DataTypes.STRING,
      tgl_shgb_mulai: DataTypes.DATEONLY,
      tgl_shgb_berakhir: DataTypes.DATEONLY,
      tahun_perolehan: DataTypes.INTEGER,
      luas_tanah_m2: DataTypes.DECIMAL(10, 2),
      luas_pagar_m2: DataTypes.DECIMAL(10, 2),
      luas_bangunan_m2: DataTypes.DECIMAL(10, 2),
      status: DataTypes.STRING,
      keterangan: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "AsetTanah",
      tableName: "aset_tanah",
    }
  );
  return AsetTanah;
};
