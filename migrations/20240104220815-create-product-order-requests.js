'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_order_requests', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      product_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customer_request_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_order_price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
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
    await queryInterface.dropTable('product_order_requests');
  }
};