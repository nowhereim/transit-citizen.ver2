import { DataTypes, Model } from "sequelize";
import sequelize from "./index.js";

interface AgegroupAttributes {
  id?: number;
  age_group: string;
}

class Agegroup extends Model<AgegroupAttributes> {
  public id!: number;
  public age_group!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Agegroup.hasMany(models.User, {
      foreignKey: "age_group",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

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

export default Agegroup;
