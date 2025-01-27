import { INasaApodRepository } from '../../domain/repositories/INasaApodRepository';
import { ApodData } from '../../domain/entities/ApodData';
import { inject, injectable } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';
import logger from '../logging/logger';

const START_DATE = new Date('1995-06-16');
const END_DATE = new Date();

@injectable()
export class NasaApodRepository implements INasaApodRepository {
	constructor(@inject('AppConfig') private readonly config: IAppConfig) {
		logger.info('NasaApodRepository inicializado.');
	}

	public async getRandomApod(): Promise<ApodData> {
		const randomDate = this.getRandomDate(START_DATE, END_DATE);
		const url = new URL(this.config.NASA_APOD_URL);
		url.searchParams.append('api_key', this.config.NASA_API_KEY);
		url.searchParams.append('date', randomDate);

		logger.info('Iniciando solicitud a NASA APOD.', {
			url: url.toString(),
			randomDate,
		});

		try {
			const response = await fetch(url.toString());
			if (!response.ok) {
				logger.error('Error en la respuesta de NASA APOD.', {
					status: response.status,
					statusText: response.statusText,
				});
				throw new Error(
					`Error fetching NASA APOD: ${response.statusText}`
				);
			}

			const data = (await response.json()) as ApodData;
			logger.info('Datos de NASA APOD recuperados exitosamente.', {
				title: data.title,
				date: data.date,
			});
			return data;
		} catch (error: any) {
			logger.error('Error al recuperar datos de NASA APOD.', {
				message: error.message,
				stack: error.stack,
			});
			throw error;
		}
	}

	private getRandomDate(start: Date, end: Date): string {
		const startTime = start.getTime();
		const endTime = end.getTime();
		const randomTime = Math.floor(
			Math.random() * (endTime - startTime + 1) + startTime
		);
		const randomDate = new Date(randomTime);

		const year = randomDate.getFullYear();
		const month = String(randomDate.getMonth() + 1).padStart(2, '0');
		const day = String(randomDate.getDate()).padStart(2, '0');

		logger.debug('Fecha aleatoria generada.', {
			randomDate: `${year}-${month}-${day}`,
		});

		return `${year}-${month}-${day}`;
	}
}
