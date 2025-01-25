import { ApodData } from '../entities/ApodData';

/**
 * Repositorio para obtener datos de NASA APOD
 */
export interface INasaApodRepository {
	getRandomApod(): Promise<ApodData>;
}
