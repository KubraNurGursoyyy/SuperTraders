'use strict';
import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Portfolio = (sequelize) => {
  {
    const Portfolios = sequelize.define(
        'Portfolios',
        {
          userID: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: 'Users', // Users tablosuna referans
              key: 'id'
            }
          }
        }
    );

    Portfolios.associate = function(models) {
      Portfolios.belongsTo(models.Users, {
        foreignKey: 'userID',
        onDelete: 'CASCADE'
      });

      Portfolios.hasMany(models.QuantityOfSharesInPortfolio, {
        foreignKey: 'portfolioID',
      });

      Portfolios.hasMany(models.TraceRecords, {
        foreignKey: 'portfolioID',
      });
    };

    return Portfolios;
  }
};
export default Portfolio;
