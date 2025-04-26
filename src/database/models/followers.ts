import { DataTypes, Model, Sequelize } from "sequelize";
import { db } from ".";

export interface FollowAttributes {
  id: string;
  followerId: string;
  followedId: string;
}

const FollowModel = (sequelize: Sequelize, DataTypes: typeof import("sequelize").DataTypes) => {
  class Follow extends Model<FollowAttributes> implements FollowAttributes {
    declare id: string;
    declare followerId: string;
    declare followedId: string;
  }

  Follow.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      followerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      followedId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      }
    },
    {
      sequelize,
      modelName: "Follow",
      tableName: "Follows",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["followerId", "followedId"]
        },
        {
          fields: ["followedId"]
        },
        {
          fields: ["followerId"]
        }
      ]
    }
  );

  return Follow;
};

export default FollowModel;