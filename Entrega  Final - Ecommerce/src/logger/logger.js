// logger.js
import winston from 'winston';

const developmentLogger = winston.createLogger({
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warn: 3,
    error: 4,
    fatal: 5,
  },
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

const productionLogger = winston.createLogger({
  levels: {
    info: 0,
    warn: 1,
    error: 2,
    fatal: 3,
  },
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'production.log' }),
  ],
});

const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger;

export default logger;
