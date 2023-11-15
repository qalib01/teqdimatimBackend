'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
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
        allowNull: false,
        defaultValue: 'No data'
      },
      product_id: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '00000000-0000-0000-00000000'
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
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
    await queryInterface.dropTable('orders');
  }
};