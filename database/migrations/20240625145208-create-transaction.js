'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TraceRecords', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      Type: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      Quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
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
      portfolioID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Portfolios',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      Time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      PriceAtTheTimeOfTraceRecord: {
        type: Sequelize.FLOAT,
        allowNull: false
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
    await queryInterface.dropTable('TraceRecords');
  }
};
