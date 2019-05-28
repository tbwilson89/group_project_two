module.exports = function(sequelize, DataTypes) {
    var Tests = sequelize.define("Tests", {
      testID: DataTypes.INTEGER,
      leaseID: DataTypes.INTEGER,
      wellID: DataTypes.INTEGER,
      dueDate: DataTypes.DATE,
      createdAt: { s
        type: DataTypes.DATE,
        field: 'beginTime',
        defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updateTime',
        defaultValue: sequelize.literal('NOW()')
    }
    });
    
    Tests.associate = function(models) {
      Tests.belongsTo(models.Wells, {
        foreignKey: {
          name: 'wellID',
          allowNull: false
        }
      });
    };

    Tests.associate = function(models) {
      Tests.belongsTo(models.Filings, {    
          foreignKey: {
              name: 'testID'
          }
      });
    };

    return Tests;
  };

  