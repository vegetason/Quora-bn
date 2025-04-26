'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Follows', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      followerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      followedId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });

  
    await queryInterface.addIndex('Follows', ['followerId', 'followedId'], {
      unique: true,
      name: 'follows_follower_followed_unique'
    });

    await queryInterface.addIndex('Follows', ['followerId'], {
      name: 'follows_follower_idx'
    });
    
    await queryInterface.addIndex('Follows', ['followedId'], {
      name: 'follows_followed_idx'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Follows');
  }
};