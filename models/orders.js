'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    product_id: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};