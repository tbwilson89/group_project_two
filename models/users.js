module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      userName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      // userPassword: {
      //     type: DataTypes.STRING,
      //     allowNull: false
      // },
      googleId: {
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
    Users.associate = function(models) {
      Users.hasMany(models.Tests, {
          onDelete: "cascade",
          foreignKey: {
              name: 'usrID'
          }
      });
    };

    return Users;
  };
