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
      customer_id: {
        allowNull: false,
        type: Sequelize.STRING
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
      last_price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        default: 0,
      },
      language_key: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data',
      },
      page_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      program_key: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data',
      },
      additional_information: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      customer_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin_status: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('custom_orders');
  }
};