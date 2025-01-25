import { SWPerson } from '../SWPerson';

describe('SWPerson', () => {
	it('should create a valid SWPerson object', () => {
		const person: SWPerson = {
			name: 'Luke Skywalker',
			height: '172',
			mass: '77',
			hair_color: 'blond',
			skin_color: 'fair',
			eye_color: 'blue',
			birth_year: '19BBY',
			gender: 'male',
		};

		expect(person).toHaveProperty('name', 'Luke Skywalker');
		expect(person).toHaveProperty('height', '172');
		expect(person).toHaveProperty('mass', '77');
		expect(person).toHaveProperty('hair_color', 'blond');
		expect(person).toHaveProperty('skin_color', 'fair');
		expect(person).toHaveProperty('eye_color', 'blue');
		expect(person).toHaveProperty('birth_year', '19BBY');
		expect(person).toHaveProperty('gender', 'male');
	});

	it('should have all properties of the correct type', () => {
		const person: SWPerson = {
			name: 'Leia Organa',
			height: '150',
			mass: '49',
			hair_color: 'brown',
			skin_color: 'light',
			eye_color: 'brown',
			birth_year: '19BBY',
			gender: 'female',
		};

		expect(typeof person.name).toBe('string');
		expect(typeof person.height).toBe('string');
		expect(typeof person.mass).toBe('string');
		expect(typeof person.hair_color).toBe('string');
		expect(typeof person.skin_color).toBe('string');
		expect(typeof person.eye_color).toBe('string');
		expect(typeof person.birth_year).toBe('string');
		expect(typeof person.gender).toBe('string');
	});

	it('should allow only specific values for gender', () => {
		const validGenders = ['male', 'female', 'n/a'];

		const person: SWPerson = {
			name: 'C-3PO',
			height: '167',
			mass: '75',
			hair_color: 'n/a',
			skin_color: 'gold',
			eye_color: 'yellow',
			birth_year: '112BBY',
			gender: 'n/a',
		};

		expect(validGenders).toContain(person.gender);
	});
});
