'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { id: 'c1d4e06f-621b-4eaf-89a7-dcb1d4b42f81', username: 'user1', portfolioID: 'ec1ab377-eb3c-400f-b62c-98fbb88d0aec', walletID: '698851be-f9bd-4fd7-af33-7046d817b1dc', createdAt: new Date(), updatedAt: new Date() },
      { id: '90d0b82e-9c72-4d1c-b9b8-31f3d4a83a5e', username: 'user2', portfolioID: 'a53906fa-d120-487c-8eeb-acd49ee4c1ed', walletID: 'daba2e12-720e-4f01-9352-5473a4db350e', createdAt: new Date(), updatedAt: new Date() },
      { id: 'ee7b416c-0df9-4b8c-9a03-479d22b5d9bf', username: 'user3', portfolioID: 'fd1936a3-1be0-43f0-9324-7b47f82c7a28', walletID: '0db58df1-0c48-4597-9ce1-8b865b4c0d54', createdAt: new Date(), updatedAt: new Date() },
      { id: '2b2d34f2-7e6b-4427-8ed1-3b1d21eeb8b5', username: 'user4', portfolioID: 'c7f5f5f1-662a-44f8-99a5-1c5077500ba4', walletID: '2d27a2b4-5365-4f9e-a345-1d95bb54d950', createdAt: new Date(), updatedAt: new Date() },
      { id: 'cfccba0e-2f43-4ce5-8b7f-0a05f040ca4f', username: 'user5', portfolioID: '70b6a83f-59a8-4a36-a61f-83a8a4c8e29d', walletID: 'e5ddc0b5-3b65-4563-aa8d-1b16f94e6c03', createdAt: new Date(), updatedAt: new Date() },
      { id: '01d1a298-4ef1-4e71-b00d-1d16bc92b530', username: 'user6', portfolioID: '9d1d0a1c-b16f-4e5b-9f85-2a7e6c69b2e5', walletID: 'ce0e6ae6-016d-40d0-9ff6-1d2f19a16df5', createdAt: new Date(), updatedAt: new Date() },
      { id: '2bcb7ed5-4db6-40f4-8de7-c5667c872f63', username: 'user7', portfolioID: '0ebbd8b0-aa95-42c8-9031-71cf2c0b49fe', walletID: 'cc3e314b-968c-45f3-82f2-eb47833a9e3a', createdAt: new Date(), updatedAt: new Date() },
      { id: 'c256dcd2-7c72-48e7-bc20-b8ee29707210', username: 'user8', portfolioID: '5f1e0a7b-20d0-4a24-9a35-6f3814e0a6a6', walletID: 'b08f2b47-82b1-4a88-8b29-df4bb8f8a4e4', createdAt: new Date(), updatedAt: new Date() },
      { id: 'f7ecbb92-d6f7-4584-9a53-aa3b6442f837', username: 'user9', portfolioID: 'a6cbf264-6c8b-4a78-a924-2f6df0ed9ab3', walletID: null, createdAt: new Date(), updatedAt: new Date() },
      { id: '68c4d581-5e06-45c4-8312-70203a0a4e63', username: 'user10', portfolioID: null, walletID: null, createdAt: new Date(), updatedAt: new Date() },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
