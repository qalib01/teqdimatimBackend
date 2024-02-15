'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class social_medias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      social_medias.belongsTo(models.team_member_social_medias, {
        foreignKey: 'social_media_id',
      })
    }
  }
  social_medias.init({
    name: DataTypes.STRING,
    key: DataTypes.STRING,
    link: DataTypes.STRING,
    icon: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'social_medias',
  });
  return social_medias;
};