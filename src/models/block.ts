import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export default interface Block_userAttributes {
  id?: number;
  request_user: number;
  block_user: number;
}

interface Block_userCreationAttributes
  extends Optional<Block_userAttributes, "id"> {}

class Block_user extends Model<
  Block_userAttributes,
  Block_userCreationAttributes
> {
  public id!: number;
  public request_user!: number;
  public block_user!: number;

  public static associate(models: any) {
    Block_user.belongsTo(models.User, {
      foreignKey: "request_user",
      targetKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Block_user.belongsTo(models.User, {
      foreignKey: "block_user",
      targetKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export const Block_userFactory = (sequelize: Sequelize): typeof Block_user => {
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
  return Block_user;
};
