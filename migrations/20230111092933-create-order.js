'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderIdNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      shoesBrand: {
        allowNull: false,
        type: Sequelize.STRING
      },
      shoesSize: {
        allowNull: false,
        type: Sequelize.STRING
      },
      shoesColor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      shoesMaterial: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phoneNumberPIC: {
        allowNull: false,
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      pickUpAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      photoAfter: {
        type: Sequelize.STRING
      },
      status: {
        defaultValue: 'On Request',
        type: Sequelize.STRING
      },
      estimatedDate: {
        type: Sequelize.DATE
      },
      completedDate: {
        type: Sequelize.DATE
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      ServiceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Services',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
    await queryInterface.dropTable('Orders');
  }
};