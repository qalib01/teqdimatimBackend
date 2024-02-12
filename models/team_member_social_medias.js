'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class team_member_social_medias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // team_member_social_medias.hasOne(models.team_members, {
      //   foreignKey: 'id',
      // })
    }
  }
  team_member_social_medias.init({
    member_id: DataTypes.STRING,
    social_media_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'team_member_social_medias',
  });
  return team_member_social_medias;
};