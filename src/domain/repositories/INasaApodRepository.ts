import { ApodData } from '../entities/ApodData';

export interface INasaApodRepository {
	getRandomApod(): Promise<ApodData>;
}
