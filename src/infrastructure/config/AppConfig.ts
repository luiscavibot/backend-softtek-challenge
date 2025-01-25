// src/infrastructure/config/AppConfig.ts
import { IAppConfig } from '../../domain/config/IAppConfig';

export class AppConfig implements IAppConfig {
	NASA_API_KEY: string;
	NASA_APOD_URL: string;
	SWAPI_PEOPLE_URL: string;
	HISTORY_TABLE: string;
	IS_OFFLINE: string;
	AWS_REGION: string;

	constructor() {
		this.NASA_API_KEY = process.env.NASA_API_KEY || '';
		this.NASA_APOD_URL = process.env.NASA_APOD_URL || '';
		this.SWAPI_PEOPLE_URL = process.env.SWAPI_PEOPLE_URL || '';
		this.HISTORY_TABLE = process.env.HISTORY_TABLE || '';
		this.IS_OFFLINE = process.env.IS_OFFLINE || 'true';
		this.AWS_REGION = process.env.AWS_REGION || 'us-east-2';
	}
}
