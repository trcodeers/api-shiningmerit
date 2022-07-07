import "express-async-errors"
import 'dotenv/config'
import mongoose from 'mongoose';
import server from './config/server.js'
import app from './app.js'
import logger from './config/logger.js';

if(server.mongoose.url){
  mongoose.connect(server.mongoose.url, server.mongoose.options).then(() => {
    logger.info('Connected to MongoDB');
  });
}

let appServer = app.listen(server.port, () => {
  logger.info(`Listening to port ${server.port}`);
});

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

