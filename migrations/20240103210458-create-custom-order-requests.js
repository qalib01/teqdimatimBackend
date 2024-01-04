'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('custom_order_requests', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      customerRequestId: {
        type: Sequelize.STRING,
        allowNull: false,
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
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        default: 0,
      },
      lastOrderPrice: {
        type: Sequelize.DECIMAL(10,2),
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
    await queryInterface.dropTable('custom_order_requests');
  }
};