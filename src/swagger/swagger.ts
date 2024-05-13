import swaggerAutogen from 'swagger-autogen';
import { _schema } from './build/_schema';

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.ts'];
const doc = {
  info: {
    title: 'Chillka API',
  },
  host: process.env.HOST,
  schemes: ['http', 'https'],
  definitions: _schema.definitions,
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
