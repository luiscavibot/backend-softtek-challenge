import { inject, injectable } from 'tsyringe';
import { IPlanetRepository } from '../../domain/repositories/IPlanetRepository';
import { Planet } from '../../domain/entities/Planet';
import logger from '../../infrastructure/logging/logger';

@injectable()
export class GetAllPlanetsUseCase {
	constructor(
		@inject('PlanetRepository')
		private planetRepo: IPlanetRepository
	) {
		logger.info('GetAllPlanetsUseCase inicializado.');
	}

	public async execute(): Promise<Planet[]> {
		try {
			logger.info('Ejecutando caso de uso `GetAllPlanetsUseCase`.');
			const planets = await this.planetRepo.getAllPlanets();
			logger.info('Planetas recuperados exitosamente.', {
				count: planets.length,
			});
			return planets;
		} catch (error: any) {
			logger.error('Error en `GetAllPlanetsUseCase`.', {
				error: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}
}
