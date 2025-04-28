import { DataTypes, Model, Sequelize, Optional } from 'sequelize'

export interface TopicAttributes {
  id: string
  name: string
  description?: string
}

export interface TopicCreationAttributes
  extends Optional<TopicAttributes, 'id'> {}

module.exports = (sequelize: Sequelize) => {
  class Topic extends Model<TopicAttributes, TopicCreationAttributes>
    implements TopicAttributes {
    public id!: string
    public name!: string
    public description?: string

    static associate(models: any) {
      Topic.belongsToMany(models.Question, {
        through: 'QuestionTopics',
        foreignKey: 'topicId',
        as: 'questions',
      })
    }
  }

  Topic.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Topic',
      tableName: 'Topics',
      timestamps: true,
    },
  )

  return Topic
}
