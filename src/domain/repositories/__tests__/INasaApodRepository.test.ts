import { ApodData } from '../../entities/ApodData';
import { INasaApodRepository } from '../INasaApodRepository';

// Mock implementation for INasaApodRepository
class MockNasaApodRepository implements INasaApodRepository {
	private mockData: ApodData[] = [
		{
			copyright: 'NASA',
			date: '2025-01-01',
			explanation: 'A beautiful view of a distant galaxy.',
			hdurl: 'https://example.com/hd-galaxy.jpg',
			media_type: 'image',
			service_version: 'v1',
			title: 'Galaxy Wonders',
			url: 'https://example.com/galaxy.jpg',
		},
		{
			date: '2025-01-02',
			explanation: 'A mesmerizing nebula captured by NASA.',
			media_type: 'image',
			service_version: 'v1',
			title: 'Nebula Dreams',
			url: 'https://example.com/nebula.jpg',
		},
	];

	async getRandomApod(): Promise<ApodData> {
		const randomIndex = Math.floor(Math.random() * this.mockData.length);
		return this.mockData[randomIndex];
	}
}

describe('INasaApodRepository', () => {
	let repository: INasaApodRepository;

	beforeEach(() => {
		repository = new MockNasaApodRepository();
	});

	it('should return a random APOD', async () => {
		const apod = await repository.getRandomApod();

		expect(apod).toBeDefined();
		expect(apod).toHaveProperty('date');
		expect(apod).toHaveProperty('explanation');
		expect(apod).toHaveProperty('media_type');
		expect(apod).toHaveProperty('service_version');
		expect(apod).toHaveProperty('title');
		expect(apod).toHaveProperty('url');
	});

	it('should return an APOD with valid data types', async () => {
		const apod = await repository.getRandomApod();

		expect(typeof apod.date).toBe('string');
		expect(typeof apod.explanation).toBe('string');
		expect(typeof apod.media_type).toBe('string');
		expect(typeof apod.service_version).toBe('string');
		expect(typeof apod.title).toBe('string');
		expect(typeof apod.url).toBe('string');

		if (apod.copyright) {
			expect(typeof apod.copyright).toBe('string');
		}

		if (apod.hdurl) {
			expect(typeof apod.hdurl).toBe('string');
		}
	});
});
