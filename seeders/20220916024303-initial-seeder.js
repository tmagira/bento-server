'use strict';

const {hashPassword} = require('../helpers/bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = require('../data.json').users

    users.forEach(user => {
      user.password = hashPassword(user.password)
      user.createdAt = new Date()
      user.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Users', users)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users')
  }
};
