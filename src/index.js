import "express-async-errors"
import 'dotenv/config'
import mongoose from 'mongoose';
import server from './config/server.js'
import app from './app.js'
import logger from './config/logger.js';

import Author from "./models/author.js";
import hash from "./utils/hash.js";

if(server.mongoose.url){
  mongoose.connect(server.mongoose.url, server.mongoose.options).then(() => {
    logger.info('Connected to MongoDB');
    seedData()

  });
}

let appServer = app.listen(server.port, () => {
  logger.info(`Listening to port ${server.port}`);
});

const seedData = async() => {
  logger.info('Data seeding started')
  const { email, name, userName, password } = server.seedData
  const hasedPassword = await hash(password)
  const newAuthor = new Author({
      email, 
      name, 
      userName,
      password: hasedPassword, 
      role:['Admin']
  })
  const result = await Author.updateOne({email}, { $setOnInsert: newAuthor}, { upsert: true})
  if(result.upsertedCount === 0) logger.info('Required data already exist')
  logger.info('Data seeding operation completed')
}

const exitHandler = () => {
  if (appServer) {
    appServer.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error)
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

