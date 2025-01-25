// src/infrastructure/di/container.ts
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

// 1) Config
container.register<IAppConfig>('AppConfig', { useClass: AppConfig });

// 2) Repos
container.register<ISwapiPeopleRepository>('SwapiPeopleRepository', {
	useClass: SwapiPeopleRepository,
});
container.register<INasaApodRepository>('NasaApodRepository', {
	useClass: NasaApodRepository,
});
container.register<IHistoryRepository>('HistoryRepository', {
	useClass: HistoryRepository,
});

// 3) Cache
container.register<ICacheRepository>('CacheRepository', {
	useClass: RedisCacheRepository,
});

export { container };
