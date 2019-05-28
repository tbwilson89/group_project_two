module.exports = function(sequelize, DataTypes) {
    var Wells = sequelize.define("Wells", {
      wellName: {
          type: DataTypes.STRING,
          allowNull: false
      }, 
      apiNumber: { 
          type: DataTypes.STRING,
          allowNull: false
      },
      wellType: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      dateCompleted: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dateInactive: {
        type: DataTypes.DATE,
        allowNull: true
    },
    h10Rules: {
        type: DataTypes.DATE
    },
    leaseID: {
        type: DataTypes.INTEGER,
        allowNull: false
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

    Wells.associate = function(models) {
        Wells.belongsTo(models.Lease, {
          foreignKey: {
            name: 'leaseID',
            allowNull: false
          }
        });
      };

      Wells.associate = function(models) {
        Wells.hasMany(models.Tests, {
            onDelete: "cascade",
            foreignKey: {
                name: 'wellID'
            }
        });
      };

    return Wells;
  };