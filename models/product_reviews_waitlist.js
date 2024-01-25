'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_reviews_waitlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_reviews_waitlist.init({
    product_id: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    review: DataTypes.STRING,
    reviewer_name: DataTypes.STRING,
    reviewer_surname: DataTypes.STRING,
    reviewer_email: DataTypes.STRING,
    ipv4_adress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product_reviews_waitlist',
  });
  return product_reviews_waitlist;
};