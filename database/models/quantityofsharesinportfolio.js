'use strict';

module.exports = (sequelize, DataTypes) => {
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
