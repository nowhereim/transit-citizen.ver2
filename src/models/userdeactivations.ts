import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export default interface UserdeactivationsAttributes {
  id?: number;
  nickname: string;
  reason: string;
}

interface UserdeactivationsCreationAttributes
  extends Optional<UserdeactivationsAttributes, "id"> {}

class Userdeactivations extends Model<
  UserdeactivationsAttributes,
  UserdeactivationsCreationAttributes
> {
  // public id!: number;
  // public nickname!: string;
  // public reason!: string;
  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;

  public static associate(models: any) {
    // Define associations here
  }
}

export const UserdeactivationsFactory = (
  sequelize: Sequelize,
): typeof Userdeactivations => {
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
  return Userdeactivations;
};
