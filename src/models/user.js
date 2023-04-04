"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.belongsToMany(models.Basic_constellation, {
      //   through: "user_basic_constellation",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Basic_education, {
      //   through: "user_basic_education",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Basic_contact_style, {
      //   through: "user_basic_contact_style",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Basic_covid_vaccine, {
      //   through: "user_basic_covid_vaccine",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Basic_dating_style, {
      //   through: "user_basic_dating_style",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Basic_family_plan, {
      //   through: "user_basic_family_plan",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Basic_mbti, { through: "user_basic_mbti" });
      // User.belongsToMany(models.Lifestyle_drinking_habit, {
      //   through: "user_lifestyle_drinking_habit",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Lifestyle_exercise_preference, {
      //   through: "user_lifestyle_exercise_preference",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Lifestyle_smoking_habit, {
      //   through: "user_lifestyle_smoking_habit",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Lifestyle_meal_preference, {
      //   through: "user_lifestyle_meal_preference",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Lifestyle_pet_preference, {
      //   through: "user_lifestyle_pet_preference",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Lifestyle_sleep_habit, {
      //   through: "user_lifestyle_sleep_habit",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Lifestyle_social_media_preference, {
      //   through: "user_lifestyle_social_media",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.belongsToMany(models.Interest_tags, {
      //   through: "user_lifestyle_interest_tags",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.hasMany(models.Like, {
      //   foreignKey: "userLiking",
      //   sourceKey: "id",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.hasMany(models.Like, {
      //   foreignKey: "userLiked",
      //   sourceKey: "id",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.hasMany(models.Wait, {
      //   foreignKey: "requester",
      //   sourceKey: "id",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.hasMany(models.Wait, {
      //   foreignKey: "waiter",
      //   sourceKey: "id",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.hasMany(models.Blockuser, {
      //   foreignKey: "requester",
      //   sourceKey: "id",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // User.hasMany(models.Blockuser, {
      //   foreignKey: "blockuser",
      //   sourceKey: "id",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });

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
