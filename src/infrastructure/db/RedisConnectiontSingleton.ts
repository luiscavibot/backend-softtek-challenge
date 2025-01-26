import { inject, singleton } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';
import IORedis, { Redis } from 'ioredis';

@singleton()
export class RedisConnectiontSingleton {
	private client: Redis;

	constructor(@inject('AppConfig') private config: IAppConfig) {
		const host = this.config.REDIS_HOST;
		const port = parseInt(this.config.REDIS_PORT, 10);

		this.client = new IORedis({
			host,
			port,
		});
	}

	get connection(): Redis {
		return this.client;
	}
}
