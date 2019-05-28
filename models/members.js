module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("Member", {
      memberName: {
          type: DataTypes.STRING,
          allowNull: false,
      }, 
      memberTitle: { 
          type: DataTypes.STRING,
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
    
    return Member;
  };