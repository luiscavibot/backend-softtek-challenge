// src/infrastructure/config/AppConfig.ts
import { IAppConfig } from '../../domain/config/IAppConfig';

export class AppConfig implements IAppConfig {
	NASA_API_KEY: string;
	NASA_APOD_URL: string;
	SWAPI_PEOPLE_URL: string;
	HISTORY_TABLE: string;
	IS_OFFLINE: boolean;
	REGION: string;
	REDIS_HOST: string;
	REDIS_PORT: string;
	STARWARS_PLANETS_TABLE: string;
	DYNAMODB_LOCAL_SERVER: string;
	CACHE_TTL_SECONDS: number;

	constructor() {
		this.NASA_API_KEY = process.env.NASA_API_KEY || '';
		this.NASA_APOD_URL = process.env.NASA_APOD_URL || '';
		this.SWAPI_PEOPLE_URL = process.env.SWAPI_PEOPLE_URL || '';
		this.HISTORY_TABLE = process.env.HISTORY_TABLE || '';
		this.IS_OFFLINE = process.env.IS_OFFLINE === 'true';
		this.REGION = process.env.REGION || 'us-east-2';
		this.REDIS_HOST = process.env.REDIS_HOST || 'localhost';
		this.REDIS_PORT = process.env.REDIS_PORT || '6379';
		this.STARWARS_PLANETS_TABLE = process.env.STARWARS_PLANETS_TABLE || '';
		this.DYNAMODB_LOCAL_SERVER =
			process.env.DYNAMODB_LOCAL_SERVER || 'http://localhost:8000';
		this.CACHE_TTL_SECONDS = parseInt(
			process.env.CACHE_TTL_SECONDS || '1800'
		);
	}
}
