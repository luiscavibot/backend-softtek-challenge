// src/domain/repositories/IHistoryRepository.ts
import { NativeAttributeValue } from '@aws-sdk/lib-dynamodb';
import { HistoryRecord } from '../entities/HistoryRecord';
export type LastKey = Record<string, NativeAttributeValue>;
export interface IHistoryRepository {
	saveRecord(record: HistoryRecord): Promise<void>;
	getRecords(
		limit: number,
		lastKey?: string
	): Promise<{ items: HistoryRecord[]; lastKey?: LastKey }>;
}
