const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger-output.json';
const rootFiles = ['./src/app.ts'];
const doc = {
  info: {
    title: 'Chillka API',
  },
  host: 'localhost:8000',
};

swaggerAutogen(outputFile, rootFiles, doc);
