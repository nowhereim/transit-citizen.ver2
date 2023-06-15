"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Matchedlist extends Model {
    static associate(models) {
      Matchedlist.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Matchedlist.belongsTo(models.User, {
        foreignKey: "matched_user",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Matchedlist.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "matchedlist_id",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      matched_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reputation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Matchedlist",
      timestamps: true,
      underscored: true,
      timezone: "+09:00",
    },
  );
  // Matchedlist.sequelize.sync({ alter: true });
  return Matchedlist;
};
