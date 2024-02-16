'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_orders', {
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
      customer_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
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
    await queryInterface.dropTable('product_orders');
  }
};