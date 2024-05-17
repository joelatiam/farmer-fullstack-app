import swaggerJSDoc from 'swagger-jsdoc';

import { APP_PORT, NODE_ENV } from '../../common/constants/app';
import { farmersPaths } from './paths/farmersPaths';
import { productsPaths } from './paths/productsPaths';
import { farmersDefinitions } from './definitions/farmersDefinitions';
import { productsDefinitions } from './definitions/productsDefinitions';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Farmer API Documentation',
    version: '1.0.0',
    description: 'This is a REST API application made with Express. It retrieves data from a Farmer database.',
  },
  servers: [
    {
      url: `http://localhost:${APP_PORT}/api`,
      description: `${NODE_ENV} server`,
    },
  ],
  components: {
    schemas: {
      ...farmersDefinitions,
      ...productsDefinitions,
    }
  },
  paths: {
    ...farmersPaths,
    ...productsPaths
  }
};

const options = {
  swaggerDefinition,
  apis: [] 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
