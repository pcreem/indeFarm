'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('News',
      Array.from({ length: 30 }).map(d =>
        ({
          name: faker.commerce.productName(),
          image: 'https://loremflickr.com/320/240/indigenous/all',
          description: faker.commerce.productAdjective(),
          UserId: Math.floor(Math.random() * 3) + 1,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        })
      ), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('News', null, {});
  }
};
