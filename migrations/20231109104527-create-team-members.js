'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('team_members', {
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
        defaultValue: 'No data'
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data'
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No data'
      },
      profile_photo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'default_user.png'
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '00000000-0000-0000-00000000'
      },
      updatedBy: {
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
    await queryInterface.dropTable('team_members');
  }
};