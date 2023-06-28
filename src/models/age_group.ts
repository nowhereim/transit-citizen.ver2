import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export default interface Age_groupAttributes {
  id?: number;
  age_group: string;
}

interface Age_groupCreationAttributes
  extends Optional<Age_groupAttributes, "id"> {}

class Age_group extends Model<
  Age_groupAttributes,
  Age_groupCreationAttributes
> {
  // public id!: number;
  // public age_group!: string;

  public static associate(models: any) {
    Age_group.hasMany(models.User, {
      foreignKey: "age_group",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export const Age_groupFactory = (sequelize: Sequelize): typeof Age_group => {
  Age_group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "age_group_id",
      },
      age_group: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Age_group",
      timestamps: true,
      underscored: true,
    },
  );
  return Age_group;
};
