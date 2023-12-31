'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class custom_order_requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      custom_order_requests.belongsTo(models.customer_requests, {
        foreignKey: 'id',
      })
    }
  }
  custom_order_requests.init({
    customerRequestId: DataTypes.STRING,
    subjectName: DataTypes.STRING,
    topicName: DataTypes.STRING,
    orderPrice: DataTypes.DECIMAL(10,2),
    lastOrderPrice: DataTypes.DECIMAL(10,2),
    language: DataTypes.STRING,
    pageCount: DataTypes.INTEGER,
    program: DataTypes.STRING,
    additionalInformation: DataTypes.TEXT,
    preparedDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'custom_order_requests',
  });
  return custom_order_requests;
};