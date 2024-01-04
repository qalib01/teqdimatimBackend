'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer_requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      customer_requests.hasOne(models.discounts, {
        foreignKey: 'key',
        sourceKey: 'discount_key',
        as: 'discount',
      });
      customer_requests.hasMany(models.custom_order_requests, {
        foreignKey: 'customer_request_id',
        as: 'customOrders',
      });
    }
  }
  customer_requests.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    university: DataTypes.STRING,
    speciality: DataTypes.STRING,
    degree: DataTypes.STRING,
    course: DataTypes.STRING,
    group: DataTypes.STRING,
    discount_key: DataTypes.STRING,
    customer_status: DataTypes.STRING,
    admin_status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'customer_requests',
  });
  return customer_requests;
};