import { DataTypes, Model } from "sequelize";
import sequelize from "./index.js";

interface NoticeAttributes {
  id?: number;
  title: string;
  tag: string;
  description: string;
}

class Notice extends Model<NoticeAttributes> {
  public id!: number;
  public title!: string;
  public tag!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    // 관계 설정이 필요한 경우 여기에 추가
  }
}

Notice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "Notice_id",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Notice",
    timestamps: true,
    underscored: true,
  },
);

export default Notice;
