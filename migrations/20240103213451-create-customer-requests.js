'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer_requests', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data',
      },
      surname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data'
      },
      phone: {
        type: Sequelize.STRING,
      },
      university: {
        type: Sequelize.STRING,
      },
      speciality: {
        type: Sequelize.STRING,
      },
      degree: {
        type: Sequelize.STRING,
      },
      course: {
        type: Sequelize.STRING,
      },
      group: {
        type: Sequelize.STRING,
      },
      discount_key: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('customer_requests');
  }
};