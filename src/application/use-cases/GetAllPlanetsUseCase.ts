import { inject, injectable } from 'tsyringe';
import { IPlanetRepository } from '../../domain/repositories/IPlanetRepository';
import { Planet } from '../../domain/entities/Planet';

@injectable()
export class GetAllPlanetsUseCase {
	constructor(
		@inject('PlanetRepository')
		private planetRepo: IPlanetRepository
	) {}

	public async execute(): Promise<Planet[]> {
		const planets = await this.planetRepo.getAllPlanets();
		return planets;
	}
}
