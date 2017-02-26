'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    RoleId: DataTypes.INTEGER,
    salt: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsTo(models.Role)
      }
    }
  });
  return User;
};
