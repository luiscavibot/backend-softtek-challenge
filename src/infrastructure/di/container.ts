import 'reflect-metadata';
import * as dotenv from 'dotenv';

import { container } from 'tsyringe';

import { IAppConfig } from '../../domain/config/IAppConfig';
import { AppConfig } from '../config/AppConfig';

import { INasaApodRepository } from '../../domain/repositories/INasaApodRepository';
import { NasaApodRepository } from '../repositories/NasaApodRepository';

import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { SwapiPeopleRepository } from '../repositories/SwapiPeopleRepository';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
	console.log('Environment variables loaded in development mode...');
}

// 1) Registro de AppConfig como "AppConfig"
container.register<IAppConfig>('AppConfig', {
	useClass: AppConfig,
});

// 2) NASA
container.register<INasaApodRepository>('NasaApodRepository', {
	useClass: NasaApodRepository,
});

// 3) SWAPI
container.register<ISwapiPeopleRepository>('SwapiPeopleRepository', {
	useClass: SwapiPeopleRepository,
});

// 4) Otras dependencias (UserRepository, etc.)
// ...
export { container };
