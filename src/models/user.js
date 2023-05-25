"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Image, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.belongsTo(models.Age_group, {
        foreignKey: "age_group",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.hasMany(models.Block_user, {
        foreignKey: "request_user",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.hasMany(models.Block_user, {
        foreignKey: "block_user",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.hasMany(models.Matchedlist, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.hasMany(models.Matchedlist, {
        foreignKey: "matched_user",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "user_id",
      },
      account: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      agreepi: DataTypes.BOOLEAN,
      account_type: DataTypes.STRING,
      gender: DataTypes.STRING,
      introduction: DataTypes.STRING,
      age_group: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
    },
  );
  // User.sequelize.sync({ alter: true });
  return User;
};
