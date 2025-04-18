'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('community_groups','booth_id',{
      type:Sequelize.STRING,
      allowNUll:true
    })

    await queryInterface.addColumn('community_groups','gaon_panchayat_id',{
      type:Sequelize.STRING,
      allowNUll:true
    })


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('community_groups','booth_id')
    await queryInterface.removeColumn('community_groups','gaon_panchayat_id')
    
  }
};
