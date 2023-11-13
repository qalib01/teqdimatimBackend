'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contact_messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data',
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data',
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data',
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      updatedBy: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('contact_messages');
  }
};