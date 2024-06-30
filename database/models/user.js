'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
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
