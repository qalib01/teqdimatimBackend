'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('custom_orders', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      subjectName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data',
      },
      topicName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data',
      },
      orderPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      lastOrderPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data',
      },
      pageCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      program: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data',
      },
      additionalInformation: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      preparedDate: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('custom_orders');
  }
};