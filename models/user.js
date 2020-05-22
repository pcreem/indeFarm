'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    ATM: DataTypes.STRING,
    address: DataTypes.STRING,
    approved: DataTypes.BOOLEAN,
    role: DataTypes.BOOLEAN
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Agrifood)
    User.hasMany(models.News)
  };
  return User;
};