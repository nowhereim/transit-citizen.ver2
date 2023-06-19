import { DataTypes, Model } from "sequelize";
import sequelize from "./index.js";
import gettime from "../utils/kst.js";

interface MatchedlistAttributes {
  id?: number;
  user_id: number;
  matched_user: number;
  roomkey: string;
  chatrequest?: string;
  reputation?: boolean;
  created_at?: Promise<Date>;
}

class Matchedlist extends Model<MatchedlistAttributes> {
  public id!: number;
  public user_id!: number;
  public matched_user!: number;
  public roomkey!: string;
  public chatrequest?: string;
  public reputation?: boolean;
  public created_at!: Promise<Date>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
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
    roomkey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chatrequest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reputation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: gettime(),
    },
  },
  {
    sequelize,
    modelName: "Matchedlist",
    timestamps: true,
    underscored: true,
  },
);
// sequelize.sync({ alter: true });
export default Matchedlist;
