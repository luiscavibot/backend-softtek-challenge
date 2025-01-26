import 'reflect-metadata';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { inject, singleton } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';

@singleton()
export class DynamoDBClientSingleton {
	private readonly docClient: DynamoDBDocumentClient;

	constructor(@inject('AppConfig') private config: IAppConfig) {
		const client = new DynamoDBClient({
			region: this.config.REGION,
			...(this.config.IS_OFFLINE && {
				endpoint: this.config.DYNAMODB_LOCAL_SERVER,
			}),
		});

		this.docClient = DynamoDBDocumentClient.from(client);
	}

	public getClient(): DynamoDBDocumentClient {
		return this.docClient;
	}
}
