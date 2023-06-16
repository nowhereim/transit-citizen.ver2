"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      Report.belongsTo(models.User, {
        foreignKey: "reporter",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Report.belongsTo(models.User, {
        foreignKey: "reported",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Report.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "Report_id",
      },
      reporter: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reported: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Report",
      timestamps: true,
      underscored: true,
      timezone: "+09:00",
    },
  );
  // Report.sequelize.sync({ alter: true });
  return Report;
};
