import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { CreatePlanetUseCase } from '../../../application/use-cases/CreatePlanetUseCase';

export const createPlanetHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		if (!event.body) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: 'No body provided' }),
			};
		}

		const { name, climate, terrain, population } = JSON.parse(event.body);

		const useCase = container.resolve(CreatePlanetUseCase);
		const planet = await useCase.execute({
			name,
			climate,
			terrain,
			population,
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Planet created successfully',
				data: planet,
			}),
		};
	} catch (error: any) {
		console.error('Error creating planet:', error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: error.message || 'Internal Server Error',
			}),
		};
	}
};
