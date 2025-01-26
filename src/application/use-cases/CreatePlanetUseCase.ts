import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IPlanetRepository } from '../../domain/repositories/IPlanetRepository';
import { Planet } from '../../domain/entities/Planet';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class CreatePlanetUseCase {
	constructor(
		@inject('PlanetRepository')
		private planetRepo: IPlanetRepository
	) {}

	public async execute(input: Omit<Planet, 'id'>): Promise<Planet> {
		const id = uuidv4();
		const newPlanet: Planet = {
			id,
			...input,
		};
		return await this.planetRepo.createPlanet(newPlanet);
	}
}
