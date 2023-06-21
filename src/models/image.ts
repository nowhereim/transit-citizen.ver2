import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export default interface ImageAttributes {
  id?: number;
  user_id: number;
  image_url: string;
  is_primary: boolean;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, "id"> {}

class Image extends Model<ImageAttributes, ImageCreationAttributes> {
  public id!: number;
  public user_id!: number;
  public image_url!: string;
  public is_primary!: boolean;

  public static associate(models: any) {
    Image.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export const ImageFactory = (sequelize: Sequelize): typeof Image => {
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
  return Image;
};
