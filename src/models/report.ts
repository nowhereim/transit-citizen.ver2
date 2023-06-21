import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export default interface ReportAttributes {
  id?: number;
  reporter: number;
  reported: number | null;
  title: string;
  description: string;
  images?: string;
}

interface ReportCreationAttributes extends Optional<ReportAttributes, "id"> {}

class Report extends Model<ReportAttributes, ReportCreationAttributes> {
  public id!: number;
  public reporter!: number;
  public reported!: number | null;
  public title!: string;
  public description!: string;
  public images?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Report.belongsTo(models.User, {
      foreignKey: "reporter",
      targetKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Report.belongsTo(models.User, {
      foreignKey: "reported",
      targetKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export const ReportFactory = (sequelize: Sequelize): typeof Report => {
  Report.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "Report_id",
      },
      reporter: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reported: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Report",
      timestamps: true,
      underscored: true,
    },
  );
  return Report;
};
