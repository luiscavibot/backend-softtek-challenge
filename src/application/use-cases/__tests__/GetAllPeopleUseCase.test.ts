import 'reflect-metadata';
import { GetAllPeopleUseCase } from '../GetAllPeopleUseCase';
import { ISwapiPeopleRepository } from '../../../domain/repositories/ISwapiPeopleRepository';
import { INasaApodRepository } from '../../../domain/repositories/INasaApodRepository';
import { ICacheRepository } from '../../../domain/repositories/ICacheRepository';
import { IAppConfig } from '../../../domain/config/IAppConfig';
import { container } from 'tsyringe';

describe('GetAllPeopleUseCase Constructor', () => {
	let swapiRepo: ISwapiPeopleRepository;
	let nasaRepo: INasaApodRepository;
	let cacheRepo: ICacheRepository;
	let appConfig: IAppConfig;

	beforeEach(() => {
		swapiRepo = {} as ISwapiPeopleRepository;
		nasaRepo = {} as INasaApodRepository;
		cacheRepo = {} as ICacheRepository;
		appConfig = { CACHE_TTL_SECONDS: 3600 } as IAppConfig;

		container.registerInstance('SwapiPeopleRepository', swapiRepo);
		container.registerInstance('NasaApodRepository', nasaRepo);
		container.registerInstance('CacheRepository', cacheRepo);
		container.registerInstance('AppConfig', appConfig);
	});

	it('should be defined', () => {
		const useCase = container.resolve(GetAllPeopleUseCase);
		expect(useCase).toBeDefined();
	});

	it('should initialize cacheTtlSeconds from appConfig', () => {
		const useCase = container.resolve(GetAllPeopleUseCase);
		expect(useCase['cacheTtlSeconds']).toBe(appConfig.CACHE_TTL_SECONDS);
	});

	it('should inject dependencies correctly', () => {
		const useCase = container.resolve(GetAllPeopleUseCase);
		expect(useCase['swapiRepo']).toBe(swapiRepo);
		expect(useCase['nasaRepo']).toBe(nasaRepo);
		expect(useCase['cacheRepo']).toBe(cacheRepo);
		expect(useCase['appConfig']).toBe(appConfig);
	});
});
