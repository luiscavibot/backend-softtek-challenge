import { inject, injectable } from 'tsyringe';
import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { INasaApodRepository } from '../../domain/repositories/INasaApodRepository';
import { SWPerson } from '../../domain/entities/SWPerson';
import { ICacheRepository } from '../../domain/repositories/ICacheRepository';
import { IAppConfig } from '../../domain/config/IAppConfig';
import logger from '../../infrastructure/logging/logger';
import { ResultsWithApod } from '../../domain/entities/ApodData';

@injectable()
export class GetAllPeopleUseCase {
	private cacheTtlSeconds: number;

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
		logger.info('GetAllPeopleUseCase inicializado.', {
			cacheTtlSeconds: this.cacheTtlSeconds,
		});
	}

	public async execute(): Promise<ResultsWithApod[]> {
		const cacheKey = 'fusionados-people';

		try {
			logger.info('Intentando recuperar datos del caché.', { cacheKey });
			const cachedValue = await this.cacheRepo.getValue<
				ResultsWithApod[]
			>(cacheKey);

			if (cachedValue) {
				logger.info('Datos recuperados desde el caché.', { cacheKey });
				return cachedValue;
			}

			logger.info('Datos no encontrados en el caché. Consultando SWAPI.');
			const people = await this.swapiRepo.getAllPeople();
			logger.info('Personajes recuperados de SWAPI.', {
				count: people.length,
			});

			const resultsWithApod = await Promise.all(
				people.map(async (person: SWPerson) => {
					const apodData = await this.nasaRepo.getRandomApod();
					return { ...person, randomGalaxyPhoto: apodData };
				})
			);

			logger.info('Datos de APOD fusionados con los personajes.', {
				count: resultsWithApod.length,
			});

			await this.cacheRepo.setValue<ResultsWithApod[]>(
				cacheKey,
				resultsWithApod,
				this.cacheTtlSeconds
			);
			logger.info('Datos almacenados en el caché.', {
				cacheKey,
				ttlSeconds: this.cacheTtlSeconds,
			});

			return resultsWithApod;
		} catch (error: unknown) {
			const errorTyped = error as Error;
			logger.error('Error en `GetAllPeopleUseCase`.', {
				error: errorTyped.message,
				stack: errorTyped.stack,
			});
			throw error;
		}
	}
}
