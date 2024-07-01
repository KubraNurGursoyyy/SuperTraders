'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
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
        type: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        shareID: {
            type: DataTypes.UUID,
        },
        portfolioID: {
            type: DataTypes.UUID,
        },
        time: {
            type: DataTypes.DATE,
        },
        priceAtTheTimeOfTraceRecord: {
            type: DataTypes.FLOAT,
        }
    }, {
        sequelize,
        modelName: 'TraceRecords',
    });

    return TraceRecords;
};
