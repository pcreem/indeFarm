'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      name: '蔬菜',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: '水果',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: '米',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: '其他',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, { truncate: true, restartIdentity: true })
  }
}