import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

import {
	IHistoryRepository,
	LastKey,
} from '../../domain/repositories/IHistoryRepository';
import { HistoryRecord } from '../../domain/entities/HistoryRecord';
import { inject, injectable } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';
import { DynamoDBConnectiontSingleton } from '../db/DynamoDBConnectiontSingleton';

@injectable()
export class HistoryRepository implements IHistoryRepository {
	private tableName: string;

	constructor(
		@inject('AppConfig') private config: IAppConfig,
		@inject('DynamoDBConnectiontSingleton')
		private dynamoConn: DynamoDBConnectiontSingleton
	) {
		this.tableName = this.config.HISTORY_TABLE;
	}

	public async saveRecord(record: HistoryRecord): Promise<void> {
		const item = {
			PK: 'fusionadosHistory',
			SK: record.timestamp,
			id: record.id,
			endpoint: record.endpoint,
			responseData: record.responseData,
		};

		await this.dynamoConn.client.send(
			new PutCommand({
				TableName: this.tableName,
				Item: item,
			})
		);
	}

	public async getRecords(
		limit: number,
		lastKey?: any
	): Promise<{ items: HistoryRecord[]; lastKey?: LastKey }> {
		const queryParams = {
			TableName: this.tableName,
			KeyConditionExpression: 'PK = :pk',
			ExpressionAttributeValues: {
				':pk': 'fusionadosHistory',
			},
			Limit: limit,
			ExclusiveStartKey: lastKey,
			ScanIndexForward: true,
		};

		const result = await this.dynamoConn.client.send(
			new QueryCommand(queryParams)
		);

		const items = (result.Items || []).map((itm: any) => ({
			id: itm.id,
			endpoint: itm.endpoint,
			timestamp: itm.SK,
			responseData: itm.responseData,
		})) as HistoryRecord[];

		return {
			items,
			lastKey: result.LastEvaluatedKey,
		};
	}
}
