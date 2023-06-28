import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import models, { sequelize } from ".";

export default interface AlarmAttributes {
  id?: number;
  description: string;
  user_id: number;
  public: boolean;
  dataValues?: any;
}

interface AlarmCreationAttributes extends Optional<AlarmAttributes, "id"> {}

class Alarm extends Model<AlarmAttributes, AlarmCreationAttributes> {
  public static associate(models: any) {
    // 관계 설정이 필요한 경우 여기에 추가
    Alarm.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export const AlarmFactory = (sequelize: Sequelize): typeof Alarm => {
  Alarm.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "alarm_id",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Alarm",
      timestamps: true,
      underscored: true,
    },
  );
  //   Alarm.sync({ alter: true });

  return Alarm;
};
