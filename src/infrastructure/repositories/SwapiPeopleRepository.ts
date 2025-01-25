import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { SWPerson } from '../../domain/entities/SWPerson';
import { inject, injectable } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';

@injectable()
export class SwapiPeopleRepository implements ISwapiPeopleRepository {
	constructor(@inject('AppConfig') private readonly config: IAppConfig) {}

	async getAllPeople(): Promise<SWPerson[]> {
		const response = await fetch(`${this.config.SWAPI_PEOPLE_URL}/`);
		if (!response.ok) {
			throw new Error(`Error fetching people: ${response.status}`);
		}

		const data = await response.json();
		// SWAPI retorna { count, next, previous, results: [] }
		// Nos interesan solo results (arreglo de personajes).
		return data.results; // Array de SWPerson (estructura de la SWAPI)
	}

	async getPersonById(id: string): Promise<SWPerson> {
		const response = await fetch(`${this.config.SWAPI_PEOPLE_URL}/${id}`);
		if (!response.ok) {
			throw new Error(
				`Error fetching person by id ${id}: ${response.status}`
			);
		}

		const person = await response.json();
		return person; // SWPerson
	}
}
