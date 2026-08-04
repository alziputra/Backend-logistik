"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Renovasi extends Model {
    static associate(models) {
      // define association here
    }
  }
  Renovasi.init(
    {
      no_memo: DataTypes.STRING,
      tgl_memo: DataTypes.DATEONLY,
      nama_pekerjaan: DataTypes.STRING,
      nilai_pembayaran: DataTypes.DECIMAL(10, 4),
      nama_outlet: DataTypes.STRING,
      cabang: DataTypes.STRING,
      norek: DataTypes.STRING,
      bank: DataTypes.STRING,
      pelaksana_pekerjaan: DataTypes.STRING,
      tgl_tagihan: DataTypes.DATEONLY,
      nilai_spk_pelaksanaan: DataTypes.BIGINT,
      nilai_addendum_spk: DataTypes.BIGINT,
      tgl_spk: DataTypes.DATEONLY,
      no_spk: DataTypes.STRING,
      pajak_pph: DataTypes.BIGINT,
      tgl_bap_bast: DataTypes.DATEONLY,
      tagihan_nilai: DataTypes.BIGINT,
      tagihan_dpp: DataTypes.BIGINT,
      tagihan_ppn: DataTypes.BIGINT,
      tagihan_pph: DataTypes.BIGINT,
      tagihan_retensi: DataTypes.BIGINT,
      tagihan_transfer: DataTypes.BIGINT,
      retensi_nilai: DataTypes.BIGINT,
      retensi_dpp: DataTypes.BIGINT,
      retensi_ppn: DataTypes.BIGINT,
      retensi_pph: DataTypes.BIGINT,
      retensi_transfer: DataTypes.BIGINT,
      status: {
        type: DataTypes.STRING,
        defaultValue: "Dalam Proses",
      },
      deskripsi: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Renovasi",
      tableName: "renovasi",
    }
  );
  return Renovasi;
};
