'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('testimonials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data'
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data'
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: 'no_data'
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data'
      },
      profile_picture: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'default_user.png'
      },
      opinion: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'No data'
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('testimonials');
  }
};