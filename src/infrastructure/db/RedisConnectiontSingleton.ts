import { inject, singleton } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';
import IORedis, { Redis } from 'ioredis';
import AWSXRay from 'aws-xray-sdk';
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
			const baseClient = new IORedis({
				host,
				port,
			});

			this.client = this.instrumentRedis(baseClient);

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

	private instrumentRedis(redisClient: Redis): Redis {
		const captureRedisOperation = (
			operation: string,
			args: any[],
			callback: Function
		) => {
			const subsegment = AWSXRay.getSegment()?.addNewSubsegment(
				`Redis - ${operation}`
			);
			if (subsegment) {
				subsegment.addMetadata('operation', operation);
				subsegment.addMetadata('arguments', args);
			}

			try {
				const result = callback();
				subsegment?.close();
				return result;
			} catch (error: any) {
				subsegment?.addError(error);
				subsegment?.close();
				throw error;
			}
		};

		const instrumentedClient = new Proxy(redisClient, {
			get(target, propKey) {
				const original = target[propKey as keyof Redis];
				if (typeof original === 'function') {
					return (...args: any[]) =>
						captureRedisOperation(propKey.toString(), args, () =>
							(original as Function).apply(target, args)
						);
				}
				return original;
			},
		});

		return instrumentedClient;
	}
}
