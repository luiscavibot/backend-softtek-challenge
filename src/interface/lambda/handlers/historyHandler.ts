import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { GetHistoryUseCase } from '../../../application/use-cases/GetHistoryUseCase';
import logger from '../../../infrastructure/logging/logger';

export const getHistoryHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	logger.info('Handler `getHistoryHandler` invocado.', {
		requestId: event.requestContext?.requestId,
		path: event.path,
		method: event.httpMethod,
		stage: event.requestContext?.stage,
		queryStringParameters: event.queryStringParameters,
	});

	try {
		const limit = event.queryStringParameters?.limit
			? parseInt(event.queryStringParameters.limit, 10)
			: 10;
		const lastKey = event.queryStringParameters?.lastKey
			? JSON.parse(
					decodeURIComponent(event.queryStringParameters.lastKey)
			  )
			: undefined;

		logger.debug('Parámetros extraídos para paginación:', {
			limit,
			lastKey,
			requestId: event.requestContext?.requestId,
		});

		logger.info('Resolviendo el caso de uso `GetHistoryUseCase`.', {
			requestId: event.requestContext?.requestId,
		});

		const useCase = container.resolve(GetHistoryUseCase);
		const { items, lastKey: newLastKey } = await useCase.execute(
			limit,
			lastKey
		);

		logger.debug('Historial recuperado exitosamente.', {
			itemCount: items.length,
			newLastKey,
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
				message: 'Historial paginado',
				data: items,
				lastKey: newLastKey,
			}),
		};
	} catch (error: any) {
		logger.error('Error al recuperar el historial.', {
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
