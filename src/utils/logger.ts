import { createLogger, transports, format } from 'winston';
import dotenv from 'dotenv';
dotenv.config();
interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}

const maxFiles = 5;

// 환경 변수를 통해 현재 환경을 가져옵니다 (예: development, production)
const currentEnvironment = process.env.NODE_ENV;
const loggerTransports = [];

// 프로덕션 환경인 경우
if (currentEnvironment === 'production') {
  // 에러 파일을 기록하는 transport를 추가합니다
  loggerTransports.push(
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
  );
  loggerTransports.push(
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
  );
} else {
  // 프로덕션 환경이 아닌 경우, 콘솔에 출력하는 transport를 추가합니다
  // loggerTransports.push(
  //   new transports.Console({
  //     level: 'info',
  //     format: format.combine(
  //       format.label({ label: '[maum-eum]' }),
  //       format.timestamp({
  //         format: 'YYYY-MM-DD HH:mm:ss',
  //       }),
  //       format.colorize(),
  //       format.printf(
  //         (info: TransformableInfo) =>
  //           `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`,
  //       ),
  //     ),
  //   }),
  // );

  loggerTransports.push(
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
  );
}

const logger = createLogger({
  transports: loggerTransports,
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
