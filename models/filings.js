module.exports = function(sequelize, DataTypes) {
    var Filings = sequelize.define("Filings", {
      filingName: {
          type: DataTypes.STRING,
          allowNull: false
      }, 
      wellType: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      frequency: {
          type: DataTypes.STRING,
          allowNull: false
      },
      contactName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
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

    Filings.associate = function(models) {
        Filings.hasMany(models.Tests, {
          onDelete: "cascade",
          foreignKey: {
            name: 'testID',
            allowNull: false
          } 
        });
      };

    return Filings;
  };