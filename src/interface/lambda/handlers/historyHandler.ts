// src/interface/lambda/handlers/historyHandler.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { GetHistoryUseCase } from '../../../application/use-cases/GetHistoryUseCase';

export const getHistoryHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const limit = event.queryStringParameters?.limit
			? parseInt(event.queryStringParameters.limit, 10)
			: 10;
		const lastKey = event.queryStringParameters?.lastKey
			? JSON.parse(
					decodeURIComponent(event.queryStringParameters.lastKey)
			  )
			: undefined;

		const useCase = container.resolve(GetHistoryUseCase);
		const { items, lastKey: newLastKey } = await useCase.execute(
			limit,
			lastKey
		);

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
				lastKey: newLastKey, // para continuar la paginación
			}),
		};
	} catch (error: any) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
