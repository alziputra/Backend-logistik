"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MenuSewa extends Model {
    static associate(models) {
      // define association here
    }
  }
  MenuSewa.init(
    {
      outlet_id: DataTypes.BIGINT,
      kode_outlet: DataTypes.STRING,
      nama_outlet: DataTypes.STRING,
      type_outlet: DataTypes.STRING,
      type_bangunan: DataTypes.STRING,
      jenis_sto: DataTypes.STRING,
      status_gedung: DataTypes.STRING,
      periode_sewa: DataTypes.STRING,
      tgl_kontrak_mulai: DataTypes.DATEONLY,
      tgl_kontrak_berakhir: DataTypes.DATEONLY,
      harga_sewa: DataTypes.BIGINT,
      status: DataTypes.STRING,
      keterangan: DataTypes.TEXT,
      alamat: DataTypes.TEXT,
      kelurahan: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      kab_kota: DataTypes.STRING,
      provinsi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MenuSewa",
      tableName: "menu_sewa",
    }
  );
  return MenuSewa;
};
