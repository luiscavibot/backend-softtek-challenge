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

// 1) Config
container.register<IAppConfig>('AppConfig', {
	useClass: AppConfig,
});

// 2) Repos SWAPI
container.register<ISwapiPeopleRepository>('SwapiPeopleRepository', {
	useClass: SwapiPeopleRepository,
});

// 3) Repos NASA
container.register<INasaApodRepository>('NasaApodRepository', {
	useClass: NasaApodRepository,
});

// 4) Historial
container.register<IHistoryRepository>('HistoryRepository', {
	useClass: HistoryRepository,
});

// 5) Cache: si IS_OFFLINE=true => NoOp, si no => Redis
const isOffline = process.env.IS_OFFLINE === 'true';
container.register<ICacheRepository>('CacheRepository', {
	useClass: isOffline ? NoOpCacheRepository : RedisCacheRepository,
});

export { container };
