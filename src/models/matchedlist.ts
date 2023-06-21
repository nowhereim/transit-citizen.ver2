import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import gettime from "../utils/kst.js";

export default interface MatchedlistAttributes {
  id?: number;
  user_id: number;
  matched_user: number;
  roomkey: string;
  chatrequest?: string;
  reputation?: boolean;
  created_at?: Promise<Date>;
}

interface MatchedlistCreationAttributes
  extends Optional<MatchedlistAttributes, "id"> {}

class Matchedlist extends Model<
  MatchedlistAttributes,
  MatchedlistCreationAttributes
> {
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

export const MatchedlistFactory = (
  sequelize: Sequelize,
): typeof Matchedlist => {
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
  return Matchedlist;
};
