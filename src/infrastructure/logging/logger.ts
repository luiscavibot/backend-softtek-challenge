import winston from 'winston';

const { combine, timestamp, printf } = winston.format;

const isOffline = process.env.IS_OFFLINE === 'true';

const logFormat = printf(({ level, message, timestamp, ...meta }) => {
	const logMessage = `[${level.toUpperCase()}]: ${message} ${
		Object.keys(meta).length ? JSON.stringify(meta) : ''
	}`;
	return isOffline ? `${timestamp} ${logMessage}` : logMessage;
});

const logger = winston.createLogger({
	level: isOffline ? 'debug' : process.env.LOG_LEVEL || 'info',
	format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
	transports: [new winston.transports.Console()],
});
export default logger;
