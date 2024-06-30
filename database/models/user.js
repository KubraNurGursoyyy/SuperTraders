'use strict';
import { DataTypes } from 'sequelize';
import QuantityOfSharesInPortfolio from "./quantityofsharesinportfolio.js";
import sequelize from '../sequelize.js';

const Users = (sequelize) => {
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
export default Users;
