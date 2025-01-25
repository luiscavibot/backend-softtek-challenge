import { inject, injectable } from 'tsyringe';
import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { INasaApodRepository } from '../../domain/repositories/INasaApodRepository';
import { SWPerson } from '../../domain/entities/SWPerson';
import { ICacheRepository } from '../../domain/repositories/ICacheRepository';

@injectable()
export class GetAllPeopleUseCase {
	private cacheTtlSeconds = 30 * 60; // 30 minutos

	constructor(
		@inject('SwapiPeopleRepository')
		private readonly swapiRepo: ISwapiPeopleRepository,

		@inject('NasaApodRepository')
		private readonly nasaRepo: INasaApodRepository,

		@inject('CacheRepository')
		private readonly cacheRepo: ICacheRepository
	) {}

	public async execute(): Promise<any[]> {
		// 1) Chequear si hay cache
		const cacheKey = 'fusionados-people'; // un key string
		const cachedValue = await this.cacheRepo.getValue<any[]>(cacheKey);
		if (cachedValue) {
			// Si existe, retornamos directo
			console.log('Retornando data desde caché (Redis)');
			return cachedValue;
		}

		// 2) No hay cache: obtener lista de SWAPI
		console.log('No se encontró caché, llamando SWAPI + NASA...');
		const people = await this.swapiRepo.getAllPeople();

		// 3) Llamar NASA para cada persona
		const resultsWithApod = await Promise.all(
			people.map(async (person: SWPerson) => {
				const apodData = await this.nasaRepo.getRandomApod();
				return { ...person, randomGalaxyPhoto: apodData };
			})
		);

		// 4) Guardar en cache
		await this.cacheRepo.setValue<any[]>(
			cacheKey,
			resultsWithApod,
			this.cacheTtlSeconds
		);

		return resultsWithApod;
	}
}
