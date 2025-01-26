import { SWPerson } from '../SWPerson';
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

describe('SWPerson Interface', () => {
	it('should match the structure of SWPerson', () => {
		expect(mockSWPerson).toHaveProperty('name');
		expect(typeof mockSWPerson.name).toBe('string');

		expect(mockSWPerson).toHaveProperty('height');
		expect(typeof mockSWPerson.height).toBe('string');

		expect(mockSWPerson).toHaveProperty('mass');
		expect(typeof mockSWPerson.mass).toBe('string');

		expect(mockSWPerson).toHaveProperty('hair_color');
		expect(typeof mockSWPerson.hair_color).toBe('string');

		expect(mockSWPerson).toHaveProperty('skin_color');
		expect(typeof mockSWPerson.skin_color).toBe('string');

		expect(mockSWPerson).toHaveProperty('eye_color');
		expect(typeof mockSWPerson.eye_color).toBe('string');

		expect(mockSWPerson).toHaveProperty('birth_year');
		expect(typeof mockSWPerson.birth_year).toBe('string');

		expect(mockSWPerson).toHaveProperty('gender');
		expect(typeof mockSWPerson.gender).toBe('string');

		expect(mockSWPerson).toHaveProperty('homeworld');
		expect(typeof mockSWPerson.homeworld).toBe('string');

		expect(mockSWPerson).toHaveProperty('films');
		expect(Array.isArray(mockSWPerson.films)).toBeTruthy();

		expect(mockSWPerson).toHaveProperty('species');
		expect(Array.isArray(mockSWPerson.species)).toBeTruthy();

		expect(mockSWPerson).toHaveProperty('vehicles');
		expect(Array.isArray(mockSWPerson.vehicles)).toBeTruthy();

		expect(mockSWPerson).toHaveProperty('starships');
		expect(Array.isArray(mockSWPerson.starships)).toBeTruthy();

		expect(mockSWPerson).toHaveProperty('created');
		expect(typeof mockSWPerson.created).toBe('string');

		expect(mockSWPerson).toHaveProperty('edited');
		expect(typeof mockSWPerson.edited).toBe('string');

		expect(mockSWPerson).toHaveProperty('url');
		expect(typeof mockSWPerson.url).toBe('string');
	});
});
