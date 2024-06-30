'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class QuantityOfSharesInPortfolio extends Model {
        static associate(models) {
            QuantityOfSharesInPortfolio.belongsTo(models.Shares, {
                foreignKey: 'shareID',
                onDelete: 'CASCADE',
            });

            QuantityOfSharesInPortfolio.belongsTo(models.Portfolios, {
                foreignKey: 'portfolioID',
                onDelete: 'CASCADE',
            });
        }
    }

    QuantityOfSharesInPortfolio.init({
        shareID: {
            type: DataTypes.UUID,
        },
        Quantity: {
            type: DataTypes.INTEGER,
        },
        portfolioID: {
            type: DataTypes.UUID,
        },
    }, {
        sequelize,
        modelName: 'QuantityOfSharesInPortfolio',
    });

    return QuantityOfSharesInPortfolio;
};
