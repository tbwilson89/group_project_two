module.exports = function(sequelize, DataTypes) {
  var Lease = sequelize.define("Lease", {
    districtNumber: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    countyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    leaseName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    leaseNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fieldID: {
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

  Lease.associate = function(models) {
    Lease.belongsTo(models.OpField, {
      foreignKey: {
        name: 'fieldID',
        allowNull: false
      }
    });
  };

  Lease.associate = function(models) {
    Lease.hasMany(models.Wells, {
        onDelete: "cascade",
        foreignKey: {
            name: 'leaseID'
        }
    });
  };

  return Lease;
};
