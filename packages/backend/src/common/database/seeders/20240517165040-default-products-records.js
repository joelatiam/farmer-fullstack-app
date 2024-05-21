'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed data for seeds
    const seedsData = [
      { name: 'Tomato', type: 'Seed', price: 5.99, weightInKg: 0.1 },
      { name: 'Carrot', type: 'Seed', price: 4.49, weightInKg: 0.05 },
      { name: 'Lettuce', type: 'Seed', price: 3.99, weightInKg: 0.02 },
      { name: 'Cucumber', type: 'Seed', price: 6.99, weightInKg: 0.08 },
      { name: 'Bell pepper', type: 'Seed', price: 7.49, weightInKg: 0.12 }
    ];

    // Seed data for fertilizers
    const fertilizersData = [
      { name: 'Organic compost', type: 'Fertilizer', price: 9.99, weightInKg: 1.5 },
      { name: 'Fish emulsion', type: 'Fertilizer', price: 8.49, weightInKg: 1 },
      { name: 'Bone meal', type: 'Fertilizer', price: 10.99, weightInKg: 2 },
      { name: 'Blood meal', type: 'Fertilizer', price: 11.49, weightInKg: 1.5 },
      { name: 'Seaweed fertilizer', type: 'Fertilizer', price: 12.99, weightInKg: 1 }
    ];


    await queryInterface.bulkInsert('products', seedsData, {});

    await queryInterface.bulkInsert('products', fertilizersData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
