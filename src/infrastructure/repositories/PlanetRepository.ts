import { IPlanetRepository } from '../../domain/repositories/IPlanetRepository';
import { Planet } from '../../domain/entities/Planet';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { inject, injectable } from 'tsyringe';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBConnectiontSingleton } from '../db/DynamoDBConnectiontSingleton';
import { IAppConfig } from '../../domain/config/IAppConfig';

@injectable()
export class PlanetRepository implements IPlanetRepository {
	private tableName: string;

	constructor(
		@inject('AppConfig') private config: IAppConfig,
		@inject('DynamoDBConnectiontSingleton')
		private dynamoConn: DynamoDBConnectiontSingleton
	) {
		this.tableName = this.config.STARWARS_PLANETS_TABLE;
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
