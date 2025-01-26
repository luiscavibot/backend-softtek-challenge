import { ApodData } from '../ApodData';
import { HistoryRecord, HistoryRecordData } from '../HistoryRecord';
import { SWPerson } from '../SWPerson';

// Mock de datos para las interfaces
const mockApodData: ApodData = {
	date: '2025-01-25',
	explanation: 'A stunning galaxy captured by the Hubble telescope.',
	media_type: 'image',
	service_version: 'v1',
	title: 'Galaxy Photo',
	url: 'https://example.com/galaxy.jpg',
};

const mockSWPerson: SWPerson = {
	name: 'Luke Skywalker',
	height: '172',
	mass: '77',
	hair_color: 'blond',
	skin_color: 'fair',
	eye_color: 'blue',
	birth_year: '19BBY',
	gender: 'male',
	homeworld: 'https://swapi.dev/api/planets/1/',
	films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
	species: [],
	vehicles: [
		'https://swapi.dev/api/vehicles/14/',
		'https://swapi.dev/api/vehicles/30/',
	],
	starships: [
		'https://swapi.dev/api/starships/12/',
		'https://swapi.dev/api/starships/22/',
	],
	created: '2014-12-09T13:50:51.644000Z',
	edited: '2014-12-20T21:17:56.891000Z',
	url: 'https://swapi.dev/api/people/1/',
};

const mockData: HistoryRecordData = {
	...mockSWPerson,
	randomGalaxyPhoto: mockApodData,
};

const mockHistoryRecord: HistoryRecord = {
	id: '1',
	endpoint: '/api/galaxies',
	timestamp: '2025-01-25T12:34:56.789Z',
	responseData: [mockData],
};

describe('HistoryRecord Interface', () => {
	it('should match the structure of HistoryRecord', () => {
		expect(mockHistoryRecord).toHaveProperty('id');
		expect(typeof mockHistoryRecord.id).toBe('string');

		expect(mockHistoryRecord).toHaveProperty('endpoint');
		expect(typeof mockHistoryRecord.endpoint).toBe('string');

		expect(mockHistoryRecord).toHaveProperty('timestamp');
		expect(typeof mockHistoryRecord.timestamp).toBe('string');

		expect(mockHistoryRecord).toHaveProperty('responseData');
		expect(Array.isArray(mockHistoryRecord.responseData)).toBeTruthy();

		const data = mockHistoryRecord.responseData[0];

		expect(data).toHaveProperty('randomGalaxyPhoto');
		expect(data.randomGalaxyPhoto).toHaveProperty('date');
		expect(typeof data.randomGalaxyPhoto.date).toBe('string');
		expect(data.randomGalaxyPhoto).toHaveProperty('explanation');
		expect(typeof data.randomGalaxyPhoto.explanation).toBe('string');
		expect(data.randomGalaxyPhoto).toHaveProperty('media_type');
		expect(typeof data.randomGalaxyPhoto.media_type).toBe('string');
		expect(data.randomGalaxyPhoto).toHaveProperty('service_version');
		expect(typeof data.randomGalaxyPhoto.service_version).toBe('string');
		expect(data.randomGalaxyPhoto).toHaveProperty('title');
		expect(typeof data.randomGalaxyPhoto.title).toBe('string');
		expect(data.randomGalaxyPhoto).toHaveProperty('url');
		expect(typeof data.randomGalaxyPhoto.url).toBe('string');

		expect(data).toHaveProperty('name');
		expect(typeof data.name).toBe('string');
		expect(data).toHaveProperty('height');
		expect(typeof data.height).toBe('string');
		expect(data).toHaveProperty('films');
		expect(Array.isArray(data.films)).toBeTruthy();
	});
});
