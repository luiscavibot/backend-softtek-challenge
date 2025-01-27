import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { IHistoryRepository } from '../../../domain/repositories/IHistoryRepository';
import { v4 as uuidv4 } from 'uuid';
import { GetAllPeopleUseCase } from '../../../application/use-cases/GetAllPeopleUseCase';
import logger from '../../../infrastructure/logging/logger';
import { GetPersonByIdUseCase } from '../../../application/use-cases/GetPersonByIdUseCase';

export const getPeopleHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	logger.info('Handler `getPeopleHandler` invocado.', {
		requestId: event.requestContext?.requestId,
		path: event.path,
		method: event.httpMethod,
		stage: event.requestContext?.stage,
	});

	try {
		logger.info('Resolviendo el caso de uso `GetAllPeopleUseCase`.', {
			requestId: event.requestContext?.requestId,
		});

		const useCase = container.resolve(GetAllPeopleUseCase);
		const data = await useCase.execute();

		logger.info('Personajes recuperados exitosamente.', {
			count: data.length,
			requestId: event.requestContext?.requestId,
		});

		const historyRepo =
			container.resolve<IHistoryRepository>('HistoryRepository');
		const record = {
			id: uuidv4(),
			endpoint: '/fusionados/people',
			timestamp: new Date().toISOString(),
			responseData: data,
		};

		await historyRepo.saveRecord(record);
		logger.info('Registro guardado en historial.', {
			recordId: record.id,
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
				message: 'List of SW characters with random APOD',
				data,
			}),
		};
	} catch (error: any) {
		logger.error('Error al recuperar los personajes.', {
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

export const getPersonByIdHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	logger.info('Handler `getPersonByIdHandler` invocado.', {
		requestId: event.requestContext?.requestId,
		path: event.path,
		method: event.httpMethod,
		stage: event.requestContext?.stage,
	});

	try {
		const { id } = event.pathParameters || {};
		if (!id) {
			logger.warn("No 'id' parameter provided in the request.", {
				requestId: event.requestContext?.requestId,
			});

			return {
				statusCode: 400,
				body: JSON.stringify({ error: "No 'id' parameter provided" }),
			};
		}

		logger.info('Resolviendo el caso de uso `GetPersonByIdUseCase`.', {
			id,
			requestId: event.requestContext?.requestId,
		});

		const useCase = container.resolve(GetPersonByIdUseCase);
		const data = await useCase.execute(id);

		logger.info('Personaje recuperado exitosamente.', {
			id,
			requestId: event.requestContext?.requestId,
		});

		const historyRepo =
			container.resolve<IHistoryRepository>('HistoryRepository');
		const record = {
			id: uuidv4(),
			endpoint: `/fusionados/people/${id}`,
			timestamp: new Date().toISOString(),
			responseData: data,
		};

		await historyRepo.saveRecord(record);
		logger.info('Registro guardado en historial.', {
			recordId: record.id,
			requestId: event.requestContext?.requestId,
		});

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Content-Type,Authorization',
				'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
			},
			body: JSON.stringify({
				message: `Character ${id} with random APOD`,
				data,
			}),
		};
	} catch (error: any) {
		logger.error('Error al recuperar el personaje.', {
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
