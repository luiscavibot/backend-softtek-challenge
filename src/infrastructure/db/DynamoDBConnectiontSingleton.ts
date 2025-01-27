import 'reflect-metadata';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { inject, singleton } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';
import logger from '../logging/logger';
import AWSXRay from 'aws-xray-sdk';

@singleton()
export class DynamoDBConnectiontSingleton {
	private readonly docClient: DynamoDBDocumentClient;

	constructor(@inject('AppConfig') private config: IAppConfig) {
		logger.info('Inicializando conexión a DynamoDB.', {
			region: this.config.REGION,
			isOffline: this.config.IS_OFFLINE,
			localEndpoint: this.config.IS_OFFLINE
				? this.config.DYNAMODB_LOCAL_SERVER
				: null,
		});

		const client = new DynamoDBClient({
			region: this.config.REGION,
			...(this.config.IS_OFFLINE && {
				endpoint: this.config.DYNAMODB_LOCAL_SERVER,
			}),
		});
		const xrayClient = AWSXRay.captureAWSv3Client(client);
		this.docClient = DynamoDBDocumentClient.from(xrayClient);

		logger.info('Conexión a DynamoDBDocumentClient establecida.');
	}

	get client(): DynamoDBDocumentClient {
		logger.debug('Cliente DynamoDBDocumentClient solicitado.');
		return this.docClient;
	}
}
