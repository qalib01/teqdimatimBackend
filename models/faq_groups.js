'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faq_groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      faq_groups.hasMany(models.faqs, {
        foreignKey: 'faq_group_id',
        as: 'faqs'
      })
    }
  }
  faq_groups.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    key: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'faq_groups',
  });
  return faq_groups;
};