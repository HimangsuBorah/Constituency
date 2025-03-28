// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Starlight API',
      version: '1.0.0',
      description: 'API documentation for the Project Starlight backend',
      contact: {
        name: 'Himangsu Borah',
        email: 'himangsuborah255@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // <== your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
