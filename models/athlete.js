'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Athlete extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Athlete.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    access_token: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    expires_at: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Athlete',
  });
  return Athlete;
};