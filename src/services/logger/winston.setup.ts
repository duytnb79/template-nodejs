import { createLogger, format, transports } from 'winston';

const { combine, label, timestamp, colorize, printf, json } = format;

const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

export const cliLogger = createLogger({
  format: combine(
    label({ label: 'API' }),
    timestamp({ format: timestampFormat }),
    colorize({ level: true }),
    printf(
      ({ level, message, label, timestamp }) =>
        `[${timestamp}] ${level} (${label}): ${message}`,
    ),
  ),
  transports: [new transports.Console()],
});

// Logger for API endpoints
export const httpLogger = createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = { level, timestamp, message, data };
      return JSON.stringify(response, null, 4);
    }),
  ),
  transports: [new transports.Console({ silent: false })],
});
