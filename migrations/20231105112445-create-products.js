'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No Data'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No Data'
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no_data'
      },
      cover_img: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'default_product.png'
      },
      description: {
        type: Sequelize.TEXT,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      format_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      language_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      size_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      slides: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'No Data',
      },
      uploadedBy: {
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
    await queryInterface.dropTable('products');
  }
};