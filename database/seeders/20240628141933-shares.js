'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Shares', [
      { id: '65990a56-a3db-4ba2-be36-d866db456a75', Symbol: 'CNY', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '15b64a28-355a-11ef-b039-325096b39f47', Symbol: 'KLT', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '15b64d0c-355a-11ef-844c-325096b39f47', Symbol: 'STY', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '330520cc-355a-11ef-9ca4-325096b39f47', Symbol: 'KRL', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '3305237e-355a-11ef-8758-325096b39f47', Symbol: 'MSP', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '33052432-355a-11ef-bb55-325096b39f47', Symbol: 'SAH', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '330524be-355a-11ef-8faa-325096b39f47', Symbol: 'DFH', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '40cf4782-355a-11ef-9fe1-325096b39f47', Symbol: 'CVK', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '40cf4a52-355a-11ef-9a1e-325096b39f47', Symbol: 'MYY', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '40cf4b06-355a-11ef-bbab-325096b39f47', Symbol: 'PYD', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '330526bc-355a-11ef-bcf7-325096b39f47', Symbol: 'JHK', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '2ad489b0-355a-11ef-ae58-325096b39f47', Symbol: 'LAS', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '2ad48d34-355a-11ef-ad2b-325096b39f47', Symbol: 'BNF', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '2ad48f14-355a-11ef-8575-325096b39f47', Symbol: 'HGD', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '2ad48faa-355a-11ef-92ba-325096b39f47', Symbol: 'FGT', Price: Math.floor(Math.random() * 99) + 1,  createdAt: new Date(), updatedAt: new Date() },

    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Shares', null, {});

  }
};
