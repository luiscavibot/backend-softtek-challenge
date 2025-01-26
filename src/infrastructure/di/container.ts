import 'reflect-metadata';
import { container } from 'tsyringe';

import { IAppConfig } from '../../domain/config/IAppConfig';
import { AppConfig } from '../config/AppConfig';

import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { SwapiPeopleRepository } from '../repositories/SwapiPeopleRepository';

import { INasaApodRepository } from '../../domain/repositories/INasaApodRepository';
import { NasaApodRepository } from '../repositories/NasaApodRepository';

import { IHistoryRepository } from '../../domain/repositories/IHistoryRepository';
import { HistoryRepository } from '../repositories/HistoryRepository';

import { ICacheRepository } from '../../domain/repositories/ICacheRepository';
import { RedisCacheRepository } from '../repositories/RedisCacheRepository';
import { NoOpCacheRepository } from '../repositories/NoOpCacheRepository';
import { IPlanetRepository } from '../../domain/repositories/IPlanetRepository';
import { PlanetRepository } from '../repositories/PlanetRepository';
import { DynamoDBConnectiontSingleton } from '../db/DynamoDBConnectiontSingleton';
import { CreatePlanetUseCase } from '../../application/use-cases/CreatePlanetUseCase';
import { RedisConnectiontSingleton } from '../db/RedisConnectiontSingleton';

container.register<IAppConfig>('AppConfig', {
	useClass: AppConfig,
});

container.registerSingleton<DynamoDBConnectiontSingleton>(
	'DynamoDBConnectiontSingleton',
	DynamoDBConnectiontSingleton
);

container.registerSingleton<RedisConnectiontSingleton>(
	'RedisConnectiontSingleton',
	RedisConnectiontSingleton
);

container.register<IPlanetRepository>('PlanetRepository', {
	useClass: PlanetRepository,
});

container.register('CreatePlanetUseCase', {
	useClass: CreatePlanetUseCase,
});

container.register<ISwapiPeopleRepository>('SwapiPeopleRepository', {
	useClass: SwapiPeopleRepository,
});

container.register<INasaApodRepository>('NasaApodRepository', {
	useClass: NasaApodRepository,
});

container.register<IHistoryRepository>('HistoryRepository', {
	useClass: HistoryRepository,
});

const isOffline = process.env.IS_OFFLINE === 'true';
container.register<ICacheRepository>('CacheRepository', {
	useClass: isOffline ? NoOpCacheRepository : RedisCacheRepository,
});

export { container };
