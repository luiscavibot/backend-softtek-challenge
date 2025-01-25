// src/domain/repositories/IHistoryRepository.ts
import { HistoryRecord } from '../entities/HistoryRecord';

export interface IHistoryRepository {
	saveRecord(record: HistoryRecord): Promise<void>;
	getRecords(
		limit: number,
		lastKey?: any
	): Promise<{ items: HistoryRecord[]; lastKey?: any }>;
}
