'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     * 
     */

    queryInterface.addColumn('task_categories','instruction',{
      type:Sequelize.JSONB
    })

    queryInterface.addColumn('task_categories','requirements',{
      type:Sequelize.JSONB
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('task_categories','instruction',{
      type:Sequelize.JSONB
    })

    queryInterface.removeColumn('task_categories','requirements',{
      type:Sequelize.ENUM('link','image')
    })
  }
};
