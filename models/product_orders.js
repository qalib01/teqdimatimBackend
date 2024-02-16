'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_orders.belongsTo(models.customers, {
        foreignKey: 'id',
      });
      product_orders.hasOne(models.products, {
        foreignKey: 'id',
        sourceKey: 'product_id',
        as: 'product',
      });
    }
  }
  product_orders.init({
    product_id: DataTypes.STRING,
    customer_id: DataTypes.STRING,
    last_price: DataTypes.DECIMAL(10,2),
    additional_information: DataTypes.TEXT,
    customer_status: DataTypes.STRING,
    admin_status: DataTypes.STRING,
    status: DataTypes.STRING,
    prepared_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'product_orders',
  });
  return product_orders;
};