import request from 'supertest';

describe('Integration - GET /fusionados/people/:id', () => {
	const baseUrl = 'http://localhost:3000/dev';

	it('should return 200 and a single SW character with random APOD', async () => {
		// Ejemplo: pedir ID 1
		const response = await request(baseUrl)
			.get('/fusionados/people/1')
			.expect(200);

		expect(response.body).toHaveProperty('message');
		expect(response.body).toHaveProperty('data');
		const data = response.body.data;

		expect(data).toHaveProperty('randomGalaxyPhoto');
	});

	it('should return 400 or 500 for invalid ID (if your code does so)', async () => {
		const response = await request(baseUrl)
			.get('/fusionados/people/99999999')
			.expect(500);

		expect(response.body).toHaveProperty('error');
	});
});
