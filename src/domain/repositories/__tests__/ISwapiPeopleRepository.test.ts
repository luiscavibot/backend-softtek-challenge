import { SWPerson } from '../../entities/SWPerson';
import { ISwapiPeopleRepository } from '../ISwapiPeopleRepository';

class MockSwapiPeopleRepository implements ISwapiPeopleRepository {
	private mockData: SWPerson[] = [
		{
			name: 'Luke Skywalker',
			height: '172',
			mass: '77',
			hair_color: 'blond',
			skin_color: 'fair',
			eye_color: 'blue',
			birth_year: '19BBY',
			gender: 'male',
			homeworld: 'https://swapi.dev/api/planets/1/',
			films: ['https://swapi.dev/api/films/1/'],
			species: [],
			vehicles: ['https://swapi.dev/api/vehicles/14/'],
			starships: ['https://swapi.dev/api/starships/12/'],
			created: '2014-12-09T13:50:51.644000Z',
			edited: '2014-12-20T21:17:56.891000Z',
			url: 'https://swapi.dev/api/people/1/',
		},
		{
			name: 'Darth Vader',
			height: '202',
			mass: '136',
			hair_color: 'none',
			skin_color: 'white',
			eye_color: 'yellow',
			birth_year: '41.9BBY',
			gender: 'male',
			homeworld: 'https://swapi.dev/api/planets/1/',
			films: ['https://swapi.dev/api/films/1/'],
			species: [],
			vehicles: [],
			starships: ['https://swapi.dev/api/starships/13/'],
			created: '2014-12-10T15:18:20.704000Z',
			edited: '2014-12-20T21:17:50.313000Z',
			url: 'https://swapi.dev/api/people/4/',
		},
	];

	async getAllPeople(): Promise<SWPerson[]> {
		return this.mockData;
	}

	async getPersonById(id: string): Promise<SWPerson> {
		const person = this.mockData.find((p) => p.url.endsWith(`/${id}/`));
		if (!person) {
			throw new Error('Person not found');
		}
		return person;
	}
}

describe('ISwapiPeopleRepository', () => {
	let repository: ISwapiPeopleRepository;

	beforeEach(() => {
		repository = new MockSwapiPeopleRepository();
	});

	it('should return all people', async () => {
		const people = await repository.getAllPeople();

		expect(people).toBeDefined();
		expect(people).toHaveLength(2);
		expect(people[0].name).toBe('Luke Skywalker');
		expect(people[1].name).toBe('Darth Vader');
	});

	it('should return a person by ID', async () => {
		const person = await repository.getPersonById('1');

		expect(person).toBeDefined();
		expect(person.name).toBe('Luke Skywalker');
		expect(person.height).toBe('172');
		expect(person.films).toContain('https://swapi.dev/api/films/1/');
	});

	it('should throw an error if person not found', async () => {
		await expect(repository.getPersonById('99')).rejects.toThrow(
			'Person not found'
		);
	});

	it('should return valid data for all properties of a person', async () => {
		const person = await repository.getPersonById('4');

		expect(person.name).toBe('Darth Vader');
		expect(person.height).toBe('202');
		expect(person.mass).toBe('136');
		expect(person.hair_color).toBe('none');
		expect(person.eye_color).toBe('yellow');
		expect(person.homeworld).toBe('https://swapi.dev/api/planets/1/');
		expect(person.starships).toContain(
			'https://swapi.dev/api/starships/13/'
		);
	});
});
