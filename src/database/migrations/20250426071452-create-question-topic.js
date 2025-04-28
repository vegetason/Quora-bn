'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('QuestionTopics', {
      questionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      topicId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Topics',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('QuestionTopics')
  },
}
