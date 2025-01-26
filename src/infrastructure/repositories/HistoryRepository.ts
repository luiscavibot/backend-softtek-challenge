// src/infrastructure/repositories/HistoryRepository.ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
	DynamoDBDocumentClient,
	PutCommand,
	QueryCommand,
} from '@aws-sdk/lib-dynamodb';

import {
	IHistoryRepository,
	LastKey,
} from '../../domain/repositories/IHistoryRepository';
import { HistoryRecord } from '../../domain/entities/HistoryRecord';
import { inject, injectable } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';

@injectable()
export class HistoryRepository implements IHistoryRepository {
	private docClient: DynamoDBDocumentClient;
	private tableName: string;

	constructor(@inject('AppConfig') private config: IAppConfig) {
		const client = new DynamoDBClient({
			region: this.config.REGION,
			endpoint: this.config.IS_OFFLINE
				? 'http://localhost:8000'
				: undefined,
		});
		this.docClient = DynamoDBDocumentClient.from(client);
		this.tableName = this.config.HISTORY_TABLE;
	}

	public async saveRecord(record: HistoryRecord): Promise<void> {
		// Supongamos que PK = "fusionadosHistory", SK = record.timestamp (o record.id)
		const item = {
			PK: 'fusionadosHistory',
			SK: record.timestamp, // la fecha/hora en ISO (o record.id)
			id: record.id,
			endpoint: record.endpoint,
			responseData: record.responseData,
		};

		await this.docClient.send(
			new PutCommand({
				TableName: this.tableName,
				Item: item,
			})
		);
	}

	/**
	 * Paginamos usando Query en base a PK="fusionadosHistory" y SK como sortKey
	 */
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
			ScanIndexForward: true, // true => orden ascendente por SK
		};

		const result = await this.docClient.send(new QueryCommand(queryParams));

		// Mapeamos los ítems a nuestra interfaz
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
