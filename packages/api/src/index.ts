import express from 'express';
import Sequelize from 'sequelize';
// import { sequelizeConfig } from './config/db.config';

import {APP_PORT} from './common/constants/app';

const app = express();

// Initialize Sequelize with database connection
// const sequelize = new Sequelize(sequelizeConfig);

// Import and initialize models
// import { Farmer, Product, Order } from './models';

// ... (Define associations between models if needed)

// Start the server
async function startServer() {
  try {
    // await sequelize.sync(); // Synchronize models with database
    app.listen(APP_PORT, () => console.log(`Server listening on port ${APP_PORT}`));
  } catch (error) {
    console.error(error);
    // process.exit(1);
  }
}

startServer();
