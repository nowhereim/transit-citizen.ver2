import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export default interface AgegroupAttributes {
  id?: number;
  age_group: string;
}

interface AgegroupCreationAttributes
  extends Optional<AgegroupAttributes, "id"> {}

class Agegroup extends Model<AgegroupAttributes, AgegroupCreationAttributes> {
  public id!: number;
  public age_group!: string;

  public static associate(models: any) {
    Agegroup.hasMany(models.User, {
      foreignKey: "age_group",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export const AgegroupFactory = (sequelize: Sequelize): typeof Agegroup => {
  Agegroup.init(
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
      modelName: "Agegroup",
      timestamps: true,
      underscored: true,
    },
  );
  return Agegroup;
};
