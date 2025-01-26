import { inject, injectable } from 'tsyringe';
import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { INasaApodRepository } from '../../domain/repositories/INasaApodRepository';
import { ICacheRepository } from '../../domain/repositories/ICacheRepository';

@injectable()
export class GetPersonByIdUseCase {
	private cacheTtlSeconds = 30 * 60; // 30 minutos

	constructor(
		@inject('SwapiPeopleRepository')
		private readonly swapiRepo: ISwapiPeopleRepository,

		@inject('NasaApodRepository')
		private readonly nasaRepo: INasaApodRepository,

		@inject('CacheRepository')
		private readonly cacheRepo: ICacheRepository
	) {}

	public async execute(id: string): Promise<any> {
		if (!id) {
			throw new Error('ID de personaje no proporcionado.');
		}

		// 1) Chequear cache
		const cacheKey = `fusionados-people-${id}`;
		const cached = await this.cacheRepo.getValue<any>(cacheKey);
		if (cached) {
			console.log(`Retornando data para ${id} desde caché`);
			return cached;
		}

		// 2) Llamar SWAPI
		const person = await this.swapiRepo.getPersonById(id);

		// 3) Llamar NASA
		const apodData = await this.nasaRepo.getRandomApod();
		const finalResult = { ...person, randomGalaxyPhoto: apodData };

		// 4) Guardar en cache
		await this.cacheRepo.setValue<any>(
			cacheKey,
			finalResult,
			this.cacheTtlSeconds
		);

		return finalResult;
	}
}
