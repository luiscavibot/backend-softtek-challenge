import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import {
	IHistoryRepository,
	LastKey,
} from '../../domain/repositories/IHistoryRepository';
import { HistoryRecord } from '../../domain/entities/HistoryRecord';
import { inject, injectable } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';
import { DynamoDBConnectiontSingleton } from '../db/DynamoDBConnectiontSingleton';
import logger from '../logging/logger';

@injectable()
export class HistoryRepository implements IHistoryRepository {
	private tableName: string;

	constructor(
		@inject('AppConfig') private config: IAppConfig,
		@inject('DynamoDBConnectiontSingleton')
		private dynamoConn: DynamoDBConnectiontSingleton
	) {
		this.tableName = this.config.HISTORY_TABLE;
		logger.info('HistoryRepository inicializado.', {
			tableName: this.tableName,
		});
	}

	public async saveRecord(record: HistoryRecord): Promise<void> {
		logger.info('Iniciando `saveRecord` para historial.', {
			recordId: record.id,
			endpoint: record.endpoint,
		});

		const item = {
			PK: 'fusionadosHistory',
			SK: record.timestamp,
			id: record.id,
			endpoint: record.endpoint,
			responseData: record.responseData,
		};

		try {
			await this.dynamoConn.client.send(
				new PutCommand({
					TableName: this.tableName,
					Item: item,
				})
			);
			logger.info('Registro guardado exitosamente en historial.', {
				recordId: record.id,
				timestamp: record.timestamp,
			});
		} catch (error: any) {
			logger.error('Error al guardar el registro en historial.', {
				recordId: record.id,
				error: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}

	public async getRecords(
		limit: number,
		lastKey?: any
	): Promise<{ items: HistoryRecord[]; lastKey?: LastKey }> {
		logger.info('Iniciando `getRecords` para historial.', {
			limit,
			lastKey,
		});

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

		try {
			const result = await this.dynamoConn.client.send(
				new QueryCommand(queryParams)
			);

			const items = (result.Items || []).map((itm: any) => ({
				id: itm.id,
				endpoint: itm.endpoint,
				timestamp: itm.SK,
				responseData: itm.responseData,
			})) as HistoryRecord[];

			logger.info('Registros obtenidos exitosamente.', {
				itemCount: items.length,
				lastEvaluatedKey: result.LastEvaluatedKey,
			});

			return {
				items,
				lastKey: result.LastEvaluatedKey,
			};
		} catch (error: any) {
			logger.error('Error al obtener registros del historial.', {
				limit,
				lastKey,
				error: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}
}
