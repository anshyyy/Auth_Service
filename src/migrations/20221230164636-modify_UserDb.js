'use strict';
var randomBytes = require('randombytes');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('Users','emailToken',{
      type:Sequelize.STRING,
      defaultValue:randomBytes(32).toString('hex'),
      allowNull:true,
  });
  await queryInterface.addColumn('Users','Name',{
    type:Sequelize.STRING,
    allowNull:false,
});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users','emailToken');
  }
};
