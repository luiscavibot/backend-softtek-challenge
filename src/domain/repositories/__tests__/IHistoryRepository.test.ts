import { NativeAttributeValue } from '@aws-sdk/lib-dynamodb';
import { HistoryRecord } from '../../entities/HistoryRecord';
import { IHistoryRepository, LastKey } from '../IHistoryRepository';
const record: HistoryRecord = {
	id: '1',
	endpoint: 'https://swapi.dev/api/people/1/',
	timestamp: new Date().toISOString(),
	responseData: [
		{
			films: [
				'https://swapi.dev/api/films/1/',
				'https://swapi.dev/api/films/2/',
				'https://swapi.dev/api/films/3/',
				'https://swapi.dev/api/films/6/',
			],
			homeworld: 'https://swapi.dev/api/planets/1/',
			gender: 'male',
			skin_color: 'fair',
			edited: '2014-12-20T21:17:56.891000Z',
			created: '2014-12-09T13:50:51.644000Z',
			mass: '77',
			randomGalaxyPhoto: {
				date: '2019-07-12',
				copyright: 'Eric Benson',
				media_type: 'image',
				hdurl: 'https://apod.nasa.gov/apod/image/1907/NGC55-LRGB_hager2048.jpg',
				service_version: 'v1',
				explanation:
					'Irregular galaxy NGC 55 is thought to be similar to the Large Magellanic Cloud (LMC). But while the LMC is about 180,000 light-years away and a well-known satellite of our own Milky Way Galaxy, NGC 55 is more like 6 million light-years distant, a member of the Sculptor Galaxy Group. Classified as an irregular galaxy, in deep exposures the LMC itself resembles a barred disk galaxy. Spanning about 50,000 light-years, NGC 55 is seen nearly edge-on though, presenting a flattened, narrow profile in contrast with our face-on view of the LMC. Just as large star forming regions create emission nebulae in the LMC, NGC 55 is also seen to be producing new stars. This highly detailed galaxy portrait highlights a bright core crossed with dust clouds, telltale pinkish star forming regions, and young blue star clusters in NGC 55.',
				title: 'Magellanic Galaxy NGC 55',
				url: 'https://apod.nasa.gov/apod/image/1907/NGC55-LRGB_hager1024.jpg',
			},
			vehicles: [
				'https://swapi.dev/api/vehicles/14/',
				'https://swapi.dev/api/vehicles/30/',
			],
			url: 'https://swapi.dev/api/people/1/',
			hair_color: 'blond',
			birth_year: '19BBY',
			eye_color: 'blue',
			species: [],
			starships: [
				'https://swapi.dev/api/starships/12/',
				'https://swapi.dev/api/starships/22/',
			],
			name: 'Luke Skywalker',
			height: '172',
		},
	],
};

class MockHistoryRepository implements IHistoryRepository {
	private records: HistoryRecord[] = [];
	private lastKey: LastKey | undefined;

	async saveRecord(record: HistoryRecord): Promise<void> {
		this.records.push(record);
	}

	async getRecords(
		limit: number,
		lastKey?: string
	): Promise<{ items: HistoryRecord[]; lastKey?: LastKey }> {
		const startIndex = lastKey ? parseInt(lastKey, 10) : 0;
		const items = this.records.slice(startIndex, startIndex + limit);
		const newLastKey =
			startIndex + limit < this.records.length
				? ({ id: String(startIndex + limit) } as LastKey)
				: undefined;

		return { items, lastKey: newLastKey };
	}
}

describe('IHistoryRepository', () => {
	let repository: IHistoryRepository;

	beforeEach(() => {
		repository = new MockHistoryRepository();
	});

	it('should save a record successfully', async () => {
		await repository.saveRecord(record);
		const { items } = await repository.getRecords(1);

		expect(items).toHaveLength(1);
		expect(items[0]).toEqual(record);
	});

	it('should retrieve records with pagination', async () => {
		const records: HistoryRecord[] = Array.from(
			{ length: 5 },
			(_, index) => ({
				id: (index + 1).toString(),
				endpoint: `https://swapi.dev/api/people/${index + 1}/`,
				timestamp: new Date().toISOString(),
				responseData: [
					{
						...record.responseData[0],
					},
				],
			})
		);

		for (const record of records) {
			await repository.saveRecord(record);
		}

		const firstPage = await repository.getRecords(2);
		expect(firstPage.items).toHaveLength(2);
		expect(firstPage.items[0].id).toBe('1');
		expect(firstPage.items[1].id).toBe('2');

		const secondPage = await repository.getRecords(
			2,
			firstPage.lastKey?.id
		);
		expect(secondPage.items).toHaveLength(2);
		expect(secondPage.items[0].id).toBe('3');
		expect(secondPage.items[1].id).toBe('4');

		const thirdPage = await repository.getRecords(
			2,
			secondPage.lastKey?.id
		);
		expect(thirdPage.items).toHaveLength(1);
		expect(thirdPage.items[0].id).toBe('5');
		expect(thirdPage.lastKey).toBeUndefined();
	});

	it('should return an empty list if no records are available', async () => {
		const { items, lastKey } = await repository.getRecords(10);

		expect(items).toHaveLength(0);
		expect(lastKey).toBeUndefined();
	});
});
