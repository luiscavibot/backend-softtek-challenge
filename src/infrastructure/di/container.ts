import 'reflect-metadata';
import { container } from 'tsyringe';

import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserRepositoryInMemory } from '../repositories/UserRepositoryInMemory';

import { ISwapiPeopleRepository } from '../../domain/repositories/ISwapiPeopleRepository';
import { SwapiPeopleRepository } from '../repositories/SwapiPeopleRepository';

// Registro de tu UserRepository (ejemplo anterior)
container.register<IUserRepository>('UserRepository', {
	useClass: UserRepositoryInMemory,
});

// Registro de SwapiPeopleRepository para SWAPI
container.register<ISwapiPeopleRepository>('SwapiPeopleRepository', {
	useClass: SwapiPeopleRepository,
});

export { container };
