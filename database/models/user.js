'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasOne(models.Wallets, {
        foreignKey: 'userID',
        onDelete: 'CASCADE'
      });

      Users.hasOne(models.Portfolios, {
        foreignKey: 'userID',
        onDelete: 'CASCADE'
      });
    }
  }

  Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Users',
  });

  return Users;
};
