'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Shares extends Model {
        static associate(models) {
            Shares.hasMany(models.QuantityOfSharesInPortfolio, {
                foreignKey: 'shareID',
            });

            Shares.hasMany(models.TraceRecords, {
                foreignKey: 'shareID',
            });
        }
    }

    Shares.init({
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Shares',
    });

    return Shares;
};
