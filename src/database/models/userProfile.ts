import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { db } from ".";

const User=db.User;

export interface ProfileAttributes {
    id:string
    userName:string;
    telephone:string;
    profileImage:string;
    address:string;
    bio:string;
    userId:string
}


const ProfileModel = (sequelize: Sequelize, DataTypes: typeof import("sequelize").DataTypes) => {
  class Profile extends Model<ProfileAttributes> implements ProfileAttributes {
    declare id: string;
    declare userName: string;
    declare telephone: string;
    declare profileImage: string;
    declare bio: string;
    declare address: string;
    declare userId: string;

    static associate(models: any) {
        Profile.belongsTo(User,{foreignKey:"userId"})
    }
  }

  Profile.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull:true,
      },
      telephone:{
        type:DataTypes.STRING,
        allowNull:true,
      }
    },
    {
      sequelize,
      modelName: "Profile",
      tableName: "Profiles",
      timestamps: true,
    }
  );

  return Profile;
};

export default ProfileModel;