'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faqs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      faqs.belongsTo(models.faq_groups, {
        foreignKey: 'id',
      })
    }
  }
  faqs.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    keyword: DataTypes.STRING,
    link: DataTypes.STRING,
    faq_group_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    createdBy: DataTypes.STRING,
    editedBy: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'faqs',
  });
  return faqs;
};