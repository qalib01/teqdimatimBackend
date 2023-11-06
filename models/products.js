'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.product_categories, {
        foreignKey: 'category_id',
        as: 'categories' // Use 'categories' as the alias
      });
      products.belongsTo(models.product_formats, {
        foreignKey: 'format_id',
        as: 'formats' // Use 'formats' as the alias
      });
      products.belongsTo(models.product_languages, {
        foreignKey: 'language_id',
        as: 'languages' // Use 'languages' as the alias
      });
      products.belongsTo(models.product_sizes, {
        foreignKey: 'size_id',
        as: 'sizes' // Use 'sizes' as the alias
      });
    }
  }
  products.init({
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    key: DataTypes.STRING,
    cover_img: DataTypes.STRING,
    description: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    format_id: DataTypes.INTEGER,
    language_id: DataTypes.INTEGER,
    size_id: DataTypes.INTEGER,
    slides: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    createdBy: DataTypes.STRING,
    uploadedBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};