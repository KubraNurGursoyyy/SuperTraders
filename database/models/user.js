'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
      'Users',
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        }
      }
  );

  Users.associate = function(models) {
    Users.hasOne(models.Wallets, {
      foreignKey: 'userID',
      as: 'wallet',
        onDelete: 'CASCADE'
    });

    Users.hasOne(models.Portfolios, {
      foreignKey: 'userID',
      as: 'portfolio',
      onDelete: 'CASCADE'
    });
  };

  return Users;
};
