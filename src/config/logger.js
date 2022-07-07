import { createLogger, format, transports } from "winston";
const { combine, timestamp, colorize, printf } = format;

const logFormat = printf(({ level, message,  timestamp }) => {
  return `[${level}]: ${timestamp}  ${message}`;
});


const logger = createLogger({
    level: 'silly',
    format: combine(
      timestamp({ format: "HH:mm:ss" }),
      colorize(),
      logFormat
    ),
    transports: [new transports.Console()]
  });

export default logger;