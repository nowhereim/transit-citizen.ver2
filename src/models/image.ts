import { DataTypes, Model } from "sequelize";
import sequelize from "./index.js";

interface ImageAttributes {
  id?: number;
  user_id: number;
  image_url: string;
  is_primary: boolean;
}

class Image extends Model<ImageAttributes> {
  public id!: number;
  public user_id!: number;
  public image_url!: string;
  public is_primary!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Image.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
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
  },
);

export default Image;
