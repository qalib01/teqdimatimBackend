'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      customers.hasMany(models.custom_orders, {
        foreignKey: 'customer_id',
        as: 'custom_orders'
      });
      customers.hasMany(models.product_orders, {
        foreignKey: 'customer_id',
        as: 'product_orders'
      });
      customers.hasMany(models.customer_discounts, {
        foreignKey: 'customer_id',
        as: 'product_discounts'
      });
      customers.hasOne(models.universities, {
        foreignKey: 'id',
        sourceKey: 'university_key',
        as: 'university',
      });
    }
  }
  customers.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    university_key: DataTypes.STRING,
    speciality: DataTypes.STRING,
    degree: DataTypes.STRING,
    course: DataTypes.STRING,
    group: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'customers',
  });
  return customers;
};