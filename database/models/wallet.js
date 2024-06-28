'use strict';

module.exports = (sequelize, DataTypes) => {
  const Wallets = sequelize.define(
      'Wallets',
      {
        userID: DataTypes.UUID,
        balance: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0.0
        }
      }
  );

    Wallets.associate = function(models) {
        Wallets.belongsTo(models.Users, {
      foreignKey: 'userID',
        onDelete: 'CASCADE'
    });
  };

  return Wallets;
};
