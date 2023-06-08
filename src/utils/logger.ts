import { createLogger, transports, format } from 'winston';

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}

const maxFiles = 5;

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.label({ label: '[maum-eum]' }),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.colorize(),
        format.printf(
          (info: TransformableInfo) =>
            `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`,
        ),
      ),
    }),
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.label({ label: '[maum-eum]' }),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.colorize(),
        format.printf(
          (info: TransformableInfo) =>
            `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`,
        ),
      ),
    }),
    new transports.File({
      level: 'error',
      filename: 'config/error.log',
      format: format.combine(
        format.label({ label: '[maum-eum]' }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info: TransformableInfo) => {
          const errorMessage = `${info.timestamp} - ${info.level}: ${info.label} ${info.message} ${info.name}`;
          const stackTrace = info.stack ? `\n${info.stack}` : '';
          return errorMessage + stackTrace;
        }),
      ),
      maxFiles: maxFiles,
    }),
  ],
});

const levels = {
  error: 0, // 'red'
  warn: 1, // 'yellow'
  info: 2, // 'green'
  http: 3, // 'green'
  verbose: 4, // 'cyan'
  debug: 5, // 'blue'
  silly: 6, // 'magenta'
};

export { logger };
