'use strict';
module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define('Manager', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    ATM: DataTypes.STRING,
    address: DataTypes.STRING,
    approved: DataTypes.BOOLEAN,
    role: DataTypes.BOOLEAN
  }, {});
  Manager.associate = function(models) {
    // associations can be defined here
  };
  return Manager;
};