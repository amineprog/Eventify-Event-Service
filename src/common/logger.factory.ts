import { transports, format, createLogger } from 'winston';

const serviceName = 'event-service';

const nestToWinstonLevel = {
    log: 'info',
    error: 'error',
    warn: 'warn',
    debug: 'debug',
    verbose: 'debug',
};

const customConsoleFormat = format.combine(
    format.timestamp(),
    format.json(),
    format.printf((info) => {
        return JSON.stringify({
            service: serviceName,
            context: info.context || serviceName,
            level: info.level,
            message: info.message,
            timestamp: info.timestamp,
            environment: process.env.NODE_ENV || 'development',
            requestId: info.requestId || null,
        });
    })
);
const logger = createLogger({
    level: 'info',
    format: customConsoleFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log' })
    ],
});
export function mapNestToWinstonLevel(level: string): string {
    return nestToWinstonLevel[level] || 'info'; 
}
export default logger;
/*
export const logger = WinstonModule.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
});*/