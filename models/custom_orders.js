'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class custom_orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  custom_orders.init({
    subjectName: DataTypes.STRING,
    topicName: DataTypes.STRING,
    orderPrice: DataTypes.INTEGER,
    lastOrderPrice: DataTypes.INTEGER,
    language: DataTypes.STRING,
    pageCount: DataTypes.INTEGER,
    program: DataTypes.STRING,
    additionalInformation: DataTypes.TEXT,
    preparedDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'custom_orders',
  });
  return custom_orders;
};