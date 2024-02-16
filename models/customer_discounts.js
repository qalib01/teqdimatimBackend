'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer_discounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      customer_discounts.belongsTo(models.customers, {
        foreignKey: 'id'
      });
      customer_discounts.hasOne(models.discounts, {
        foreignKey: 'key',
        sourceKey: 'discount_key',
        as: 'discount',
      });
    }
  }
  customer_discounts.init({
    customer_id: DataTypes.STRING,
    discount_key: DataTypes.STRING,
    status: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'customer_discounts',
  });
  return customer_discounts;
};