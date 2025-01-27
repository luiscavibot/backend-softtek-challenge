import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePlanetDto } from '../../dto/CreatePlanetDto';
import { PlanetDto } from '../../dto/PlanetDto';
import { CreatePlanetUseCase } from '../../../application/use-cases/CreatePlanetUseCase';
import logger from '../../../infrastructure/logging/logger';

export const createPlanetHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	logger.info('Handler `createPlanetHandler` invoked', {
		path: event.path,
		method: event.httpMethod,
	});

	try {
		if (!event.body) {
			logger.warn('Request body is missing');
			return {
				statusCode: 400,
				body: JSON.stringify({ error: 'No body provided' }),
			};
		}

		logger.debug('Parsing request body...');
		const bodyObj = JSON.parse(event.body);

		logger.debug('Validating request body...');
		const createDto = plainToInstance(CreatePlanetDto, bodyObj);
		const errors = await validate(createDto);
		if (errors.length > 0) {
			logger.warn('Validation failed', {
				errors: errors.map((e) => e.constraints),
			});
			return {
				statusCode: 400,
				body: JSON.stringify({
					error: 'Validation failed',
					details: errors.map((e) => e.constraints),
				}),
			};
		}

		logger.info('Calling CreatePlanetUseCase...', { planetData: bodyObj });
		const useCase = container.resolve(CreatePlanetUseCase);
		const planet = await useCase.execute({
			name: createDto.name,
			climate: createDto.climate,
			terrain: createDto.terrain,
			population: createDto.population,
		});

		logger.info('Planet created successfully', { planetId: planet.id });

		logger.debug('Transforming response data...');
		const responseDto = plainToInstance(PlanetDto, planet, {
			excludeExtraneousValues: true,
		});

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Content-Type,Authorization',
				'Access-Control-Allow-Methods': 'OPTIONS,POST',
			},
			body: JSON.stringify({
				message: 'Planet created successfully',
				data: responseDto,
			}),
		};
	} catch (error: any) {
		logger.error('Error occurred in createPlanetHandler', {
			error: error.message,
			stack: error.stack,
		});
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: error.message || 'Internal Server Error',
			}),
		};
	}
};
