'use strict';
const faker = require('faker')
faker.locale = "zh_TW";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('News',
      Array.from({ length: 30 }).map(d =>
        ({
          name: faker.commerce.productName(),
          image: 'https://loremflickr.com/320/240/indigenous/all',
          description: faker.lorem.paragraphs(),
          UserId: Math.floor(Math.random() * 3) + 1,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        })
      ), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('News', null, { truncate: true, restartIdentity: true });
  }
};
