import { SWPerson } from './SWPerson';

export interface ApodData {
	copyright?: string;
	date: string;
	explanation: string;
	hdurl?: string;
	media_type: string;
	service_version: string;
	title: string;
	url: string;
}

export interface ResultsWithApod extends SWPerson {
	randomGalaxyPhoto: ApodData;
}
