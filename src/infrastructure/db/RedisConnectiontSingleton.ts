import { inject, singleton } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';
import IORedis, { Redis } from 'ioredis';
import logger from '../logging/logger';

@singleton()
export class RedisConnectiontSingleton {
	private client: Redis;

	constructor(@inject('AppConfig') private config: IAppConfig) {
		const host = this.config.REDIS_HOST;
		const port = parseInt(this.config.REDIS_PORT, 10);

		logger.info('Inicializando conexión a Redis.', {
			host,
			port,
		});

		try {
			this.client = new IORedis({
				host,
				port,
			});
			logger.info('Conexión a Redis establecida exitosamente.');
		} catch (error: any) {
			logger.error('Error al inicializar conexión a Redis.', {
				error: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}

	get connection(): Redis {
		logger.debug('Cliente Redis solicitado.');
		return this.client;
	}
}
