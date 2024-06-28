'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Portfolios', [
      { id: 'ec1ab377-eb3c-400f-b62c-98fbb88d0aec', userID: 'c1d4e06f-621b-4eaf-89a7-dcb1d4b42f81', createdAt: new Date(), updatedAt: new Date() },
      { id: 'a53906fa-d120-487c-8eeb-acd49ee4c1ed', userID: '90d0b82e-9c72-4d1c-b9b8-31f3d4a83a5e', createdAt: new Date(), updatedAt: new Date() },
      { id: 'fd1936a3-1be0-43f0-9324-7b47f82c7a28', userID: 'ee7b416c-0df9-4b8c-9a03-479d22b5d9bf', createdAt: new Date(), updatedAt: new Date() },
      { id: 'c7f5f5f1-662a-44f8-99a5-1c5077500ba4', userID: '2b2d34f2-7e6b-4427-8ed1-3b1d21eeb8b5', createdAt: new Date(), updatedAt: new Date() },
      { id: '70b6a83f-59a8-4a36-a61f-83a8a4c8e29d', userID: 'cfccba0e-2f43-4ce5-8b7f-0a05f040ca4f', createdAt: new Date(), updatedAt: new Date() },
      { id: '9d1d0a1c-b16f-4e5b-9f85-2a7e6c69b2e5', userID: '01d1a298-4ef1-4e71-b00d-1d16bc92b530', createdAt: new Date(), updatedAt: new Date() },
      { id: '0ebbd8b0-aa95-42c8-9031-71cf2c0b49fe', userID: '2bcb7ed5-4db6-40f4-8de7-c5667c872f63', createdAt: new Date(), updatedAt: new Date() },
      { id: '5f1e0a7b-20d0-4a24-9a35-6f3814e0a6a6', userID: 'c256dcd2-7c72-48e7-bc20-b8ee29707210', createdAt: new Date(), updatedAt: new Date() },
      { id: 'a6cbf264-6c8b-4a78-a924-2f6df0ed9ab3', userID: 'f7ecbb92-d6f7-4584-9a53-aa3b6442f837', createdAt: new Date(), updatedAt: new Date() },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Portfolios', null, {});

  }
};
