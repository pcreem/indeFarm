'use strict'
const bcrypt = require('bcryptjs')
const faker = require('faker')
faker.locale = "zh_TW";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: '台灣原鄉產發協會',
      email: 'root@example.com',
      phone: faker.phone.phoneNumber(),
      password: bcrypt.hashSync('123', bcrypt.genSaltSync(10), null),
      ATM: faker.finance.account(),
      address: faker.address.streetAddress(),
      approved: true,
      role: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: '泰雅產發部',
      email: 'tayal@example.com',
      phone: faker.phone.phoneNumber(),
      password: bcrypt.hashSync('123', bcrypt.genSaltSync(10), null),
      ATM: faker.finance.account(),
      address: faker.address.streetAddress(),
      approved: true,
      role: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: '鄒族產發部',
      email: 'tzou@example.com',
      phone: faker.phone.phoneNumber(),
      password: bcrypt.hashSync('123', bcrypt.genSaltSync(10), null),
      ATM: faker.finance.account(),
      address: faker.address.streetAddress(),
      approved: true,
      role: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true })
  }
}