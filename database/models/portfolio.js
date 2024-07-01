'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Portfolios extends Model {
    static associate(models) {
      Portfolios.belongsTo(models.Users, {
        foreignKey: 'userID',
        onDelete: 'CASCADE'
      });

      Portfolios.hasMany(models.QuantityOfSharesInPortfolios, {
        foreignKey: 'portfolioID',
      });

      Portfolios.hasMany(models.TraceRecords, {
        foreignKey: 'portfolioID',
      });
    }
  }

  Portfolios.init({
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Portfolios',
  });

  return Portfolios;
};
