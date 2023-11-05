'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('faqs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Please enter valid value!',
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Please enter valid value!',
      },
      keyword: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
      },
      faq_group_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '00000000-0000-0000-00000000'
      },
      editedBy: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('faqs');
  }
};