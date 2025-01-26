import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { plainToInstance } from 'class-transformer';
import { PlanetDto } from '../../dto/PlanetDto';
import { GetAllPlanetsUseCase } from '../../../application/use-cases/GetAllPlanetsUseCase';

export const getAllPlanetsHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const useCase = container.resolve(GetAllPlanetsUseCase);
		const planets = await useCase.execute();

		const responseDto = plainToInstance(PlanetDto, planets, {
			excludeExtraneousValues: true,
		});

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Content-Type,Authorization',
				'Access-Control-Allow-Methods': 'OPTIONS,GET',
			},
			body: JSON.stringify({
				message: 'List of all planets',
				data: responseDto,
			}),
		};
	} catch (error: any) {
		console.error('Error listing planets:', error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: error.message || 'Internal Server Error',
			}),
		};
	}
};
