// src/infrastructure/repositories/RedisCacheRepository.ts
import { ICacheRepository } from '../../domain/repositories/ICacheRepository';
import { injectable, inject } from 'tsyringe';
import IORedis, { Redis } from 'ioredis';
import { IAppConfig } from '../../domain/config/IAppConfig';

/**
 * Implementación de caché usando Redis (ElastiCache)
 */
@injectable()
export class RedisCacheRepository implements ICacheRepository {
	private redisClient: Redis;

	constructor(@inject('AppConfig') private config: IAppConfig) {
		// config.REDIS_HOST debería provenir de env, pipeline, etc.
		const host =
			process.env.REDIS_HOST || this.config.REDIS_HOST || 'localhost';
		const port = parseInt(
			process.env.REDIS_PORT || this.config.REDIS_PORT || '6379',
			10
		);

		// ioredis require host + port (o TLS si es un cluster con auth)
		this.redisClient = new IORedis({
			host,
			port,
			// password: ... si tu cluster requiere auth
			// TLS config, etc.
		});
	}

	public async getValue<T>(key: string): Promise<T | null> {
		const data = await this.redisClient.get(key);
		return data ? (JSON.parse(data) as T) : null;
	}

	public async setValue<T>(
		key: string,
		value: T,
		ttlSeconds: number
	): Promise<void> {
		const serialized = JSON.stringify(value);
		await this.redisClient.set(key, serialized, 'EX', ttlSeconds); // EX => expira en X seg
	}
}
