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
        onDelete: 'CASCADE'
    });

    Users.hasOne(models.Portfolios, {
      foreignKey: 'userID',
      onDelete: 'CASCADE'
    });
  };

  return Users;
};
