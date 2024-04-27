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
|   |-- routes/
|   |-- configs/
|   |-- models/
|   |-- services/
|   |-- utils/
|
|-- .env (environment variables)
|-- app.js (main application file)
|-- package.json
```

## Environment Variables

Variables are defined in the `.env.example` file located at the root of the project. Here’s how to set up and use environment variables:

### Adding Environment Variables

1. **Duplicate `.env.example` and rename to `.env` file**
2. **Define Variables**: Add variables on new lines in the format `KEY=VALUE`, for example:
   ```plaintext
   MONGODB_URL=mongodb://username:password@localhost:27017/database
   PORT=3000
   NODE_ENV=development
   ```

## How to Dev?

To run the project to dev, execute the following commands in the terminal:

1. **Install Dependencies**:
   ```bash
   yarn install
   ```
2. **Start the Server**:
   ```bash
   yarn dev
   ```

Make sure your MongoDB service is up and running before starting the app, especially if it is being run locally.
