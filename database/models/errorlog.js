'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ErrorLogs extends Model {
        static associate(models) {

        }
    }
    ErrorLogs.init({
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        stack: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'ErrorLogs',
    });
    return ErrorLogs;
};