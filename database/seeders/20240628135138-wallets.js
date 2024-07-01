'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Wallets', [
      { id: '698851be-f9bd-4fd7-af33-7046d817b1dc', userID: 'c1d4e06f-621b-4eaf-89a7-dcb1d4b42f81', balance: Math.floor(Math.random() * 5001), createdAt: new Date(), updatedAt: new Date() },
      { id: 'daba2e12-720e-4f01-9352-5473a4db350e', userID: '90d0b82e-9c72-4d1c-b9b8-31f3d4a83a5e', balance: Math.floor(Math.random() * 5001), createdAt: new Date(), updatedAt: new Date() },
      { id: '0db58df1-0c48-4597-9ce1-8b865b4c0d54', userID: 'ee7b416c-0df9-4b8c-9a03-479d22b5d9bf', balance: Math.floor(Math.random() * 5001), createdAt: new Date(), updatedAt: new Date() },
      { id: '2d27a2b4-5365-4f9e-a345-1d95bb54d950', userID: '2b2d34f2-7e6b-4427-8ed1-3b1d21eeb8b5', balance: Math.floor(Math.random() * 5001), createdAt: new Date(), updatedAt: new Date() },
      { id: 'e5ddc0b5-3b65-4563-aa8d-1b16f94e6c03', userID: 'cfccba0e-2f43-4ce5-8b7f-0a05f040ca4f', balance: Math.floor(Math.random() * 5001), createdAt: new Date(), updatedAt: new Date() },
      { id: 'ce0e6ae6-016d-40d0-9ff6-1d2f19a16df5', userID: '01d1a298-4ef1-4e71-b00d-1d16bc92b530', balance: Math.floor(Math.random() * 5001), createdAt: new Date(), updatedAt: new Date() },
      { id: 'cc3e314b-968c-45f3-82f2-eb47833a9e3a', userID: '2bcb7ed5-4db6-40f4-8de7-c5667c872f63', balance: Math.floor(Math.random() * 5001), createdAt: new Date(), updatedAt: new Date() },
      { id: 'b08f2b47-82b1-4a88-8b29-df4bb8f8a4e4', userID: 'c256dcd2-7c72-48e7-bc20-b8ee29707210', balance: Math.floor(Math.random() * 5001), createdAt: new Date(), updatedAt: new Date() },

   ], {})

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Wallets', null, {});
  }
};
