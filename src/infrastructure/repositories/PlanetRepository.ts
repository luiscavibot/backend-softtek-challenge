import { IPlanetRepository } from '../../domain/repositories/IPlanetRepository';
import { Planet } from '../../domain/entities/Planet';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { inject, injectable } from 'tsyringe';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBConnectiontSingleton } from '../db/DynamoDBConnectiontSingleton';

@injectable()
export class PlanetRepository implements IPlanetRepository {
	private tableName: string;

	constructor(
		@inject('DynamoDBClientSingleton')
		private dynamoConn: DynamoDBConnectiontSingleton
	) {
		this.tableName =
			process.env.STARWARS_PLANETS_TABLE || 'StarWarsPlanets';
	}

	public async createPlanet(planet: Planet): Promise<Planet> {
		const item = {
			PK: `PLANET#${planet.id}`,
			SK: 'PLANET',
			...planet,
		};

		await this.dynamoConn.client.send(
			new PutCommand({
				TableName: this.tableName,
				Item: item,
			})
		);

		return planet;
	}
	public async getAllPlanets(): Promise<Planet[]> {
		const result = await this.dynamoConn.client.send(
			new ScanCommand({
				TableName: this.tableName,
			})
		);

		if (!result.Items) return [];

		return result.Items.map((item) => ({
			id: item.PK.replace('PLANET#', ''),
			name: item.name,
			climate: item.climate,
			terrain: item.terrain,
			population: item.population,
		})) as Planet[];
	}
}
