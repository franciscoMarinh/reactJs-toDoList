'use strict';
module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define('tasks', {

    title: DataTypes.STRING,
    userId: DataTypes.UUID,
    status: DataTypes.STRING,


  }, {});
  tasks.associate = function(models) {
    tasks.belongsTo(models.users,{
      
      foreignKey: 'id',
      soucerKey: "userId",
    })
  };
  return tasks;
};