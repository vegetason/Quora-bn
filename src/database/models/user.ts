import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { db, DbInterface } from ".";

const Profile=db.Profile;

export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
}

export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  userRole: UserRole;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "userRole" > {}

const UserModel = (sequelize: Sequelize, DataTypes: typeof import("sequelize").DataTypes) => {
  class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: string;
    declare username: string;
    declare email: string;
    declare password: string;
    declare userRole: UserRole;

    static associate(models: DbInterface) {
      // A user can follow many users
      User.belongsToMany(models.User, {
        through: models.Follow,
        as: "following",
        foreignKey: "followerId",
        otherKey: "followedId"
      });
      
      // A user can be followed by many users
      User.belongsToMany(models.User, {
        through: models.Follow,
        as: "followers",
        foreignKey: "followedId",
        otherKey: "followerId"
      });
    }
    
  }

  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userRole: {
        type: DataTypes.ENUM("user", "moderator", "admin"),
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
    }
  );

  return User;
};

export default UserModel;
