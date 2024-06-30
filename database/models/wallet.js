'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Wallets extends Model {
        static associate(models) {
            Wallets.belongsTo(models.Users, {
                foreignKey: 'userID',
                onDelete: 'CASCADE'
            });
        }
    }

    Wallets.init({
        userID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0
        }
    }, {
        sequelize,
        modelName: 'Wallets',
    });

    return Wallets;
};
