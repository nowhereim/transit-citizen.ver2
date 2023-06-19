import { DataTypes, Model } from "sequelize";
import sequelize from "./index.js";

interface UserdeactivationsAttributes {
  id?: number;
  nickname: string;
  reason: string;
}

class Userdeactivations extends Model<UserdeactivationsAttributes> {
  public id!: number;
  public nickname!: string;
  public reason!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here
  }
}

Userdeactivations.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "Userdeactivations_id",
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Userdeactivations",
    timestamps: true,
    underscored: true,
  },
);

export default Userdeactivations;
