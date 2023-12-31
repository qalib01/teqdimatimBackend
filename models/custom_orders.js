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
    modelName: 'custom_orders',
  });
  return custom_orders;
};