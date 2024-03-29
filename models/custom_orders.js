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
      custom_orders.belongsTo(models.customers, {
        foreignKey: 'id'
      })
    }
  }
  custom_orders.init({
    customer_id: DataTypes.STRING,
    subject_name: DataTypes.STRING,
    topic_name: DataTypes.STRING,
    order_price: DataTypes.DECIMAL(10,2),
    last_price: DataTypes.DECIMAL(10,2),
    language_key: DataTypes.STRING,
    page_count: DataTypes.INTEGER,
    program_key: DataTypes.STRING,
    additional_information: DataTypes.TEXT,
    customer_status: DataTypes.STRING,
    admin_status: DataTypes.STRING,
    status: DataTypes.STRING,
    prepared_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'custom_orders',
  });
  return custom_orders;
};