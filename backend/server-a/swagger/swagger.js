const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sandwich Order API',
      version: '1.0.0',
      description: 'API documentation for managing sandwich orders',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Server A',
      },
    ],
  },
  apis: [path.resolve(__dirname, '../controllers/*.js')], // Path to controller files
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
