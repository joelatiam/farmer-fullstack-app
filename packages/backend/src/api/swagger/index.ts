import swaggerJSDoc from 'swagger-jsdoc';
import { farmerPaths } from './paths/farmerPaths';
import { farmerDefinitions } from './definitions/farmerDefinitions';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Farmer API Documentation',
    version: '1.0.0',
    description: 'This is a REST API application made with Express. It retrieves data from a Farmer database.',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      ...farmerDefinitions
    }
  },
  paths: {
    ...farmerPaths
  }
};

const options = {
  swaggerDefinition,
  apis: [] 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
