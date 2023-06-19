import { DataTypes, Model } from "sequelize";
import sequelize from "./index.js";

interface Block_userAttributes {
  id?: number;
  request_user: number;
  block_user: number;
}

export class Block_user extends Model<Block_userAttributes> {
  public id!: number;
  public request_user!: number;
  public block_user!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Block_user.belongsTo(models.Users, {
      foreignKey: "request_user",
      targetKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Block_user.belongsTo(models.Users, {
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
      field: "Block_user_id",
    },
    request_user: DataTypes.INTEGER,
    block_user: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Block_user",
    timestamps: true,
    underscored: true,
  },
);

export default Block_user;
