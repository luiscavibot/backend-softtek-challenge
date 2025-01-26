import { IPlanetRepository } from '../../domain/repositories/IPlanetRepository';
import { Planet } from '../../domain/entities/Planet';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { inject, injectable } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';

@injectable()
export class PlanetRepository implements IPlanetRepository {
	private docClient: DynamoDBDocumentClient;
	private tableName: string;

	constructor(@inject('AppConfig') private config: IAppConfig) {
		const client = new DynamoDBClient({
			region: process.env.AWS_REGION || 'us-east-2',
		});
		this.docClient = DynamoDBDocumentClient.from(client);

		this.tableName =
			process.env.STARWARS_PLANETS_TABLE ||
			this.config.STARWARS_PLANETS_TABLE ||
			'StarWarsPlanets';
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
}
