'use strict';

module.exports = (sequelize, DataTypes) => {
  const TraceRecords = sequelize.define(
      'TraceRecords',
      {
        Type: DataTypes.BOOLEAN,
        Quantity: DataTypes.INTEGER,
        shareID: DataTypes.UUID,
        portfolioID: DataTypes.UUID,
        Time: DataTypes.DATE,
        PriceAtTheTimeOfTraceRecord: DataTypes.FLOAT
      }
  );

    TraceRecords.associate = function(models) {
        TraceRecords.belongsTo(models.Shares, {
      foreignKey: 'shareID',
        onDelete: 'CASCADE'
    });

        TraceRecords.belongsTo(models.Portfolios, {
      foreignKey: 'portfolioID',
        onDelete: 'CASCADE'
    });
  };

  return TraceRecords;
};
