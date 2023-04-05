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
      // email: DataTypes.STRING,
      account: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      agreepi: DataTypes.BOOLEAN,
      account_type: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      introduction: DataTypes.STRING,
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
  // User.sequelize.sync({ force: true });
  return User;
};
