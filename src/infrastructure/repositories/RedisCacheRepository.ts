import { ICacheRepository } from '../../domain/repositories/ICacheRepository';
import { injectable, inject } from 'tsyringe';
import IORedis, { Redis } from 'ioredis';
import { IAppConfig } from '../../domain/config/IAppConfig';

@injectable()
export class RedisCacheRepository implements ICacheRepository {
	private redisClient: Redis;

	constructor(@inject('AppConfig') private config: IAppConfig) {
		const host =
			process.env.REDIS_HOST || this.config.REDIS_HOST || 'localhost';
		const port = parseInt(
			process.env.REDIS_PORT || this.config.REDIS_PORT || '6379',
			10
		);

		this.redisClient = new IORedis({
			host,
			port,
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
