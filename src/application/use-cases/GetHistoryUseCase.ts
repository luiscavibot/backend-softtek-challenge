import { inject, injectable } from 'tsyringe';
import { IHistoryRepository } from '../../domain/repositories/IHistoryRepository';
import { HistoryRecord } from '../../domain/entities/HistoryRecord';
import logger from '../../infrastructure/logging/logger';

@injectable()
export class GetHistoryUseCase {
	constructor(
		@inject('HistoryRepository')
		private readonly historyRepo: IHistoryRepository
	) {
		logger.info('GetHistoryUseCase inicializado.');
	}

	public async execute(
		limit: number,
		lastKey?: any
	): Promise<{
		items: HistoryRecord[];
		lastKey?: any;
	}> {
		try {
			logger.info('Ejecutando caso de uso `GetHistoryUseCase`.', {
				limit,
				lastKey,
			});
			const result = await this.historyRepo.getRecords(limit, lastKey);
			logger.info('Historial recuperado exitosamente.', {
				itemCount: result.items.length,
				lastKey: result.lastKey,
			});
			return result;
		} catch (error: any) {
			logger.error('Error en `GetHistoryUseCase`.', {
				error: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}
}
