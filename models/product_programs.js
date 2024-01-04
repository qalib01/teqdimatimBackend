'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_programs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_programs.hasMany(models.products, {
        foreignKey: 'id',
      });
    }
  }
  product_programs.init({
    name: DataTypes.STRING,
    key: DataTypes.STRING,
    scale: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product_programs',
  });
  return product_programs;
};