import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { SWPerson } from '../../domain/entities/SWPerson';
import { inject, injectable } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';
import logger from '../logging/logger';

@injectable()
export class SwapiPeopleRepository implements ISwapiPeopleRepository {
	constructor(@inject('AppConfig') private readonly config: IAppConfig) {
		logger.info('SwapiPeopleRepository inicializado.');
	}

	async getAllPeople(): Promise<SWPerson[]> {
		const url = `${this.config.SWAPI_PEOPLE_URL}/`;
		logger.info('Iniciando solicitud para obtener todos los personajes.', {
			url,
		});

		try {
			const response = await fetch(url);
			if (!response.ok) {
				logger.error('Error al obtener todos los personajes.', {
					status: response.status,
					statusText: response.statusText,
				});
				throw new Error(`Error fetching people: ${response.status}`);
			}

			const data = await response.json();
			logger.info('Personajes recuperados exitosamente.', {
				count: data.results.length,
			});
			return data.results;
		} catch (error: any) {
			logger.error('Error al obtener todos los personajes.', {
				error: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}

	async getPersonById(id: string): Promise<SWPerson> {
		const url = `${this.config.SWAPI_PEOPLE_URL}/${id}`;
		logger.info('Iniciando solicitud para obtener un personaje por ID.', {
			url,
			id,
		});

		try {
			const response = await fetch(url);
			if (!response.ok) {
				logger.error('Error al obtener personaje por ID.', {
					id,
					status: response.status,
					statusText: response.statusText,
				});
				throw new Error(
					`Error fetching person by id ${id}: ${response.status}`
				);
			}

			const person = await response.json();
			logger.info('Personaje recuperado exitosamente.', {
				id,
				name: person.name,
			});
			return person;
		} catch (error: any) {
			logger.error('Error al obtener personaje por ID.', {
				id,
				error: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}
}
