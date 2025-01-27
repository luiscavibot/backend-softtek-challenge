import { ICacheRepository } from '../../domain/repositories/ICacheRepository';
import { injectable, inject } from 'tsyringe';
import { Redis } from 'ioredis';
import { RedisConnectiontSingleton } from '../db/RedisConnectiontSingleton';
import logger from '../logging/logger';

@injectable()
export class RedisCacheRepository implements ICacheRepository {
	private redisClient: Redis;

	constructor(
		@inject('RedisConnectiontSingleton')
		private redisConn: RedisConnectiontSingleton
	) {
		this.redisClient = this.redisConn.connection;
		logger.info('RedisCacheRepository inicializado.');
	}

	public async getValue<T>(key: string): Promise<T | null> {
		logger.info('Intentando obtener valor del caché.', { key });

		try {
			const data = await this.redisClient.get(key);
			if (data) {
				logger.info('Valor encontrado en el caché.', { key });
				return JSON.parse(data) as T;
			} else {
				logger.info('Clave no encontrada en el caché.', { key });
				return null;
			}
		} catch (error: any) {
			logger.error('Error al obtener valor del caché.', {
				key,
				error: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}

	public async setValue<T>(
		key: string,
		value: T,
		ttlSeconds: number
	): Promise<void> {
		logger.info('Intentando guardar valor en el caché.', {
			key,
			ttlSeconds,
		});

		try {
			const serialized = JSON.stringify(value);
			await this.redisClient.set(key, serialized, 'EX', ttlSeconds);
			logger.info('Valor guardado exitosamente en el caché.', { key });
		} catch (error: any) {
			logger.error('Error al guardar valor en el caché.', {
				key,
				error: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}
}
