import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import models, { sequelize } from ".";

export default interface UserAttributes {
  id?: number;
  account: string;
  password: string;
  nickname: string;
  agreepi: boolean;
  account_type: string;
  gender: string;
  introduction: string;
  age_group: number;
  createdAt?: Date;
  updatedAt?: Date;
  dataValues?: {
    id: number;
    account: string;
    password: string;
    nickname: string;
    agreepi: boolean;
    account_type: string;
    gender: string;
    introduction: string;
    age_group: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  // public id!: number;
  // public account!: string;
  // public password!: string;
  // public nickname!: string;
  // public agreepi!: boolean;
  // public account_type!: string;
  // public gender!: string;
  // public introduction!: string;
  // public age_group!: number;
  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;

  public static associate(models: any) {
    // Image 모델과의 1:N 관계 설정
    User.hasMany(models.Image, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Age_group 모델과의 N:1 관계 설정
    User.belongsTo(models.Agegroup, {
      foreignKey: "age_group",
      targetKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Block_user 모델과의 1:N 관계 설정 (요청한 사용자)
    User.hasMany(models.Block_user, {
      foreignKey: "request_user",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Block_user 모델과의 1:N 관계 설정 (차단된 사용자)
    User.hasMany(models.Block_user, {
      foreignKey: "block_user",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Matchedlist 모델과의 1:N 관계 설정 (사용자)
    User.hasMany(models.Matchedlist, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Matchedlist 모델과의 1:N 관계 설정 (매칭된 사용자)
    User.hasMany(models.Matchedlist, {
      foreignKey: "matched_user",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Report 모델과의 1:N 관계 설정 (신고한 사용자)
    User.hasMany(models.Report, {
      foreignKey: "reporter",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Report 모델과의 1:N 관계 설정 (신고당한 사용자)
    User.hasMany(models.Report, {
      foreignKey: "reported",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.Alarm, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export const UserFactory = (sequelize: Sequelize): typeof User => {
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
  // User.sync({ alter: true });
  return User;
};
