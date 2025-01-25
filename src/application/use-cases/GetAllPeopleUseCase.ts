import { inject, injectable } from 'tsyringe';
import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { INasaApodRepository } from '../../domain/repositories/INasaApodRepository';
import { SWPerson } from '../../domain/entities/SWPerson';

/**
 * Use case: Obtener la lista de personajes de SWAPI
 * y añadir un randomGalaxyPhoto a cada uno (APOD aleatorio).
 */
@injectable()
export class GetAllPeopleUseCase {
	constructor(
		@inject('SwapiPeopleRepository')
		private readonly swapiRepo: ISwapiPeopleRepository,

		@inject('NasaApodRepository')
		private readonly nasaRepo: INasaApodRepository
	) {}

	public async execute(): Promise<any[]> {
		// 1. Obtener lista de personajes de SWAPI
		const people = await this.swapiRepo.getAllPeople();

		// 2. Hacer un "Promise.all" para obtener un APOD aleatorio para cada uno
		const resultsWithApod = await Promise.all(
			people.map(async (person: SWPerson) => {
				const apodData = await this.nasaRepo.getRandomApod();
				return {
					...person,
					randomGalaxyPhoto: apodData,
				};
			})
		);

		return resultsWithApod;
	}
}
