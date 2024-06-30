'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TraceRecords extends Model {
        static associate(models) {
            TraceRecords.belongsTo(models.Shares, {
                foreignKey: 'shareID',
                onDelete: 'CASCADE'
            });

            TraceRecords.belongsTo(models.Portfolios, {
                foreignKey: 'portfolioID',
                onDelete: 'CASCADE'
            });
        }
    }

    TraceRecords.init({
        Type: {
            type: DataTypes.BOOLEAN,
        },
        Quantity: {
            type: DataTypes.INTEGER,
        },
        shareID: {
            type: DataTypes.UUID,
        },
        portfolioID: {
            type: DataTypes.UUID,
        },
        Time: {
            type: DataTypes.DATE,
        },
        PriceAtTheTimeOfTraceRecord: {
            type: DataTypes.FLOAT,
        }
    }, {
        sequelize,
        modelName: 'TraceRecords',
    });

    return TraceRecords;
};
