'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agrifood = sequelize.define('Agrifood', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    freight: DataTypes.INTEGER,
    norm: DataTypes.STRING,
    description: DataTypes.TEXT,
    CategoryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Agrifood.associate = function (models) {
    Agrifood.belongsTo(models.User)
    Agrifood.belongsTo(models.Category)
  };
  return Agrifood;
};