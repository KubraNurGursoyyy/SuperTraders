'use strict';
import { DataTypes } from 'sequelize';
import ErrorLogs from "./errorlog.js";
import sequelize from '../sequelize.js';

const QuantityOfSharesInPortfolio = (sequelize) =>
    {
    const QuantityOfSharesInPortfolio = sequelize.define(
        'QuantityOfSharesInPortfolio',
        {
            shareID: DataTypes.UUID,
            Quantity: DataTypes.INTEGER,
            portfolioID: DataTypes.UUID,
        },
    );

    QuantityOfSharesInPortfolio.associate = function(models) {
        QuantityOfSharesInPortfolio.belongsTo(models.Shares, {
            foreignKey: 'shareID',
            onDelete: 'CASCADE',
        });

        QuantityOfSharesInPortfolio.belongsTo(models.Portfolios, {
            foreignKey: 'portfolioID',
            onDelete: 'CASCADE',
        });
    };

    return QuantityOfSharesInPortfolio;
};
export default QuantityOfSharesInPortfolio;
