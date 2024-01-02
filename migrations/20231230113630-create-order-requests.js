'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_requests', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data'
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: null
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data'
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: null
      },
      university: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: null
      },
      speciality: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: null
      },
      degree: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: null
      },
      course: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: null
      },
      group: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: null
      },
      discountPercent: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      customer_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_value'
      },
      admin_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_value'
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
    await queryInterface.dropTable('order_requests');
  }
};