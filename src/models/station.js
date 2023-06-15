"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    static associate(models) {}
  }
  Station.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "Station_id",
      },
      station_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      station_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      line_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Station",
      timestamps: true,
      underscored: true,
      timezone: "+09:00",
    },
  );
  //   Station.sequelize.sync({ alter: true });
  return Station;
};
