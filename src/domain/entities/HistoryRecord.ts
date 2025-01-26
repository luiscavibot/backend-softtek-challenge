import { ApodData } from './ApodData';
import { SWPerson } from './SWPerson';

export interface HistoryRecordData extends SWPerson {
	randomGalaxyPhoto: ApodData;
}

export interface HistoryRecord {
	id: string;
	endpoint: string;
	timestamp: string;
	responseData: HistoryRecordData[];
}
