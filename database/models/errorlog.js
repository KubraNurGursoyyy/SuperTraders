'use strict';

module.exports = (sequelize, DataTypes) => {
  const ErrorLogs = sequelize.define(
      'ErrorLogs',
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
