'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const dataUser = require('../data/users.json')
   dataUser.forEach(el => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
    el.password = bcrypt.hashSync(el.password,10)
   })

   await queryInterface.bulkInsert('Users', dataUser)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', {})
  }
};
