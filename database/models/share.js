'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Shares extends Model {
        static associate(models) {
            Shares.hasMany(models.QuantityOfSharesInPortfolios, {
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
