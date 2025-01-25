import { inject, injectable } from 'tsyringe';
import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { INasaApodRepository } from '../../domain/repositories/INasaApodRepository';

@injectable()
export class GetPersonByIdUseCase {
	constructor(
		@inject('SwapiPeopleRepository')
		private readonly swapiRepo: ISwapiPeopleRepository,

		@inject('NasaApodRepository')
		private readonly nasaRepo: INasaApodRepository
	) {}

	public async execute(id: string): Promise<any> {
		if (!id) {
			throw new Error('ID de personaje no proporcionado.');
		}

		// 1. Obtener el personaje de SWAPI
		const person = await this.swapiRepo.getPersonById(id);

		// 2. Obtener un APOD aleatorio
		const apodData = await this.nasaRepo.getRandomApod();

		// 3. Adjuntar "randomGalaxyPhoto"
		return {
			...person,
			randomGalaxyPhoto: apodData,
		};
	}
}
