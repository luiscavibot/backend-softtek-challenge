import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IPlanetRepository } from '../../domain/repositories/IPlanetRepository';
import { Planet } from '../../domain/entities/Planet';
import { v4 as uuidv4 } from 'uuid';
import logger from '../../infrastructure/logging/logger';

@injectable()
export class CreatePlanetUseCase {
	constructor(
		@inject('PlanetRepository')
		private planetRepo: IPlanetRepository
	) {
		logger.info('CreatePlanetUseCase inicializado.');
	}

	public async execute(input: Omit<Planet, 'id'>): Promise<Planet> {
		logger.info('Ejecutando caso de uso `CreatePlanetUseCase`.', {
			input,
		});

		try {
			const id = uuidv4();
			const newPlanet: Planet = {
				id,
				...input,
			};

			const createdPlanet = await this.planetRepo.createPlanet(newPlanet);

			logger.info('Planeta creado exitosamente.', {
				planetId: createdPlanet.id,
				name: createdPlanet.name,
			});

			return createdPlanet;
		} catch (error: unknown) {
			const errorTyped = error as Error;
			logger.error('Error al crear el planeta.', {
				error: errorTyped.message,
				stack: errorTyped.stack,
			});
			throw error;
		}
	}
}
