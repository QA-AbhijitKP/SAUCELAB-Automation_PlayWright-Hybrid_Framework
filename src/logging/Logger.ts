
import fs from 'fs';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const env = process.env.ENVIRONMENT || 'dev';

const logger = winston.createLogger({
  level: 'info',

  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),

    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
  ),

  transports: [
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: `logs/Env-${env}-application-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d'
    }),

    new DailyRotateFile({
      filename: `logs/Env-${env}-error-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '30d'
    })
  ]
});

export default logger;
