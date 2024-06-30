'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('QuantityOfSharesInPortfolios', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      shareID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Shares',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      portfolioID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Portfolios',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('QuantityOfSharesInPortfolios');
  }
};
