import { Planet } from '../entities/Planet';

export interface IPlanetRepository {
	createPlanet(planet: Planet): Promise<Planet>;
	getAllPlanets(): Promise<Planet[]>;
}
