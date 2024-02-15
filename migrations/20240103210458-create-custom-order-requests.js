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
      customer_request_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subject_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data',
      },
      topic_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data',
      },
      order_price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        default: 0,
      },
      last_order_price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        default: 0,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data',
      },
      page_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      program: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data',
      },
      additional_information: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      prepared_date: {
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