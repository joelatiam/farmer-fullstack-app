import swaggerJSDoc from 'swagger-jsdoc';

import { APP_PORT, NODE_ENV, APP_URL } from '../../common/constants/app.env';
import { farmersPaths } from './paths/farmersPaths';
import { productsPaths } from './paths/productsPaths';
import { farmersDefinitions } from './definitions/farmersDefinitions';
import { productsDefinitions } from './definitions/productsDefinitions';
import {responses} from './definitions/responses';

const appURL = NODE_ENV === 'development' ? `http://localhost:${APP_PORT}/api` : APP_URL;
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Farmers API Documentation',
    version: '1.0.0',
    description: 'This is a REST API application made with Express. It retrieves data from a Farmer database.',
  },
  servers: [
    {
      url: appURL,
      description: `${NODE_ENV} server`,
    },
  ],
  components: {
    schemas: {
      ...farmersDefinitions,
      ...productsDefinitions,
      ...responses,
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
