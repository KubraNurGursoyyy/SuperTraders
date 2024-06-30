'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class QuantityOfSharesInPortfolios extends Model {
        static associate(models) {
            QuantityOfSharesInPortfolios.belongsTo(models.Shares, {
                foreignKey: 'shareID',
                onDelete: 'CASCADE',
            });

            QuantityOfSharesInPortfolios.belongsTo(models.Portfolios, {
                foreignKey: 'portfolioID',
                onDelete: 'CASCADE',
            });
        }
    }

    QuantityOfSharesInPortfolios.init({
        shareID: {
            type: DataTypes.UUID,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        portfolioID: {
            type: DataTypes.UUID,
        },
    }, {
        sequelize,
        modelName: 'QuantityOfSharesInPortfolios',
    });

    return QuantityOfSharesInPortfolios;
};
