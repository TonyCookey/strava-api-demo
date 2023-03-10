'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Athletes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      access_token: {
        type: Sequelize.STRING
      },
      refresh_token: {
        type: Sequelize.STRING
      },
      expires_at: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Athletes');
  }
};