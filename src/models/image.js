"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "no action",
        onUpdate: "no action",
      });
      // Image.belongsTo(models.User, {
      //   foreignKey: "Imageer",
      //   targetKey: "id",
      //   onDelete: "no action",
      //   onUpdate: "no action",
      // });
    }
  }
  Image.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "image_id",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Image",
      timestamps: true,
      underscored: true,
      timezone: "+09:00",
    },
  );
  return Image;
};
