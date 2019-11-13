'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate:{
          notEmpty: true,
          isEmail: true,
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      office: {
        type: DataTypes.STRING,
        defaultValue: "worker",
      },
      age:{
        type: DataTypes.INTEGER,
        defaultValue: 20
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('users');
  }
};