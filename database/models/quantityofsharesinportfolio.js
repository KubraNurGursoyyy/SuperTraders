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
            as: 'share', // İlişkiye takma ad verildi
            onDelete: 'CASCADE',
        });

        QuantityOfSharesInPortfolio.belongsTo(models.Portfolios, {
            foreignKey: 'portfolioID',
            as: 'portfolio', // İlişkiye takma ad verildi
            onDelete: 'CASCADE',
        });
    };

    return QuantityOfSharesInPortfolio;
};
