import swaggerAutogen from 'swagger-autogen';
import { _schema } from './build/_schema';

const outputFile = './swagger-output.json';
const endpointsFiles = ['../app.ts'];

const doc = {
  info: {
    title: 'Chillka Rest API',
  },
  host: process.env.HOST,
  schemes: ['http', 'https'],
  schemas: _schema.definitions,
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      scheme: 'bearer',
      description: 'Prefix in `Bearer ${token}`',
    },
  },
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
