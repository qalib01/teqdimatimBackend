'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_order_requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_order_requests.init({
    productId: DataTypes.STRING,
    customerRequestId: DataTypes.STRING,
    lastOrderPrice: DataTypes.DECIMAL(10,2),
    additionalInformation: DataTypes.TEXT,
    preparedDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'product_order_requests',
  });
  return product_order_requests;
};