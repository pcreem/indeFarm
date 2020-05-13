'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agrifood = sequelize.define('Agrifood', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    freight: DataTypes.INTEGER,
    norm: DataTypes.STRING,
    description: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Agrifood.associate = function(models) {
    // associations can be defined here
  };
  return Agrifood;
};