"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Userdeactivations extends Model {
    static associate(models) {}
  }
  Userdeactivations.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "Userdeactivations_id",
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Userdeactivations",
      timestamps: true,
      underscored: true,
      timezone: "+09:00",
    },
  );
  //   Userdeactivations.sequelize.sync({ alter: true });
  return Userdeactivations;
};
