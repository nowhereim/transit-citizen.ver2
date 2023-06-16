"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    static associate(models) {}
  }
  Notice.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "Notice_id",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Notice",
      timestamps: true,
      underscored: true,
      timezone: "+09:00",
    },
  );
  //   Notice.sequelize.sync({ alter: true });
  return Notice;
};
