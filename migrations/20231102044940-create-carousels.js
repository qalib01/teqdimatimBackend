'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carousels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No Data',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No Data',
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data',
      },
      cover_img: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'default_carousel_image.png'
      },
      link: {
        type: Sequelize.STRING,
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
      updatedBy: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carousels');
  }
};