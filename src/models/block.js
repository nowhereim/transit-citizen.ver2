"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Block_user extends Model {
    static associate(models) {
      Block_user.belongsTo(models.User, {
        foreignKey: "request_user",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Block_user.belongsTo(models.User, {
        foreignKey: "block_user",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Block_user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "blockuser_id",
      },
      request_user: DataTypes.INTEGER,
      block_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Block_user",
      timestamps: true,
      underscored: true,
      timezone: "+09:00",
    },
  );
  // Block_user.sequelize.sync({ alter: true });
  return Block_user;
};
