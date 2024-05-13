// This file transforms interfaces into JSON objects to be used by swagger

const glob = require('glob');
const path = require('path');
const tjs = require('typescript-json-schema');
const fs = require('fs');

const settings = {
  required: true,
  ref: false,
};
const compilerOptions = {
  strictNullChecks: true,
};

const schemaFiles = glob.sync('src/type/*.ts');
const schemaFilesPaths = schemaFiles.map((file) => path.resolve(file));
const program = tjs.getProgramFromFiles(
  schemaFilesPaths,
  compilerOptions,
  './'
);

const schema = tjs.generateSchema(program, '*', settings);
const buildPath = path.join(__dirname, 'build/_schema.ts');
fs.writeFileSync(
  buildPath,
  '// THIS FILE IS AUTO-GENERATED BY SCHEMAGENERATOR.JS\n' +
    '/* tslint:disable */\n/* eslint-disable */\n/* prettier-ignore */\n' +
    'export const _schema = ' +
    JSON.stringify(schema, null, 4) +
    ';'
);
