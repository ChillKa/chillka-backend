# chillka-backend

## Project Overview

This project is built using TypeScript, Express, and MongoDB.

## Project Structure

The project files and directories are organized as follows:

```
/root
|-- node_modules/
|   |-- (all modules installed by npm)
|
|-- public/
|
|-- src/
|   |-- route/
|   |-- middleware/
|   |-- model/
|   |-- service/
|   |-- swagger/
|   |-- type/
|   |-- util/
|
|-- .env (environment variables)
|-- app.js (main application file)
|-- package.json
```

## How to Dev?

To run the project to dev, execute the following commands in the terminal:

1. **Adding Environment Variables**:

   1-1. **Duplicate `.env.example` and rename to `.env` file**

   1-2. **Define Variables**: Add variables on new lines in the format `KEY=VALUE`, for example:

   ```plaintext
   MONGODB_URL=mongodb://username:password@localhost:27017/database
   PORT=8000
   NODE_ENV=development
   ```

2. **(Optional) If you don't have MongoDB, you can use Docker to add it**:

   ```bash
   docker-compose -f docker-compose.dev.yml up
   // modify the .env
   MONGODB_URL=mongodb://root:example@localhost:27017/?authSource=admin
   ```

3. **Install Dependencies**:
   ```bash
   yarn install
   ```
4. **Start the Server**:
   ```bash
   yarn dev
   ```

Make sure your MongoDB service is up and running before starting the app, especially if it is being run locally.

## Documentation

Use Swagger for API documentation, check on `schemaGenerator.js` for more detailed scripts.

1. **Generate Schemas**

Please ensure keeping all the types in `src/type` folder to build the schemas inside `src/swagger/build`.

```bash
# Autogenerate swagger-output.json
yarn swagger

```

2. **Add Swagger Comments**

Use swagger 2.0 features, check on [document](https://swagger-autogen.github.io/docs/swagger-2/) for more details.
