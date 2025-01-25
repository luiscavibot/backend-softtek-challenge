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

// Config
container.register<IAppConfig>('AppConfig', {
	useClass: AppConfig,
});

// Repos SWAPI
container.register<ISwapiPeopleRepository>('SwapiPeopleRepository', {
	useClass: SwapiPeopleRepository,
});

// Repos NASA
container.register<INasaApodRepository>('NasaApodRepository', {
	useClass: NasaApodRepository,
});

// Historial
container.register<IHistoryRepository>('HistoryRepository', {
	useClass: HistoryRepository,
});

export { container };
