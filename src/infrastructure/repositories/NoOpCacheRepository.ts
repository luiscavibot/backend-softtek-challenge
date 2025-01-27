import { ICacheRepository } from '../../domain/repositories/ICacheRepository';
import logger from '../logging/logger';

export class NoOpCacheRepository implements ICacheRepository {
	async getValue<T>(key: string): Promise<T | null> {
		logger.debug('NoOpCacheRepository: getValue called.', { key });
		return null;
	}

	async setValue<T>(
		key: string,
		value: T,
		ttlSeconds: number
	): Promise<void> {
		logger.debug('NoOpCacheRepository: setValue called.', {
			key,
			value,
			ttlSeconds,
		});
	}
}
