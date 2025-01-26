import { ApodData } from '../ApodData';

describe('ApodData Interface', () => {
	it('should allow valid ApodData objects', () => {
		const validApodData: ApodData = {
			date: '2023-10-01',
			explanation: 'A beautiful image of the cosmos.',
			media_type: 'image',
			service_version: 'v1',
			title: 'Cosmic Beauty',
			url: 'http://example.com/image.jpg',
		};
		expect(validApodData).toBeDefined();
	});

	it('should allow optional fields to be omitted', () => {
		const validApodData: ApodData = {
			date: '2023-10-01',
			explanation: 'A beautiful image of the cosmos.',
			media_type: 'image',
			service_version: 'v1',
			title: 'Cosmic Beauty',
			url: 'http://example.com/image.jpg',
		};
		expect(validApodData.copyright).toBeUndefined();
		expect(validApodData.hdurl).toBeUndefined();
	});

	it('should allow optional fields to be included', () => {
		const validApodData: ApodData = {
			copyright: 'NASA',
			date: '2023-10-01',
			explanation: 'A beautiful image of the cosmos.',
			hdurl: 'http://example.com/hdimage.jpg',
			media_type: 'image',
			service_version: 'v1',
			title: 'Cosmic Beauty',
			url: 'http://example.com/image.jpg',
		};
		expect(validApodData.copyright).toBe('NASA');
		expect(validApodData.hdurl).toBe('http://example.com/hdimage.jpg');
	});
});
