import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export default interface StationAttributes {
  id?: number;
  station_name: string;
  station_code: string;
  line_number: string;
  dataValues?: any;
}

interface StationCreationAttributes extends Optional<StationAttributes, "id"> {}

class Station extends Model<StationAttributes, StationCreationAttributes> {
  public id!: number;
  public station_name!: string;
  public station_code!: string;
  public line_number!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    // 관계 설정이 필요한 경우 여기에 추가
  }
}

export const StationFactory = (sequelize: Sequelize): typeof Station => {
  Station.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "Station_id",
      },
      station_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      station_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      line_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Station",
      timestamps: true,
      underscored: true,
    },
  );
  return Station;
};
