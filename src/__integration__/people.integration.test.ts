import request from 'supertest';

describe('Integration - GET /fusionados/people', () => {
	const baseUrl = 'http://localhost:3000/dev';

	it('should return status 200 and a list of SW characters with random APOD', async () => {
		const response = await request(baseUrl)
			.get('/fusionados/people')
			.expect(200);

		expect(response.body).toHaveProperty('message');
		expect(response.body).toHaveProperty('data');
		const data = response.body.data;

		expect(Array.isArray(data)).toBe(true);

		if (data.length > 0) {
			expect(data[0]).toHaveProperty('randomGalaxyPhoto');
		}
	});

	// it('should cache the result for subsequent calls (optional test)', async () => {
	// 	// Llamada 1 (probablemente se conecte a SWAPI/NASA)
	// 	const response1 = await request(baseUrl).get('/fusionados/people');
	// 	expect(response1.statusCode).toBe(200);

	// 	// Llamada 2: idealmente ya está cacheado
	// 	const response2 = await request(baseUrl).get('/fusionados/people');
	// 	expect(response2.statusCode).toBe(200);

	// 	// Podrías comparar los data en ambas.
	// 	// O ver si en logs aparece "Retornando data desde caché (Redis)".
	// 	// Sin logs, limitamos la prueba a su status y contenido consistent.
	// 	expect(response2.body.data).toEqual(response1.body.data);
	// });
});
