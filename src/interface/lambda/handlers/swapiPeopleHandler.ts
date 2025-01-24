import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../../../infrastructure/di/container';
import { GetAllPeopleUseCase } from '../../../application/use-cases/GetAllPeopleUseCase';
import { GetPersonByIdUseCase } from '../../../application/use-cases/GetPersonByIdUseCase';

/**
 * Handler para GET /fusionados/people
 */
export const getPeopleHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const useCase = container.resolve(GetAllPeopleUseCase);
		const people = await useCase.execute();

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'List of SW characters',
				data: people,
			}),
		};
	} catch (error: any) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};

/**
 * Handler para GET /fusionados/people/{id}
 */
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
		const person = await useCase.execute(id);

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: `Character with id = ${id}`,
				data: person,
			}),
		};
	} catch (error: any) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
