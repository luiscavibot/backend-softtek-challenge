// src/domain/repositories/ICacheRepository.ts
export interface ICacheRepository {
	getValue<T>(key: string): Promise<T | null>;
	setValue<T>(key: string, value: T, ttlSeconds: number): Promise<void>;
}
