import {
    DataTypes,
    Model,
    Optional,
    Sequelize,
  } from 'sequelize'
  
  export enum UserRole {
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    USER = 'user',
  }
  
  export interface UserAttributes {
    id: string
    username: string
    email: string
    password: string
    bio?: string
    avatar?: string
    userRole: UserRole
  }
  
  export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id' | 'userRole' | 'bio' | 'avatar'> {}
  
  /**
   * User model for Quora-like app.
   */
  module.exports = (sequelize: Sequelize) => {
    class User
      extends Model<UserAttributes, UserCreationAttributes>
      implements UserAttributes
    {
      public id!: string
      public username!: string
      public email!: string
      public password!: string
      public bio?: string
      public avatar?: string
      public userRole!: UserRole
  
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
        bio: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        userRole: {
          type: DataTypes.ENUM('user', 'moderator', 'admin'),
          defaultValue: 'user',
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: true,
      },
    )
  
    return User
  }
  