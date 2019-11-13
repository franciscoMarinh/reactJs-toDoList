'use strict';

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {

    name: DataTypes.STRING,
    email: DataTypes.STRING,
    office: DataTypes.STRING,
    age: DataTypes.INTEGER,
    password: DataTypes.STRING,

    
  }, {
    hooks:{
      beforeSave: (user,options) => {
        const salt = bcrypt.genSaltSync();
        return user.password = bcrypt.hashSync(user.password, salt);
      },
    }
  });

  users.associate = (models) => {
    users.hasMany(models.tasks,{
      foreignKey: 'userId',
      targetKey: 'userId'

    });
  };
  users.isPassword = (encodedPassord, password) => {
    
    return bcrypt.compareSync(password, encodedPassord)

  }
  return users;
};