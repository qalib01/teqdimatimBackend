'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sliders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sliders.init({
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    key: DataTypes.STRING,
    img_source: DataTypes.STRING,
    link: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdBy: DataTypes.BOOLEAN,
    editedBy: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'sliders',
  });
  return sliders;
};