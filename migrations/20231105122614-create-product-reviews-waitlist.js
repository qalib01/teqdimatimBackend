'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_reviews_waitlist', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      review: {
        type: Sequelize.STRING
      },
      reviewer_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reviewer_surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reviewer_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ipv4_adress: {
        type: Sequelize.STRING,
        defaultValue: '0.0.0.0'
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
    await queryInterface.dropTable('product_reviews_waitlist');
  }
};