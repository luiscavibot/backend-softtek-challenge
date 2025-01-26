// src/interface/lambda/handlers/swapiPeopleHandler.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { IHistoryRepository } from '../../../domain/repositories/IHistoryRepository';
import { v4 as uuidv4 } from 'uuid'; // para generar un ID
import { GetAllPeopleUseCase } from '../../../application/use-cases/GetAllPeopleUseCase';
import { GetPersonByIdUseCase } from '../../../application/use-cases/GetPersonByIdUseCase';

export const getPeopleHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const useCase = container.resolve(GetAllPeopleUseCase);
		const data = await useCase.execute();

		const historyRepo =
			container.resolve<IHistoryRepository>('HistoryRepository');
		await historyRepo.saveRecord({
			id: uuidv4(),
			endpoint: '/fusionados/people',
			timestamp: new Date().toISOString(),
			responseData: data,
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'List of SW characters with random APOD',
				data,
			}),
		};
	} catch (error: any) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};

export const getPersonByIdHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const { id } = event.pathParameters || {};
		if (!id) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: "No 'id' parameter provided" }),
			};
		}

		const useCase = container.resolve(GetPersonByIdUseCase);
		const data = await useCase.execute(id);

		// Guardar en historial
		const historyRepo =
			container.resolve<IHistoryRepository>('HistoryRepository');
		await historyRepo.saveRecord({
			id: uuidv4(),
			endpoint: `/fusionados/people/${id}`,
			timestamp: new Date().toISOString(),
			responseData: data,
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: `Character ${id} with random APOD`,
				data,
			}),
		};
	} catch (error: any) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
