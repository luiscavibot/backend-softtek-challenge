import { ICacheRepository } from '../../domain/repositories/ICacheRepository';
import { injectable, inject } from 'tsyringe';
import { Redis } from 'ioredis';
import { RedisConnectiontSingleton } from '../db/RedisConnectiontSingleton';

@injectable()
export class RedisCacheRepository implements ICacheRepository {
	private redisClient: Redis;

	constructor(
		@inject('RedisConnectiontSingleton')
		private redisConn: RedisConnectiontSingleton
	) {
		this.redisClient = this.redisConn.connection;
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
