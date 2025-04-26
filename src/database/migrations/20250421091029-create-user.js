'use strict';  

module.exports = {   
  async up(queryInterface, Sequelize) {     
    await queryInterface.createTable('Users', {       
      id: {         
        allowNull: false,         
        primaryKey: true,         
        type: Sequelize.UUID,         
        defaultValue: Sequelize.UUIDV4,       
      },       
      username: {         
        type: Sequelize.STRING,         
        allowNull: false,
        unique: true,       
      },       
      email: {         
        type: Sequelize.STRING,         
        allowNull: false,         
        unique: true,
        validate: { isEmail: true },       
      },       
      password: {         
        type: Sequelize.STRING,         
        allowNull: false,       
      },     
      userRole: {         
        type: Sequelize.ENUM('user', 'admin', 'moderator'),         
        defaultValue: 'user',       
      },       
      createdAt: {         
        allowNull: false,         
        type: Sequelize.DATE,       
      },       
      updatedAt: {         
        allowNull: false,         
        type: Sequelize.DATE,       
      },     
    });
    
    await queryInterface.addIndex('Users', ['username'], {
      name: 'users_username_idx'
    });
    
    await queryInterface.addIndex('Users', ['email'], {
      name: 'users_email_idx'
    });
  },    
  
  async down(queryInterface, Sequelize) {

    await queryInterface.removeIndex('Users', 'users_username_idx');
    await queryInterface.removeIndex('Users', 'users_email_idx');
    await queryInterface.dropTable('Users');   
  }, 
};