'use strict';

import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const ErrorLogs = (sequelize) => {
    const ErrorLog = sequelize.define(
        'ErrorLog',
        {
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
      }
  );

  ErrorLogs.associate = function(models) {
  };

  return ErrorLogs;
};

export default ErrorLogs;

