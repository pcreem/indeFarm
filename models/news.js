'use strict';
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  News.associate = function(models) {
    // associations can be defined here
  };
  return News;
};