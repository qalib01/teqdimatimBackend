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
      product_order_requests.belongsTo(models.customer_requests, {
        foreignKey: 'id',
      })
    }
  }
  product_order_requests.init({
    product_id: DataTypes.STRING,
    customer_request_id: DataTypes.STRING,
    last_order_price: DataTypes.DECIMAL(10,2),
    additionalInformation: DataTypes.TEXT,
    preparedDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'product_order_requests',
  });
  return product_order_requests;
};