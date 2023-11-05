'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('faq_groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No Data',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No Data',
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data',
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '00000000-0000-0000-00000000',
      },
      editedBy: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('faq_groups');
  }
};