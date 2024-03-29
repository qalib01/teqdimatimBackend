'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class universities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      universities.belongsTo(models.customers, {
        foreignKey: 'key',
      });
      universities.belongsTo(models.customers, {
        foreignKey: 'key',
      });
    }
  }
  universities.init({
    name: DataTypes.STRING,
    key: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'universities',
  });
  return universities;
};