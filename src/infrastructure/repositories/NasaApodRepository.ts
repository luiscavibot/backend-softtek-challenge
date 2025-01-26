import { INasaApodRepository } from '../../domain/repositories/INasaApodRepository';
import { ApodData } from '../../domain/entities/ApodData';
import { inject, injectable } from 'tsyringe';
import { IAppConfig } from '../../domain/config/IAppConfig';

const START_DATE = new Date('1995-06-16');
const END_DATE = new Date(); // hoy

@injectable()
export class NasaApodRepository implements INasaApodRepository {
	constructor(@inject('AppConfig') private readonly config: IAppConfig) {}

	public async getRandomApod(): Promise<ApodData> {
		const randomDate = this.getRandomDate(START_DATE, END_DATE);

		const url = new URL(this.config.NASA_APOD_URL);
		url.searchParams.append('api_key', this.config.NASA_API_KEY);
		url.searchParams.append('date', randomDate);

		const response = await fetch(url.toString());
		if (!response.ok) {
			throw new Error(`Error fetching NASA APOD: ${response.statusText}`);
		}

		const data = (await response.json()) as ApodData;
		return data;
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

		return `${year}-${month}-${day}`;
	}
}
