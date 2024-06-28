'use strict';

module.exports = (sequelize, DataTypes) => {
    const Shares = sequelize.define(
        'Shares',
        {
            Symbol: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            Price: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        }
    );

    Shares.associate = function(models) {
        Shares.hasMany(models.QuantityOfSharessInPortfolio, {
            foreignKey: 'ShareID',
            as: 'portfolios' // Bu ilişkiye 'portfolios' takma adı verildi
        });

        Shares.hasMany(models.TraceRecords, { // TraceRecord yerine Transaction kullanılacak
            foreignKey: 'ShareID',
            as: 'transactions' // Bu ilişkiye 'transactions' takma adı verildi
        });
    };

    return Shares;
};
