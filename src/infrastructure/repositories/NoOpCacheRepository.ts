// src/infrastructure/repositories/NoOpCacheRepository.ts
import { ICacheRepository } from '../../domain/repositories/ICacheRepository';

export class NoOpCacheRepository implements ICacheRepository {
	async getValue<T>(key: string): Promise<T | null> {
		return null;
	}

	async setValue<T>(
		key: string,
		value: T,
		ttlSeconds: number
	): Promise<void> {
		// No hace nada
	}
}
