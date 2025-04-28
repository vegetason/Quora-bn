import { DataTypes, Sequelize, Optional, Model } from "sequelize"
export interface QuestionAttributes{
    id: string,
    authorId: string,
    title: string,
    content: string,
}

export interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> {}

module.exports = (sequelize: Sequelize) => {
    class Question extends Model<QuestionAttributes, QuestionCreationAttributes>
      implements QuestionAttributes {
      public id!: string
      public title!: string
      public content!: string
      public authorId!: string
  
      static associate(models: any) {
        Question.belongsTo(models.User, {
          foreignKey: 'authorId',
          as: 'author',
        })
  
        Question.hasMany(models.Answer, {
          foreignKey: 'questionId',
          as: 'answers',
        })

        Question.belongsToMany(models.Topic, {
            through: 'QuestionTopics',
            foreignKey: 'questionId',
            as: 'topics',
          })
      }
    }
  
    Question.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        authorId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Question',
        tableName: 'Questions',
        timestamps: true,
      },
    )
  
    return Question
  }
  