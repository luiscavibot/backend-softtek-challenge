import { IPlanetRepository } from '../../domain/repositories/IPlanetRepository';
import { Planet } from '../../domain/entities/Planet';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { inject, injectable } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

@injectable()
export class PlanetRepository implements IPlanetRepository {
	private docClient: DynamoDBDocumentClient;
	private tableName: string;

	constructor(@inject('AppConfig') private config: IAppConfig) {
		const client = new DynamoDBClient({
			region: process.env.AWS_REGION || 'us-east-2',
		});
		this.docClient = DynamoDBDocumentClient.from(client);

		this.tableName = this.config.STARWARS_PLANETS_TABLE;
		console.log('tableName---->', this.tableName);
	}

	public async createPlanet(planet: Planet): Promise<Planet> {
		const item = {
			PK: `PLANET#${planet.id}`,
			SK: 'PLANET',
			...planet,
		};

		await this.docClient.send(
			new PutCommand({
				TableName: this.tableName,
				Item: item,
			})
		);

		return planet;
	}
	public async getAllPlanets(): Promise<Planet[]> {
		const result = await this.docClient.send(
			new ScanCommand({
				TableName: this.tableName,
			})
		);

		if (!result.Items) return [];

		const planets = result.Items.map((item) => ({
			id: item.id,
			name: item.name,
			climate: item.climate,
			terrain: item.terrain,
			population: item.population,
		})) as Planet[];

		return planets;
	}
}
