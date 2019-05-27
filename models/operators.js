module.exports = function(sequelize, DataTypes) {
    var Operator = sequelize.define("Operator", {
      operatorName: {
          type: DataTypes.STRING,
          allowNull: false,
      }, 
      operatorNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      operatorAddress: {
          type: DataTypes.STRING,
          allowNull: false
      },
      operatorPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    operatorBirthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    h15Rules: {
        type: DataTypes.DATE,
        allowNull: false
    },
    authID: {
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

    Operator.associate = function(models) {
        Operator.hasMany(models.OpField, {
            onDelete: "cascade",
            foreignKey: {
                name: 'operatorID'
            }
        });
      };

    return Operator;
  };