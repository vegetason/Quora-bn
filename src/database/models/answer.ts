import { DataTypes, Model, Optional, Sequelize } from 'sequelize'

export interface AnswerAttributes {
  id: string
  content: string
  questionId: string
  authorId: string
}

export interface AnswerCreationAttributes
  extends Optional<AnswerAttributes, 'id'> {}

module.exports = (sequelize: Sequelize) => {
  class Answer extends Model<AnswerAttributes, AnswerCreationAttributes>
    implements AnswerAttributes {
    public id!: string
    public content!: string
    public questionId!: string
    public authorId!: string

    static associate(models: any) {
      Answer.belongsTo(models.User, {
        foreignKey: 'authorId',
        as: 'author',
      })

      Answer.belongsTo(models.Question, {
        foreignKey: 'questionId',
        as: 'question',
      })
    }
  }

  Answer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      authorId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Answer',
      tableName: 'Answers',
      timestamps: true,
    },
  )

  return Answer
}
