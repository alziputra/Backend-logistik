'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instansi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Instansi.init({
    kode: DataTypes.STRING,
    nama: DataTypes.STRING,
    status: DataTypes.STRING,
    kodeCabang: DataTypes.STRING,
    cabangInduk: DataTypes.STRING,
    clustering: DataTypes.STRING,
    jenis: DataTypes.STRING,
    area: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Instansi',
  });
  return Instansi;
};