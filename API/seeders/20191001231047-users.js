'use strict';

const bcrypt = require('bcrypt')
let passwordEncript = (password)=>{
  let salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt)
}

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'users',
    [
      {
        name: 'Francisco marinho',
        email: 'francisco.santos@a.ficr.edu.br',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: passwordEncript("1234568"), 
      },
      {
        name: 'Wartelon malthus',
        email: 'wartelon@a.ficr.edu.br',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: passwordEncript("1234568")
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};