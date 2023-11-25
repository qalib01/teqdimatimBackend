'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class email_logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  email_logs.init({
    email_type: DataTypes.STRING,
    email_source: DataTypes.STRING,
    email_to: DataTypes.STRING,
    ip_adress: DataTypes.STRING,
    email_content: DataTypes.TEXT,
    email_status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'email_logs',
  });
  return email_logs;
};