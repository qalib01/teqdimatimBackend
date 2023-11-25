'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('email_logs', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      email_type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data',
      },
      email_source: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data',
      },
      email_to: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data',
      },
      ip_adress: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0.0.0.0',
      },
      email_content: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'No data',
      },
      email_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending',
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
    await queryInterface.dropTable('email_logs');
  }
};