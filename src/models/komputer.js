'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Komputer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Komputer.init({
    cpu: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    idOutlet: DataTypes.STRING,
    ipAddress: DataTypes.STRING,
    kondisi: DataTypes.STRING,
    macAddress: DataTypes.STRING,
    os: DataTypes.STRING,
    outlet: DataTypes.STRING,
    produk: DataTypes.STRING,
    ram: DataTypes.STRING,
    sn: DataTypes.STRING,
    status: DataTypes.STRING,
    storage: DataTypes.STRING,
    tanggalMulai: DataTypes.DATEONLY,
    tanggalSelesai: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Komputer',
  });
  return Komputer;
};