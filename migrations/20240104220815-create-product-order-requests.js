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
      productId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customerRequestId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastOrderPrice: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
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
    await queryInterface.dropTable('product_order_requests');
  }
};