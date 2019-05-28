module.exports = function(sequelize, DataTypes) {
    var OpField = sequelize.define("OpField", {
      fieldName: {
          type: DataTypes.STRING,
          allowNull: false,
      }, 
      fieldNumber: { 
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      fieldRules: {
          type: DataTypes.DATE,
          allowNull: false
      },
      operatorID: {
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

    OpField.associate = function(models) {
        OpField.belongsTo(models.Operator, {
          foreignKey: {
            name: 'operatorID',
            allowNull: false
          }
        });
      };

      OpField.associate = function(models) {
        OpField.hasMany(models.Lease, {
            onDelete: "cascade",
            foreignKey: {
                name: 'fieldID'
            }
        });
      };

    return OpField;
  };