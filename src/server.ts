/* eslint-disable import/first */
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}
import { Server } from 'http';
import prisma from './client';
import app from './app';
import logger from './logger';

let server: Server;
const PORT = process.env.PORT || 3000;

// import { Pool } from 'pg';
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: parseInt('5433', 10)
// });
const serve = () => app.listen(PORT, () => {
  logger.info(`🌏 Express server started at http://localhost:${PORT}`);
});
const connectToDB = async () => {
  try {
    prisma.$connect().then(() => {
      logger.info('🐘 Connected to postgres Database');
      server = serve();
    });
  } catch (err) {
    logger.log({
      level: 'error',
      message: 'Error shutting closing postgresql connection',
      error: err
    });
    console.log('err :>> ', err);
  }
};

if (process.env.DATABASE_URL == null) {
  logger.error(
    'DATABASE_URL not specified in environment',
    new Error('DATABASE_URL not specified in environment')
  );
  process.exit(1);
} else {
  connectToDB();
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('⚙️ Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('⚙️ SIGTERM received');
  if (server) {
    server.close();
  }
});
