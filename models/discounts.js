'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      discounts.belongsTo(models.customer_discounts, {
        foreignKey: 'key',
      });
    }
  }
  discounts.init({
    name: DataTypes.STRING,
    key: DataTypes.STRING,
    percent: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'discounts',
  });
  return discounts;
};