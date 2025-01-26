// src/application/usecases/GetHistoryUseCase.ts
import { inject, injectable } from 'tsyringe';
import { IHistoryRepository } from '../../domain/repositories/IHistoryRepository';
import { HistoryRecord } from '../../domain/entities/HistoryRecord';

@injectable()
export class GetHistoryUseCase {
	constructor(
		@inject('HistoryRepository')
		private readonly historyRepo: IHistoryRepository
	) {}

	public async execute(
		limit: number,
		lastKey?: any
	): Promise<{
		items: HistoryRecord[];
		lastKey?: any;
	}> {
		const result = await this.historyRepo.getRecords(limit, lastKey);
		return result;
	}
}
