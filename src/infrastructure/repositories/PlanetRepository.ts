import { IPlanetRepository } from '../../domain/repositories/IPlanetRepository';
import { Planet } from '../../domain/entities/Planet';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { inject, injectable } from 'tsyringe';
import { DynamoDBConnectiontSingleton } from '../db/DynamoDBConnectiontSingleton';
import { IAppConfig } from '../../domain/config/IAppConfig';
import logger from '../logging/logger';

@injectable()
export class PlanetRepository implements IPlanetRepository {
	private tableName: string;

	constructor(
		@inject('AppConfig') private config: IAppConfig,
		@inject('DynamoDBConnectiontSingleton')
		private dynamoConn: DynamoDBConnectiontSingleton
	) {
		this.tableName = this.config.STARWARS_PLANETS_TABLE;
		logger.info('PlanetRepository inicializado.', {
			tableName: this.tableName,
		});
	}

	public async createPlanet(planet: Planet): Promise<Planet> {
		const item = {
			PK: `PLANET#${planet.id}`,
			SK: 'PLANET',
			...planet,
		};

		logger.info('Iniciando creación de planeta.', {
			planetId: planet.id,
			planetName: planet.name,
		});

		try {
			await this.dynamoConn.client.send(
				new PutCommand({
					TableName: this.tableName,
					Item: item,
				})
			);
			logger.info('Planeta creado exitosamente.', {
				planetId: planet.id,
			});
			return planet;
		} catch (error: any) {
			logger.error('Error al crear el planeta.', {
				planetId: planet.id,
				error: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}

	public async getAllPlanets(): Promise<Planet[]> {
		logger.info('Iniciando recuperación de todos los planetas.');

		try {
			const result = await this.dynamoConn.client.send(
				new ScanCommand({
					TableName: this.tableName,
				})
			);

			if (!result.Items) {
				logger.warn('No se encontraron planetas en la base de datos.');
				return [];
			}

			const planets = result.Items.map((item) => ({
				id: item.PK.replace('PLANET#', ''),
				name: item.name,
				climate: item.climate,
				terrain: item.terrain,
				population: item.population,
			})) as Planet[];

			logger.info('Planetas recuperados exitosamente.', {
				count: planets.length,
			});

			return planets;
		} catch (error: any) {
			logger.error('Error al recuperar los planetas.', {
				error: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}
}
