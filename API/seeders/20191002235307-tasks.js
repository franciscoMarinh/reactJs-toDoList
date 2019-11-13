'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'tasks',
    [
      {
        title: "Atualizar Documentação do software",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },
      {
        title: "Fazer minha refeições",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },
      {
        title: "Dormir quando chegar em casa2!!",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2
      },
      {
        title: "Dormir quando chegar em casa!!",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2
      },
      {
        title: "Fazer minha refeição quando chegar em casa",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },
      {
        title: "Fazer minha refeição2",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('tasks', null, {}),
};