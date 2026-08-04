"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ActivityLog extends Model {
    static associate(models) {
      // define association here
    }
  }
  ActivityLog.init(
    {
      user_email: DataTypes.STRING,
      action: DataTypes.STRING,
      module: DataTypes.STRING,
      details: DataTypes.TEXT,
      timestamp: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ActivityLog",
      tableName: "activity_logs",
    }
  );
  return ActivityLog;
};
