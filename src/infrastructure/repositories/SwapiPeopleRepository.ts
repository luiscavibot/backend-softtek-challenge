import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { SWPerson } from '../../domain/entities/SWPerson';

// Ojo: Si usas Node 18+ es probable que fetch ya esté disponible.
// De lo contrario, instala "node-fetch" o usa "axios".
const BASE_URL = 'https://swapi.dev/api/people';

export class SwapiPeopleRepository implements ISwapiPeopleRepository {
	async getAllPeople(): Promise<SWPerson[]> {
		const response = await fetch(`${BASE_URL}/`);
		if (!response.ok) {
			throw new Error(`Error fetching people: ${response.status}`);
		}

		const data = await response.json();
		// SWAPI retorna { count, next, previous, results: [] }
		// Nos interesan solo results (arreglo de personajes).
		return data.results; // Array de SWPerson (estructura de la SWAPI)
	}

	async getPersonById(id: string): Promise<SWPerson> {
		const response = await fetch(`${BASE_URL}/${id}`);
		if (!response.ok) {
			throw new Error(
				`Error fetching person by id ${id}: ${response.status}`
			);
		}

		const person = await response.json();
		return person; // SWPerson
	}
}
