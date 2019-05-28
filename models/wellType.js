module.exports = function(sequelize, DataTypes) {
    var WellType = sequelize.define("WellType", {
      wellType: {
          type: DataTypes.STRING,
          allowNull: false,
      }
    }); 

    return WellType;
  };