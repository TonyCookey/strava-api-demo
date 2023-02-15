'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activity.init({
    athlete_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    distance: DataTypes.FLOAT,
    moving_time: DataTypes.BIGINT,
    elapsed_time: DataTypes.BIGINT,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};