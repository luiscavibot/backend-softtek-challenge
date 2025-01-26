import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePlanetDto } from '../../dto/CreatePlanetDto';
import { PlanetDto } from '../../dto/PlanetDto';
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

		const bodyObj = JSON.parse(event.body);
		const createDto = plainToInstance(CreatePlanetDto, bodyObj);

		const errors = await validate(createDto);
		if (errors.length > 0) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					error: 'Validation failed',
					details: errors.map((e) => e.constraints),
				}),
			};
		}

		const useCase = container.resolve(CreatePlanetUseCase);
		const planet = await useCase.execute({
			name: createDto.name,
			climate: createDto.climate,
			terrain: createDto.terrain,
			population: createDto.population,
		});

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
		console.error('Error creating planet:', error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: error.message || 'Internal Server Error',
			}),
		};
	}
};
