import { ICacheRepository } from '../ICacheRepository';

describe('ICacheRepository', () => {
	let cacheRepository: ICacheRepository;

	beforeEach(() => {
		cacheRepository = {
			getValue: jest.fn(),
			setValue: jest.fn(),
		};
	});

	it('should get value from cache', async () => {
		const key = 'testKey';
		const value = 'testValue';
		(cacheRepository.getValue as jest.Mock).mockResolvedValue(value);

		const result = await cacheRepository.getValue<string>(key);

		expect(cacheRepository.getValue).toHaveBeenCalledWith(key);
		expect(result).toBe(value);
	});

	it('should return null if value is not in cache', async () => {
		const key = 'testKey';
		(cacheRepository.getValue as jest.Mock).mockResolvedValue(null);

		const result = await cacheRepository.getValue<string>(key);

		expect(cacheRepository.getValue).toHaveBeenCalledWith(key);
		expect(result).toBeNull();
	});

	it('should set value in cache', async () => {
		const key = 'testKey';
		const value = 'testValue';
		const ttlSeconds = 60;

		await cacheRepository.setValue<string>(key, value, ttlSeconds);

		expect(cacheRepository.setValue).toHaveBeenCalledWith(
			key,
			value,
			ttlSeconds
		);
	});
});
