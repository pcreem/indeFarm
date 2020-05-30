'use strict';
const faker = require('faker')
const categoryId = [1, 3, 4, 6]

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Agrifoods',
      Array.from({ length: 30 }).map(d =>
        ({
          name: faker.commerce.productName(),
          image: 'https://loremflickr.com/320/240/agriculture/all',
          price: parseInt(faker.commerce.price()),
          freight: parseInt(faker.commerce.price()),
          norm: faker.commerce.productMaterial(),
          description: faker.commerce.productAdjective(),
          CategoryId: categoryId[Math.floor(Math.random() * categoryId.length)],
          UserId: Math.floor(Math.random() * 3) + 1,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        })
      ), {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Agrifoods', null, {});
  }
};
