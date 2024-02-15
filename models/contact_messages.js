'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact_messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      contact_messages.hasOne(models.contact_statuses, {
        foreignKey: 'status_id',
        as: 'status'
      });
    }
  }
  contact_messages.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.STRING,
    status_id: DataTypes.INTEGER,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contact_messages',
  });
  return contact_messages;
};