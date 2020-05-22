'use strict';
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  News.associate = function (models) {
    News.belongsTo(models.User)
  };
  return News;
};