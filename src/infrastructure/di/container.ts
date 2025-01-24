import 'reflect-metadata';
import { container } from 'tsyringe';

import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserRepositoryInMemory } from '../repositories/UserRepositoryInMemory';

// Registro de dependencias
container.register<IUserRepository>('UserRepository', {
	useClass: UserRepositoryInMemory,
});

// Aquí podrías registrar más dependencias, servicios, etc.

export { container };
