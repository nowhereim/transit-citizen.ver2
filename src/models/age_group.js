"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Age_group extends Model {
    static associate(models) {
      Age_group.hasMany(models.User, {
        foreignKey: "age_group",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Age_group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "age_group_id",
      },
      age_group: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Age_group",
      timestamps: true,
      underscored: true,
      timezone: "+09:00",
    },
  );
  // Age_group.sequelize.sync({ alter: true });
  return Age_group;
};
