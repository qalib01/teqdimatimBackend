'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_categories.hasMany(models.products, {
        foreignKey: 'id',
      });
    }
  }
  product_categories.init({
    name: DataTypes.STRING,
    key: DataTypes.STRING,
    cover_img: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'product_categories',
  });
  return product_categories;
};