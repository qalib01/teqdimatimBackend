'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_requests.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    university: DataTypes.STRING,
    speciality: DataTypes.STRING,
    degree: DataTypes.STRING,
    course: DataTypes.STRING,
    group: DataTypes.STRING,
    discountPercent: DataTypes.INTEGER,
    customer_status: DataTypes.STRING,
    admin_status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'order_requests',
  });
  return order_requests;
};