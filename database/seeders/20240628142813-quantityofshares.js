'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('QuantityOfSharesInPortfolio', [
      { id: '14b441c8-355c-11ef-adab-325096b39f47', portfolioID: 'ec1ab377-eb3c-400f-b62c-98fbb88d0aec', shareID: '65990a56-a3db-4ba2-be36-d866db456a75', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '14b4445c-355c-11ef-96b2-325096b39f47', portfolioID: 'a53906fa-d120-487c-8eeb-acd49ee4c1ed', shareID: '15b64a28-355a-11ef-b039-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '14b44506-355c-11ef-b6fb-325096b39f47', portfolioID: 'fd1936a3-1be0-43f0-9324-7b47f82c7a28', shareID: '15b64d0c-355a-11ef-844c-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '14b44592-355c-11ef-bf99-325096b39f47', portfolioID: 'c7f5f5f1-662a-44f8-99a5-1c5077500ba4', shareID: '330520cc-355a-11ef-9ca4-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '14b44614-355c-11ef-8d57-325096b39f47', portfolioID: '70b6a83f-59a8-4a36-a61f-83a8a4c8e29d', shareID: '3305237e-355a-11ef-8758-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '14b44696-355c-11ef-bcc9-325096b39f47', portfolioID: '9d1d0a1c-b16f-4e5b-9f85-2a7e6c69b2e5', shareID: '33052432-355a-11ef-bb55-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '14b4470e-355c-11ef-b702-325096b39f47', portfolioID: '0ebbd8b0-aa95-42c8-9031-71cf2c0b49fe', shareID: '330524be-355a-11ef-8faa-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '14b44790-355c-11ef-8406-325096b39f47', portfolioID: 'ec1ab377-eb3c-400f-b62c-98fbb88d0aec', shareID: '40cf4782-355a-11ef-9fe1-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '25d70120-355c-11ef-a0eb-325096b39f47', portfolioID: 'a53906fa-d120-487c-8eeb-acd49ee4c1ed', shareID: '40cf4a52-355a-11ef-9a1e-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '25d7031e-355c-11ef-8475-325096b39f47', portfolioID: 'fd1936a3-1be0-43f0-9324-7b47f82c7a28', shareID: '40cf4b06-355a-11ef-bbab-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '25d70396-355c-11ef-9193-325096b39f47', portfolioID: 'c7f5f5f1-662a-44f8-99a5-1c5077500ba4', shareID: '330526bc-355a-11ef-bcf7-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '25d703e6-355c-11ef-b393-325096b39f47', portfolioID: '70b6a83f-59a8-4a36-a61f-83a8a4c8e29d', shareID: '2ad489b0-355a-11ef-ae58-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '25d70436-355c-11ef-b55d-325096b39f47', portfolioID: '9d1d0a1c-b16f-4e5b-9f85-2a7e6c69b2e5', shareID: '2ad48d34-355a-11ef-ad2b-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '25d7047c-355c-11ef-a2d8-325096b39f47', portfolioID: '0ebbd8b0-aa95-42c8-9031-71cf2c0b49fe', shareID: '2ad48f14-355a-11ef-8575-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '25d704c2-355c-11ef-b121-325096b39f47', portfolioID: 'ec1ab377-eb3c-400f-b62c-98fbb88d0aec', shareID: '2ad48faa-355a-11ef-92ba-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '25d70508-355c-11ef-a86e-325096b39f47', portfolioID: 'a53906fa-d120-487c-8eeb-acd49ee4c1ed', shareID: '65990a56-a3db-4ba2-be36-d866db456a75', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '25d7054e-355c-11ef-98ca-325096b39f47', portfolioID: 'fd1936a3-1be0-43f0-9324-7b47f82c7a28', shareID: '15b64a28-355a-11ef-b039-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '19a2f170-355c-11ef-a5e8-325096b39f47', portfolioID: 'c7f5f5f1-662a-44f8-99a5-1c5077500ba4', shareID: '15b64d0c-355a-11ef-844c-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '19a2f1d4-355c-11ef-9a8d-325096b39f47', portfolioID: '70b6a83f-59a8-4a36-a61f-83a8a4c8e29d', shareID: '330520cc-355a-11ef-9ca4-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '19a2f24c-355c-11ef-99c9-325096b39f47', portfolioID: '9d1d0a1c-b16f-4e5b-9f85-2a7e6c69b2e5', shareID: '3305237e-355a-11ef-8758-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '20cbd278-355c-11ef-ada3-325096b39f47', portfolioID: '0ebbd8b0-aa95-42c8-9031-71cf2c0b49fe', shareID: '33052432-355a-11ef-bb55-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '20cbd57a-355c-11ef-9443-325096b39f47', portfolioID: 'ec1ab377-eb3c-400f-b62c-98fbb88d0aec', shareID: '330524be-355a-11ef-8faa-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '20cbd624-355c-11ef-8ad2-325096b39f47', portfolioID: 'a53906fa-d120-487c-8eeb-acd49ee4c1ed', shareID: '40cf4782-355a-11ef-9fe1-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '20cbd6b0-355c-11ef-9b97-325096b39f47', portfolioID: 'fd1936a3-1be0-43f0-9324-7b47f82c7a28', shareID: '330526bc-355a-11ef-bcf7-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '20cbd71e-355c-11ef-aa11-325096b39f47', portfolioID: 'c7f5f5f1-662a-44f8-99a5-1c5077500ba4', shareID: '2ad489b0-355a-11ef-ae58-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '20cbd78c-355c-11ef-9b1c-325096b39f47', portfolioID: '70b6a83f-59a8-4a36-a61f-83a8a4c8e29d', shareID: '2ad48d34-355a-11ef-ad2b-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },
      { id: '20cbd7fa-355c-11ef-872c-325096b39f47', portfolioID: '9d1d0a1c-b16f-4e5b-9f85-2a7e6c69b2e5', shareID: '2ad48faa-355a-11ef-92ba-325096b39f47', Quantity: Math.floor(Math.random() * 9) + 1,  createdAt: new Date(), updatedAt: new Date() },

    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('QuantityOfSharesInPortfolio', null, {});

  }
};
