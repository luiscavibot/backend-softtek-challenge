import { HistoryRecord } from '../HistoryRecord';

// src/domain/entities/HistoryRecord.test.ts

describe('HistoryRecord', () => {
	it('should have a valid id', () => {
		const record: HistoryRecord = {
			id: '123',
			endpoint: '/fusionados/people',
			timestamp: new Date().toISOString(),
			responseData: {},
		};
		expect(record.id).toBe('123');
	});

	it('should have a valid endpoint', () => {
		const record: HistoryRecord = {
			id: '123',
			endpoint: '/fusionados/people',
			timestamp: new Date().toISOString(),
			responseData: {},
		};
		expect(record.endpoint).toBe('/fusionados/people');
	});

	it('should have a valid timestamp', () => {
		const timestamp = new Date().toISOString();
		const record: HistoryRecord = {
			id: '123',
			endpoint: '/fusionados/people',
			timestamp: timestamp,
			responseData: {},
		};
		expect(record.timestamp).toBe(timestamp);
	});

	it('should have valid responseData', () => {
		const responseData = { key: 'value' };
		const record: HistoryRecord = {
			id: '123',
			endpoint: '/fusionados/people',
			timestamp: new Date().toISOString(),
			responseData: responseData,
		};
		expect(record.responseData).toBe(responseData);
	});
});
