import { inject, injectable } from 'tsyringe';
import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { INasaApodRepository } from '../../domain/repositories/INasaApodRepository';
import { SWPerson } from '../../domain/entities/SWPerson';
import { ICacheRepository } from '../../domain/repositories/ICacheRepository';
import { IAppConfig } from '../../domain/config/IAppConfig';

@injectable()
export class GetAllPeopleUseCase {
	private cacheTtlSeconds;

	constructor(
		@inject('SwapiPeopleRepository')
		private readonly swapiRepo: ISwapiPeopleRepository,

		@inject('NasaApodRepository')
		private readonly nasaRepo: INasaApodRepository,

		@inject('CacheRepository')
		private readonly cacheRepo: ICacheRepository,

		@inject('AppConfig')
		private readonly appConfig: IAppConfig
	) {
		this.cacheTtlSeconds = this.appConfig.CACHE_TTL_SECONDS;
	}

	public async execute(): Promise<any[]> {
		const cacheKey = 'fusionados-people';
		const cachedValue = await this.cacheRepo.getValue<any[]>(cacheKey);
		if (cachedValue) {
			console.log('Retornando data desde caché (Redis)');
			return cachedValue;
		}

		console.log('No se encontró caché, llamando SWAPI + NASA...');
		const people = await this.swapiRepo.getAllPeople();

		const resultsWithApod = await Promise.all(
			people.map(async (person: SWPerson) => {
				const apodData = await this.nasaRepo.getRandomApod();
				return { ...person, randomGalaxyPhoto: apodData };
			})
		);

		await this.cacheRepo.setValue<any[]>(
			cacheKey,
			resultsWithApod,
			this.cacheTtlSeconds
		);

		return resultsWithApod;
	}
}
