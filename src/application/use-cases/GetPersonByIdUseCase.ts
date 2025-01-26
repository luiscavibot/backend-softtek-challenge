import { inject, injectable } from 'tsyringe';
import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { INasaApodRepository } from '../../domain/repositories/INasaApodRepository';
import { ICacheRepository } from '../../domain/repositories/ICacheRepository';
import { IAppConfig } from '../../domain/config/IAppConfig';

@injectable()
export class GetPersonByIdUseCase {
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

	public async execute(id: string): Promise<any> {
		if (!id) {
			throw new Error('ID de personaje no proporcionado.');
		}

		const cacheKey = `fusionados-people-${id}`;
		const cached = await this.cacheRepo.getValue<any>(cacheKey);
		if (cached) {
			console.log(`Retornando data para ${id} desde caché`);
			return cached;
		}

		const person = await this.swapiRepo.getPersonById(id);

		const apodData = await this.nasaRepo.getRandomApod();
		const finalResult = { ...person, randomGalaxyPhoto: apodData };

		await this.cacheRepo.setValue<any>(
			cacheKey,
			finalResult,
			this.cacheTtlSeconds
		);

		return finalResult;
	}
}
