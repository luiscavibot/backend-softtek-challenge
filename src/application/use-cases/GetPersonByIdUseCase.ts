import { inject, injectable } from 'tsyringe';
import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { INasaApodRepository } from '../../domain/repositories/INasaApodRepository';
import { ICacheRepository } from '../../domain/repositories/ICacheRepository';
import { IAppConfig } from '../../domain/config/IAppConfig';
import logger from '../../infrastructure/logging/logger';

@injectable()
export class GetPersonByIdUseCase {
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
		logger.info('GetPersonByIdUseCase inicializado.', {
			cacheTtlSeconds: this.cacheTtlSeconds,
		});
	}

	public async execute(id: string): Promise<any> {
		if (!id) {
			logger.error('ID de personaje no proporcionado.');
			throw new Error('ID de personaje no proporcionado.');
		}

		const cacheKey = `fusionados-people-${id}`;
		try {
			logger.info('Intentando recuperar datos desde el caché.', {
				cacheKey,
			});
			const cached = await this.cacheRepo.getValue<any>(cacheKey);
			if (cached) {
				logger.info('Datos recuperados desde el caché.', { cacheKey });
				return cached;
			}

			logger.info('Datos no encontrados en caché. Consultando SWAPI.', {
				id,
			});
			const person = await this.swapiRepo.getPersonById(id);

			logger.info('Datos del personaje recuperados de SWAPI.', { id });

			logger.info('Consultando datos de APOD para el personaje.', { id });
			const apodData = await this.nasaRepo.getRandomApod();

			const finalResult = { ...person, randomGalaxyPhoto: apodData };
			logger.info('Fusionando datos de personaje con APOD.', { id });

			await this.cacheRepo.setValue<any>(
				cacheKey,
				finalResult,
				this.cacheTtlSeconds
			);
			logger.info('Datos almacenados en caché.', { cacheKey });

			return finalResult;
		} catch (error: any) {
			logger.error('Error en `GetPersonByIdUseCase`.', {
				id,
				error: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}
}
