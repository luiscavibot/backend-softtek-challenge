import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { plainToInstance } from 'class-transformer';
import { PlanetDto } from '../../dto/PlanetDto';
import { GetAllPlanetsUseCase } from '../../../application/use-cases/GetAllPlanetsUseCase';
import logger from '../../../infrastructure/logging/logger';

export const getAllPlanetsHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	logger.info('Handler `getAllPlanetsHandler` invocado.', {
		requestId: event.requestContext?.requestId,
		path: event.path,
		method: event.httpMethod,
		stage: event.requestContext?.stage,
	});

	try {
		logger.info('Resolviendo el caso de uso `GetAllPlanetsUseCase`.', {
			requestId: event.requestContext?.requestId,
		});

		const useCase = container.resolve(GetAllPlanetsUseCase);
		const planets = await useCase.execute();

		logger.debug('Planetas recuperados exitosamente.', {
			count: planets.length,
			requestId: event.requestContext?.requestId,
		});

		const responseDto = plainToInstance(PlanetDto, planets, {
			excludeExtraneousValues: true,
		});

		logger.info('Transformación a DTO completada.', {
			requestId: event.requestContext?.requestId,
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
		logger.error('Error al listar planetas.', {
			error: error.message,
			stack: error.stack,
			requestId: event.requestContext?.requestId,
		});

		return {
			statusCode: 500,
			body: JSON.stringify({
				error: error.message || 'Internal Server Error',
			}),
		};
	}
};
