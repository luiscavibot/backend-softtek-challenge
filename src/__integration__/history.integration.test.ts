import request from 'supertest';

describe('Integration - GET /historial', () => {
	const baseUrl = 'http://localhost:3000/dev';

	it('should return 200 and an array of records', async () => {
		const response = await request(baseUrl).get('/historial').expect(200);

		expect(response.body).toHaveProperty('message');
		expect(response.body).toHaveProperty('data');
		const data = response.body.data;

		expect(Array.isArray(data)).toBe(true);
	});

	it('should include a record from a previous call to /fusionados/people', async () => {
		await request(baseUrl).get('/fusionados/people').expect(200);

		const histResponse = await request(baseUrl)
			.get('/historial')
			.expect(200);
		const { data } = histResponse.body;

		const found = data.some(
			(record: any) => record.endpoint === '/fusionados/people'
		);

		expect(found).toBe(true);
	});
});
